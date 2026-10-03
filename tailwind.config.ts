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
          dark: '#051322',
          light: '#133966',
          subtle: '#1E4976',
        },
        civic: {
          blue: '#2563EB',
          deep: '#0F2C59',
          royal: '#1D4ED8',
          sky: '#0284C7',
          light: '#E0F2FE',
          ice: '#F0F7FF',
        },
        safety: {
          DEFAULT: '#10B981',
          hover: '#059669',
          light: '#ECFDF5',
        },
        emergency: {
          DEFAULT: '#DC2626',
          hover: '#B91C1C',
          light: '#FEF2F2',
        },
        warning: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
          light: '#FEF3C7',
        },
        surface: {
          DEFAULT: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
          blueBorder: '#BFDBFE',
          blueTint: '#F0F7FF',
        },
        darktext: '#0F172A',
        muted: '#64748B',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-noto-bengali)', 'sans-serif'],
        bengali: ['var(--font-noto-bengali)', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 2px 10px rgba(11, 31, 51, 0.05)',
        card: '0 4px 20px -2px rgba(11, 31, 51, 0.08)',
        elevated: '0 12px 32px -4px rgba(11, 31, 51, 0.12)',
        emergency: '0 0 25px rgba(229, 57, 53, 0.35)',
        glow: '0 0 20px rgba(24, 165, 88, 0.3)',
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
