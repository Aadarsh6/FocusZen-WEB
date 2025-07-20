/** @type {import('tailwindcss').Config} */
import preset from '@tailwindcss/preset'; // Make sure you have the preset

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [preset()], // Add the preset
  theme: {
    extend: {
      fontFamily: {
        'jost': ['Jost', 'sans-serif'],
        'intel': ['Intel One Mono', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
      },
      // Add your animations and keyframes here
      keyframes: {
        blob: {
          '0%': { transform: 'scale(1)' },
          '33%': { transform: 'scale(1.1)' },
          '66%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        blob: 'blob 7s infinite',
        fadeIn: 'fadeIn 0.8s ease-out forwards',
      }
    }
  },
  // The plugins array should be empty now
  plugins: [],
}