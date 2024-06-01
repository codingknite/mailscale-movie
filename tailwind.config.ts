import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        custom: '8px',
        smooth: '2rem',
      },
      backgroundImage: {
        'search-poster': 'url(/search-poster.webp)',
      },
      colors: {
        primary: {
          50: '#ffffea',
          100: '#fffbc5',
          200: '#fff885',
          300: '#ffee46',
          400: '#ffdf1b',
          500: '#ffc107',
          600: '#e29400',
          700: '#bb6902',
          800: '#985108',
          900: '#7c420b',
          950: '#482200',
        },
      },
    },
  },
  plugins: [],
};
export default config;
