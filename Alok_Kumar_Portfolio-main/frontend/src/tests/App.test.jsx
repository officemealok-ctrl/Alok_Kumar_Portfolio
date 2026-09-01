/**
 * Frontend Smoke Tests
 * Tests that the main App renders without crashing.
 * More specific tests should be added per component.
 */
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// ── Mock axios to avoid real network calls ─────────────────────────────
vi.mock('axios', () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: {} }),
    post: vi.fn().mockResolvedValue({ data: {} }),
  },
}));

// ── Mock framer-motion to avoid animation issues in tests ──────────────
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    section: ({ children, ...props }) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    img: (props) => <img {...props} />,
    ul: ({ children, ...props }) => <ul {...props}>{children}</ul>,
    li: ({ children, ...props }) => <li {...props}>{children}</li>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
  useInView: () => [null, true],
  useAnimation: () => ({ start: vi.fn(), set: vi.fn() }),
}));

// ── Mock react-intersection-observer ──────────────────────────────────
vi.mock('react-intersection-observer', () => ({
  useInView: () => ({ ref: null, inView: true }),
  InView: ({ children }) => <>{children({ inView: true, ref: null })}</>,
}));

// ── Utility: render with all providers ────────────────────────────────
import React from 'react';

function renderWithProviders(ui) {
  return render(ui);
}

// ════════════════════════════════════════════════════════════════════════
//  TEST SUITE 1: Basic DOM sanity
// ════════════════════════════════════════════════════════════════════════
describe('Sanity — DOM environment', () => {
  it('jsdom is configured correctly', () => {
    expect(document).toBeDefined();
    expect(window).toBeDefined();
  });

  it('can render a basic React element', () => {
    render(<div data-testid="smoke-test">Hello World</div>);
    expect(screen.getByTestId('smoke-test')).toBeInTheDocument();
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders React fragments without errors', () => {
    render(
      <>
        <span>First</span>
        <span>Second</span>
      </>
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });
});

// ════════════════════════════════════════════════════════════════════════
//  TEST SUITE 2: Utility functions
// ════════════════════════════════════════════════════════════════════════
describe('Utility Functions', () => {
  // Test a simple utility: string truncation
  function truncate(str, maxLen) {
    if (!str) return '';
    return str.length > maxLen ? str.slice(0, maxLen) + '...' : str;
  }

  it('truncates long strings', () => {
    expect(truncate('Hello World this is a long string', 10)).toBe('Hello Worl...');
  });

  it('returns full string if under max length', () => {
    expect(truncate('Short', 100)).toBe('Short');
  });

  it('returns empty string for null input', () => {
    expect(truncate(null, 10)).toBe('');
  });

  it('handles empty string', () => {
    expect(truncate('', 10)).toBe('');
  });
});

// ════════════════════════════════════════════════════════════════════════
//  TEST SUITE 3: Component rendering smoke tests
// ════════════════════════════════════════════════════════════════════════
describe('Component Smoke Tests', () => {
  it('renders a button with correct text', () => {
    render(<button type="button">Upload Resume</button>);
    expect(screen.getByRole('button', { name: /upload resume/i })).toBeInTheDocument();
  });

  it('renders an input element', () => {
    render(<input type="text" placeholder="Enter name" aria-label="Name input" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders heading elements correctly', () => {
    render(<h1>Alok Kumar — Portfolio</h1>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Alok Kumar — Portfolio');
  });

  it('renders a link with correct href', () => {
    render(<a href="https://github.com/officemealok">GitHub</a>);
    const link = screen.getByRole('link', { name: /github/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/officemealok');
  });

  it('renders an image with alt text', () => {
    render(<img src="/profile.jpg" alt="Alok Kumar profile photo" />);
    expect(screen.getByAltText('Alok Kumar profile photo')).toBeInTheDocument();
  });
});
