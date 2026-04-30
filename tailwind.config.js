/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          50:  '#f6f7f9',
          100: '#eceef2',
          200: '#d4d8e0',
          300: '#aab1bf',
          400: '#7a8497',
          500: '#566276',
          600: '#3f4759',
          700: '#2e3443',
          800: '#1f2330',
          900: '#13161f',
          950: '#0a0c12',
        },
        accent: {
          50:  '#eef4ff',
          100: '#dde7ff',
          200: '#b8ccff',
          300: '#8aa9ff',
          400: '#5e85ff',
          500: '#3b66f5',
          600: '#2a4ed1',
          700: '#1f3da3',
          800: '#1a347e',
          900: '#172d65',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        verdict: {
          green:  '#10b981',
          amber:  '#f59e0b',
          red:    '#ef4444',
          blue:   '#3b82f6',
          violet: '#8b5cf6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(94,133,255,0.35), 0 8px 24px -8px rgba(94,133,255,0.25)',
      },
      animation: {
        'pulse-soft': 'pulse 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
