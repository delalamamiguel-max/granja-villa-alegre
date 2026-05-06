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
          border:  'var(--border-subtle)',// #D9CCB3 — hairline borders
          stroke:  'var(--border-strong)',// #B8A88E — emphasis borders
        },
        // ── Text palette ────────────────────────────────────────────
        soil: {
          DEFAULT:   'var(--text-primary)',   // #3A2A1F — headings, primary text
          secondary: 'var(--text-secondary)', // #7A6655 — body copy
          muted:     'var(--text-muted)',     // #A89684 — labels, captions
        },
        // ── Accent: terracotta (primary CTA) ───────────────────────
        terracotta: {
          DEFAULT: 'var(--accent-primary)',      // #B8654A
          dark:    'var(--accent-primary-hover)',// #9E5239
        },
        // ── Accent: honey (small highlights only) ──────────────────
        honey: {
          DEFAULT: 'var(--accent-secondary)', // #C9974A
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
