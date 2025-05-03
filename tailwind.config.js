/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'light-bg': '#f8fafc',
        'light-card': '#ffffff',
        'light-border': '#e2e8f0',
        'light-hover': '#f1f5f9',
      },
    },
  },
  plugins: [],
};