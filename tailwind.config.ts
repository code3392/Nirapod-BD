import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#140C26',
          dark: '#080411',
          light: '#1D1236',
          subtle: '#27184A',
        },
        civic: {
          blue: '#2563EB',
          deep: '#0E081B',
          royal: '#1D4ED8',
          sky: '#38BDF8',
          light: '#1B1033',
          ice: '#130C24',
        },
        safety: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          light: '#1E103A',
        },
        emergency: {
          DEFAULT: '#EF4444',
          hover: '#DC2626',
          light: '#450A0A',
        },
        warning: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
          light: '#451A03',
        },
        surface: {
          DEFAULT: '#090514',
          card: '#130C24',
          border: 'rgba(255, 255, 255, 0.08)',
          blueBorder: 'rgba(168, 85, 247, 0.25)',
          blueTint: '#160E2A',
        },
        darktext: '#F8FAFC',
        muted: '#94A3B8',
      },
      fontFamily: {
        sans: [
          '"DM Sans"',
          '"Hind Siliguri"',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        display: [
          '"Space Grotesk"',
          '"Hind Siliguri"',
          'system-ui',
          'sans-serif',
        ],
        heading: [
          '"Space Grotesk"',
          '"Hind Siliguri"',
          'system-ui',
          'sans-serif',
        ],
        bengali: [
          '"Hind Siliguri"',
          '"Noto Sans Bengali"',
          'sans-serif',
        ],
        mono: [
          '"Space Grotesk"',
          '"DM Sans"',
          '"Hind Siliguri"',
          'system-ui',
          'sans-serif',
        ],
        num: [
          '"Space Grotesk"',
          '"DM Sans"',
          '"Hind Siliguri"',
          'system-ui',
          'sans-serif',
        ],
      },
      boxShadow: {
        subtle: '0 2px 10px rgba(0, 0, 0, 0.25)',
        card: '0 8px 30px rgba(0, 0, 0, 0.4)',
        elevated: '0 20px 40px -10px rgba(0, 0, 0, 0.6)',
        emergency: '0 0 30px rgba(239, 68, 68, 0.35)',
        glow: '0 0 25px rgba(37, 99, 235, 0.35)',
        neon: '0 0 35px rgba(56, 189, 248, 0.25)',
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-subtle': 'pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
    },
  },
  plugins: [],
};
export default config;
