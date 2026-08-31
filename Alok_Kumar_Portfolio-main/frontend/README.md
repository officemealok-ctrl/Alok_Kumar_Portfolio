# Alok Kumar - Portfolio (Full Stack Starter with Node.js Backend)

This starter includes:
- React + Vite frontend (Tailwind CSS)
- Theme switcher (light/dark), responsive layout
- AI Resume Analyzer frontend (uploads to backend)
- Node.js + Express backend for resume analysis (with simple scoring + optional OpenAI integration)
- Live GitHub Stats component (uses GitHub REST API)

## Quick start (frontend)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run dev server:
   ```bash
   npm run dev
   ```
3. Open the URL shown by Vite (usually http://localhost:5173)

## Backend (Node.js resume analyzer)
A Node.js backend is included under `/backend`.
To run backend:
```bash
cd backend
npm install
# create a .env file if you want OpenAI integration (optional)
# .env example:
# OPENAI_API_KEY=sk-...
node index.js
```
The backend listens on port 8000 by default and exposes `/api/analyze-resume`.

## Notes
- If you don't add an OpenAI API key, the backend will run a local scoring heuristic.
- Update `src/data/profile.js` with your GitHub username, LinkedIn URL, and email to enable Live GitHub Stats and contact links.

Enjoy! 🎉
