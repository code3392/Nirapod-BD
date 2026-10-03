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
          DEFAULT: '#0A2540',
          dark: '#030812',
          light: '#0E2A4D',
          subtle: '#143660',
        },
        civic: {
          blue: '#2563EB',
          deep: '#071320',
          royal: '#1D4ED8',
          sky: '#38BDF8',
          light: '#0E2847',
          ice: '#071A30',
        },
        safety: {
          DEFAULT: '#2563EB',
          hover: '#1D4ED8',
          light: '#0C223E',
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
          DEFAULT: '#060D1A',
          card: '#0A182B',
          border: 'rgba(255, 255, 255, 0.08)',
          blueBorder: 'rgba(56, 189, 248, 0.25)',
          blueTint: '#0B1E36',
        },
        darktext: '#F8FAFC',
        muted: '#94A3B8',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-noto-bengali)', 'sans-serif'],
        bengali: ['var(--font-noto-bengali)', 'sans-serif'],
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
