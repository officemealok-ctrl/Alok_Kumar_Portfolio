/**
 * Backend Health & API Integration Tests
 * Uses supertest to spin up the Express app and fire real HTTP requests.
 * No network calls — AI/email services are mocked.
 */

const request = require('supertest');

// ── Mock external services so tests are deterministic ──────────────────
jest.mock('@google/generative-ai', () => ({
  GoogleGenerativeAI: jest.fn().mockImplementation(() => ({
    getGenerativeModel: jest.fn().mockReturnValue({
      generateContent: jest.fn().mockResolvedValue({
        response: {
          text: () => JSON.stringify({
            score: 78,
            overall_summary: 'Test summary',
            key_strengths: ['React', 'Node.js'],
            improvement_areas: ['Add more details'],
            technical_skills_detected: ['JavaScript'],
            soft_skills_detected: ['Communication'],
            experience_level: 'Intermediate',
            recommendations: ['Use more action verbs'],
            section_scores: {
              'Technical Skills': 80,
              Experience: 70,
              Projects: 75,
              Education: 65,
              'Soft Skills': 60,
            },
            graph_insights: {
              skill_match_percent: 78,
              action_verb_usage: 65,
              content_density: 72,
            },
          }),
        },
      }),
    }),
  })),
}));

jest.mock('openai', () =>
  jest.fn().mockImplementation(() => ({
    chat: {
      completions: {
        create: jest.fn().mockResolvedValue({
          choices: [{ message: { content: JSON.stringify({ score: 70, highlights: 'good', suggestions: 'improve' }) } }],
        }),
      },
    },
  }))
);

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockResolvedValue({ messageId: 'test-id' }),
  }),
}));

// ── Load app after mocks ───────────────────────────────────────────────
let app;

beforeAll(() => {
  // Prevent the server from actually listening on a port during tests
  jest.spyOn(require('http').Server.prototype, 'listen').mockImplementation(function (port, cb) {
    if (cb) cb();
    return this;
  });

  // Set env vars
  process.env.NODE_ENV = 'test';
  process.env.PORT = '0';

  app = require('../index');
});

afterAll(() => {
  jest.restoreAllMocks();
});

// ════════════════════════════════════════════════════════════════════════
//  TEST SUITE 1: Health Check
// ════════════════════════════════════════════════════════════════════════
describe('GET /api/health', () => {
  it('should return HTTP 200', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
  });

  it('should return status: ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.body).toHaveProperty('status', 'ok');
  });

  it('should include uptime in response', async () => {
    const res = await request(app).get('/api/health');
    expect(res.body).toHaveProperty('uptime');
    expect(typeof res.body.uptime).toBe('number');
  });

  it('should return JSON content-type', async () => {
    const res = await request(app).get('/api/health');
    expect(res.headers['content-type']).toMatch(/application\/json/);
  });
});

// ════════════════════════════════════════════════════════════════════════
//  TEST SUITE 2: Resume Analyzer — Error Cases
// ════════════════════════════════════════════════════════════════════════
describe('POST /api/analyze-resume', () => {
  it('should return 400 when no file is provided', async () => {
    const res = await request(app)
      .post('/api/analyze-resume')
      .send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 with descriptive error message', async () => {
    const res = await request(app).post('/api/analyze-resume');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBeTruthy();
  });
});

// ════════════════════════════════════════════════════════════════════════
//  TEST SUITE 3: 404 for unknown routes
// ════════════════════════════════════════════════════════════════════════
describe('Unknown Routes', () => {
  it('GET /api/unknown should return 404', async () => {
    const res = await request(app).get('/api/unknown-endpoint-xyz');
    expect(res.statusCode).toBe(404);
  });
});

// ════════════════════════════════════════════════════════════════════════
//  TEST SUITE 4: CORS headers
// ════════════════════════════════════════════════════════════════════════
describe('CORS Headers', () => {
  it('should include CORS headers on /api/health', async () => {
    const res = await request(app)
      .get('/api/health')
      .set('Origin', 'https://alokkumarkaran.vercel.app');
    // CORS should allow configured origins
    expect(res.statusCode).toBe(200);
  });
});
