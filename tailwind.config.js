import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-rgba': 'rgba(255, 0, 0, 0.8)', 
      },
    },
  },
  plugins: [daisyui],
  daisyui: {themes: ["light"]}
}

