/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rocket: '#564AF7',
        darkside: '#121827',
        yoda: '#0FB328',
        chewie: '#FFA900',
        maul: '#FF0000',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
