/**
 * Unit tests for simpleScore() helper function
 * Tests the scoring algorithm without any network/AI calls.
 */

// ── Extract & test the pure scoring logic ─────────────────────────────

/**
 * Inlined copy of simpleScore for unit testing
 * (mirrors the function in backend/index.js)
 */
function countWords(str) {
  return str.split(/\s+/).filter(Boolean).length;
}

function simpleScore(text) {
  const lower = text.toLowerCase();

  const devKeywords = [
    'javascript', 'typescript', 'react', 'next.js', 'vue', 'angular', 'node', 'express', 'java',
    'spring', 'c#', 'dotnet', 'django', 'flask', 'python', 'php', 'laravel', 'git', 'docker',
    'kubernetes', 'aws', 'azure', 'gcp', 'rest api', 'graphql', 'microservices', 'html', 'css', 'sass',
  ];

  const dataKeywords = [
    'sql', 'mysql', 'postgresql', 'mongodb', 'power bi', 'tableau', 'excel', 'pandas', 'numpy',
    'matplotlib', 'seaborn', 'data analysis', 'data visualization', 'data cleaning',
    'data preprocessing', 'statistics', 'machine learning', 'deep learning',
    'tensorflow', 'pytorch', 'spark', 'hadoop',
  ];

  const actionVerbs = [
    'led', 'built', 'designed', 'developed', 'implemented', 'optimized', 'improved', 'analyzed',
    'created', 'enhanced', 'automated', 'managed', 'collaborated', 'architected', 'maintained',
    'deployed', 'debugged', 'tested', 'configured', 'delivered', 'mentored',
  ];

  const devMatches = devKeywords.filter(k => lower.includes(k)).length;
  const dataMatches = dataKeywords.filter(k => lower.includes(k)).length;
  const actionMatches = actionVerbs.filter(a => lower.includes(a)).length;
  const wordCount = countWords(text);

  const techScore = Math.min(35, devMatches * 2 + dataMatches * 2);
  const actionScore = Math.min(25, actionMatches * 2);
  const lengthScore = Math.min(30, Math.floor(wordCount / 40));
  let totalScore = techScore + actionScore + lengthScore;

  if (wordCount < 100) totalScore *= 0.6;
  if (wordCount < 50) totalScore *= 0.4;

  const score = Math.round(Math.min(100, totalScore));

  const highlights = [
    `${devMatches} software keywords found`,
    `${dataMatches} data-related keywords`,
    `${actionMatches} action verbs`,
    `Approx. ${wordCount} words total`,
  ].join(', ');

  const suggestions = [];
  if (devMatches < 5) suggestions.push('Add more technical stack keywords.');
  if (dataMatches < 3) suggestions.push('Include more data/analytics tools.');
  if (actionMatches < 4) suggestions.push('Use more action verbs.');
  if (wordCount < 200) suggestions.push('Add more detail.');
  if (wordCount > 1200) suggestions.push('Consider trimming your resume.');
  if (suggestions.length === 0) suggestions.push('Your resume is well-balanced!');

  return {
    score,
    breakdown: {
      technical: Math.min(100, Math.round((techScore / 35) * 100)),
      action: Math.min(100, Math.round((actionScore / 25) * 100)),
      completeness: Math.min(100, Math.round((lengthScore / 30) * 100)),
    },
    highlights,
    suggestions: suggestions.join(' '),
  };
}

// ════════════════════════════════════════════════════════════════════════
//  TEST SUITE: simpleScore()
// ════════════════════════════════════════════════════════════════════════

describe('simpleScore() — scoring algorithm', () => {
  describe('Return shape', () => {
    const result = simpleScore('developer built react javascript node docker aws');

    it('should return an object with score property', () => {
      expect(result).toHaveProperty('score');
    });

    it('should return score as a number', () => {
      expect(typeof result.score).toBe('number');
    });

    it('should return score between 0 and 100', () => {
      expect(result.score).toBeGreaterThanOrEqual(0);
      expect(result.score).toBeLessThanOrEqual(100);
    });

    it('should return breakdown object', () => {
      expect(result).toHaveProperty('breakdown');
      expect(result.breakdown).toHaveProperty('technical');
      expect(result.breakdown).toHaveProperty('action');
      expect(result.breakdown).toHaveProperty('completeness');
    });

    it('should return highlights string', () => {
      expect(result).toHaveProperty('highlights');
      expect(typeof result.highlights).toBe('string');
    });

    it('should return suggestions string', () => {
      expect(result).toHaveProperty('suggestions');
      expect(typeof result.suggestions).toBe('string');
    });
  });

  describe('Scoring logic', () => {
    it('should score empty string as 0', () => {
      expect(simpleScore('').score).toBe(0);
    });

    it('should give higher score to tech-rich resume', () => {
      const techResume = `
        Experienced software developer with expertise in JavaScript, TypeScript, React, Node.js,
        Docker, Kubernetes, AWS, Azure, GraphQL, and REST API design.
        Built and deployed microservices using Express and implemented CI/CD pipelines.
        Led a team of 5, designed scalable architectures, optimized database queries in PostgreSQL.
        Developed, analyzed, and mentored junior developers. Automated deployment with GitHub Actions.
        Created reusable components, configured production environments. Delivered 20+ features.
      `;
      const lowResume = 'I worked at a company and did some stuff.';
      expect(simpleScore(techResume).score).toBeGreaterThan(simpleScore(lowResume).score);
    });

    it('should flag very short resume with suggestion', () => {
      const result = simpleScore('short resume');
      expect(result.suggestions).toContain('Add more detail');
    });

    it('breakdown technical score should be between 0 and 100', () => {
      const result = simpleScore('react javascript node docker');
      expect(result.breakdown.technical).toBeGreaterThanOrEqual(0);
      expect(result.breakdown.technical).toBeLessThanOrEqual(100);
    });

    it('should detect action verbs and reflect in score', () => {
      const withVerbs = 'developed implemented optimized built deployed led managed created automated analyzed';
      const withoutVerbs = 'experience with tools and technologies in various projects over several years';
      const r1 = simpleScore(withVerbs);
      const r2 = simpleScore(withoutVerbs);
      expect(r1.breakdown.action).toBeGreaterThan(r2.breakdown.action);
    });
  });

  describe('countWords() helper', () => {
    it('counts zero words for empty string', () => {
      expect(countWords('')).toBe(0);
    });

    it('counts words correctly', () => {
      expect(countWords('one two three')).toBe(3);
    });

    it('handles multiple spaces', () => {
      expect(countWords('one   two')).toBe(2);
    });
  });
});
