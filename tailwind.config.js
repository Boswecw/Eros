/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./app.config.ts"
  ],
  theme: {
    extend: {
      colors: {
        // Eros brand colors
        eros: {
          DEFAULT: '#A78BFA', // lavender (primary)
          50: '#F5F3FF',
          100: '#EDE9FE', 
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          light: '#E9D5FF',   // soft lilac
          dark: '#7C3AED',    // deep orchid
          accent: '#F0ABFC',  // blush mauve
          rose: '#FCE7F3',    // pastel rose
        },
        // Custom neutrals
        bg: '#F9FAFB',        // whisper gray
        surface: '#FFFFFF',   // white
        border: '#EDE9FE',    // lavender tint
        text: '#1F2937',      // charcoal
        muted: '#4B5563',     // muted gray
      },
      backgroundImage: {
        'header-gradient': 'linear-gradient(to right, #E9D5FF, #A78BFA, #7C3AED)',
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}
