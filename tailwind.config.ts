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
          DEFAULT: '#0B1F33',
          dark: '#061320',
          light: '#142C44',
          subtle: '#1C3D5A',
        },
        safety: {
          DEFAULT: '#18A558',
          hover: '#138947',
          light: '#E8F7EE',
        },
        emergency: {
          DEFAULT: '#E53935',
          hover: '#C62828',
          light: '#FDECEC',
        },
        warning: {
          DEFAULT: '#F59E0B',
          hover: '#D97706',
          light: '#FEF3C7',
        },
        surface: {
          DEFAULT: '#F7F9FC',
          card: '#FFFFFF',
          border: '#E2E8F0',
        },
        darktext: '#102A43',
        muted: '#627D98',
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
