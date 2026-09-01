import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // Use jsdom to simulate browser environment
    environment: 'jsdom',

    // Setup file (global mocks etc.)
    setupFiles: ['./src/tests/setup.js'],

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html', 'json-summary'],
      reportsDirectory: './coverage',
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      exclude: [
        'src/tests/**',
        'src/**/*.test.{js,jsx}',
        'src/main.jsx',
        'node_modules/**',
      ],
      thresholds: {
        lines: 40,
        functions: 40,
        branches: 30,
        statements: 40,
      },
    },

    // JUnit XML for Jenkins
    reporters: ['verbose', 'junit'],
    outputFile: {
      junit: './junit-frontend.xml',
    },

    // Global test timeout
    testTimeout: 10000,

    // Globals (describe, it, expect available without imports)
    globals: true,
  },
});
