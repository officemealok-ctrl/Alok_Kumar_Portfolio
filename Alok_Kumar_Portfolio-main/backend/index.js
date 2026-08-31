require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const OpenAI = require('openai');
const contactRouter = require('./contact');

const app = express();

// Configure CORS to allow requests from your deployed frontend (recommended)
// Set FRONTEND_URL in your Render service environment variables to your Vercel URL
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://alokkumarkaran.vercel.app';
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: 'uploads/' });

// === AI CONFIGURATION ===
const OPENAI_KEY = process.env.OPENAI_API_KEY || '';
const GEMINI_KEY = process.env.GOOGLE_API_KEY || '';

let openai = null;
let gemini = null;

if (OPENAI_KEY) openai = new OpenAI({ apiKey: OPENAI_KEY });
if (GEMINI_KEY) gemini = new GoogleGenerativeAI(GEMINI_KEY);

// === Helper functions ===
function countWords(str) {
  return str.split(/\s+/).filter(Boolean).length;
}

function simpleScore(text) {
  const lower = text.toLowerCase();

  // === Keyword Libraries ===
  const devKeywords = [
    'javascript','typescript','react','next.js','vue','angular','node','express','java',
    'spring','c#','dotnet','django','flask','python','php','laravel','git','docker',
    'kubernetes','aws','azure','gcp','rest api','graphql','microservices','html','css','sass'
  ];

  const dataKeywords = [
    'sql','mysql','postgresql','mongodb','power bi','tableau','excel','pandas','numpy','matplotlib',
    'seaborn','data analysis','data visualization','data cleaning','data preprocessing','statistics',
    'machine learning','deep learning','tensorflow','pytorch','spark','hadoop'
  ];

  const actionVerbs = [
    'led','built','designed','developed','implemented','optimized','improved','analyzed',
    'created','enhanced','automated','managed','collaborated','architected','maintained',
    'deployed','debugged','tested','configured','delivered','mentored'
  ];

  // === Match Counting ===
  const devMatches = devKeywords.filter(k => lower.includes(k)).length;
  const dataMatches = dataKeywords.filter(k => lower.includes(k)).length;
  const actionMatches = actionVerbs.filter(a => lower.includes(a)).length;
  const wordCount = countWords(text);

  // === Scoring Logic ===
  const techScore = Math.min(35, devMatches * 2 + dataMatches * 2);
  const actionScore = Math.min(25, actionMatches * 2);
  const lengthScore = Math.min(30, Math.floor(wordCount / 40)); // ideal resumes are 600–1000 words
  let totalScore = techScore + actionScore + lengthScore;

  // Normalize if resume has little content
  if (wordCount < 100) totalScore *= 0.6;
  if (wordCount < 50) totalScore *= 0.4;

  const score = Math.round(Math.min(100, totalScore));

  // === Generate Highlights & Suggestions ===
  const highlights = [
    `${devMatches} software keywords found`,
    `${dataMatches} data-related keywords`,
    `${actionMatches} action verbs`,
    `Approx. ${wordCount} words total`
  ].join(', ');

  const suggestions = [];
  if (devMatches < 5) suggestions.push("Add more technical stack keywords (e.g., React, Node, Docker, AWS).");
  if (dataMatches < 3) suggestions.push("Include more data/analytics tools if relevant (e.g., SQL, Power BI, Python).");
  if (actionMatches < 4) suggestions.push("Use more action verbs like 'developed', 'optimized', or 'implemented'.");
  if (wordCount < 200) suggestions.push("Add more detail — resumes under 200 words may look too brief.");
  if (wordCount > 1200) suggestions.push("Consider trimming — keep your resume concise (under 2 pages).");
  if (suggestions.length === 0) suggestions.push("Your resume is well-balanced and detailed — great job!");

  return {
    score,
    breakdown: {
      technical: Math.min(100, Math.round((techScore / 35) * 100)),
      action: Math.min(100, Math.round((actionScore / 25) * 100)),
      completeness: Math.min(100, Math.round((lengthScore / 30) * 100))
    },
    highlights,
    suggestions: suggestions.join(' ')
  };
}


// === Resume Analyzer ===
app.post('/api/analyze-resume', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  try {
    const buffer = fs.readFileSync(req.file.path);
    let text = '';

    try {
      const data = await pdfParse(buffer);
      text = data.text || '';
    } catch (e) {
      text = buffer.toString('utf-8');
    }

    let analysis = null;

    // Try Gemini first
    // Try Gemini first
    if (gemini) {
      try {
        const model = gemini.getGenerativeModel({ model: 'gemini-2.5-flash' });
        const prompt = `
You are an expert technical resume reviewer and career coach.
Analyze the following resume text in depth and respond ONLY in strict JSON format matching this schema:

{
  "score": number (0-100),
  "overall_summary": string,
  "key_strengths": [string],
  "improvement_areas": [string],
  "technical_skills_detected": [string],
  "soft_skills_detected": [string],
  "experience_level": "Beginner" | "Intermediate" | "Advanced" | "Expert",
  "recommendations": [string],
  "section_scores": {
    "Technical Skills": number,
    "Experience": number,
    "Projects": number,
    "Education": number,
    "Soft Skills": number
  },
  "graph_insights": {
    "skill_match_percent": number,
    "action_verb_usage": number,
    "content_density": number
  }
}

Resume Text:
${text}

Be analytical, structured, and insightful. Focus on measurable details and professional presentation. Output raw JSON only, no markdown formatting.
        `;

        const result = await model.generateContent(prompt);
        let output = result.response.text().trim();

        // === FIX: Remove Markdown formatting if Gemini includes it ===
        if (output.startsWith('```json')) {
            output = output.substring(7); // Remove ```json
        } else if (output.startsWith('```')) {
            output = output.substring(3); // Remove ```
        }
        if (output.endsWith('```')) {
            output = output.substring(0, output.length - 3); // Remove trailing ```
        }
        output = output.trim();
        // ============================================================

        analysis = JSON.parse(output);
      } catch (err) {
        console.warn('⚠️ Gemini failed, falling back to OpenAI or simple scoring.', err.message);
      }
    }

    // Fallback to OpenAI
    if (!analysis && openai) {
      try {
        const prompt = `You are an expert resume reviewer. Return JSON with:
          "score" (0-100), "highlights", and "suggestions". Resume text:\n${text}`;
        const response = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 300,
        });
        const out = response.choices[0].message.content.trim();
        analysis = JSON.parse(out);
      } catch (err) {
        console.warn('⚠️ OpenAI failed, using simple scoring.');
      }
    }

    // Fallback to simple scoring
    if (!analysis) {
      analysis = simpleScore(text);
    }

    return res.json(analysis);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Analysis failed' });
  } finally {
    if (req.file && req.file.path) fs.unlink(req.file.path, () => {});
  }
});

// === Contact route ===
app.use('/api/contact', contactRouter);

// === Start server ===
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Resume analyzer backend running on port ${PORT}`));
