/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-content': 'var(--color-primary-content)',
        secondary: 'var(--color-secondary)',
        'secondary-hover': 'var(--color-secondary-hover)',
        'secondary-content': 'var(--color-secondary-content)',
        background: 'var(--color-background)',
        'background-alt': 'var(--color-background-alt)',
        text: 'var(--color-text)',
        'text-alt': 'var(--color-text-alt)',
      },
    },
  },
  plugins: [],
}