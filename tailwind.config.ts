import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Background palette ──────────────────────────────────────
        oat: {
          base:    'var(--bg-base)',      // #F4ECDD — main page bg
          surface: 'var(--bg-surface)',   // #EAE0CC — cards, alternate sections
          elevated:'var(--bg-elevated)',  // #FBF6EC — hover, raised surfaces
          border:  'var(--border-subtle)',// #D9E2FF — blue-tinted hairline
          stroke:  'var(--border-strong)',// #7A96E8 — blue emphasis border
        },
        // ── Text palette ────────────────────────────────────────────
        soil: {
          DEFAULT:   'var(--text-primary)',   // #3A2A1F — headings, primary text
          secondary: 'var(--text-secondary)', // #7A6655 — body copy
          muted:     'var(--text-muted)',     // #A89684 — labels, captions
        },
        // ── Accent: cobalt blue (Talavera tiles / jar label) ───────
        terracotta: {
          DEFAULT: 'var(--accent-primary)',      // #3B5BDB
          dark:    'var(--accent-primary-hover)',// #2F4AC2
        },
        // ── Accent: lighter blue (subtle highlights) ───────────────
        honey: {
          DEFAULT: 'var(--accent-secondary)', // #6B8CFF
        },
      },
      fontFamily: {
        // Override Tailwind's serif/sans so font-serif and font-sans
        // resolve to the brand fonts everywhere.
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans:  ['Inter', '"Segoe UI"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // All shadows use a warm brown base — never gray/blue.
        soft: '0 2px 12px rgba(58, 42, 31, 0.08)',
        card: '0 4px 16px rgba(58, 42, 31, 0.10)',
        lift: '0 6px 20px rgba(58, 42, 31, 0.12)',
      },
    },
  },
  plugins: [],
} satisfies Config
