// File: clinic-frontend/tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#0ea5e9',
        'dark-bg': '#0f172a',
        'dark-card': '#1e293b',
        'dark-text': '#e2e8f0',
        'dark-subtle': '#94a3b8',
      },
    },
  },
  plugins: [],
}