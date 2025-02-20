import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f4f6',
          100: '#e5e7eb',
          200: '#d1d5db',
          300: '#bfcbd9',
          400: '#933333',
          500: '#1e40af',
          600: '#1d3c9e',
          700: '#1a368c',
          800: '#162d73',
          900: '#0b1d46',
        },
      },
      boxShadow: {
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.28)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
    container: {
      center: true,
      padding: '2rem',
    },
  },
  plugins: [],
} satisfies Config;


