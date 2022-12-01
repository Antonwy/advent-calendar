/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'green-light': '#B8D4CD',
        green: '#348471',
        gray: '#C0C0C0',
        'gray-light': '#EDEEEE',
        white: '#FFFFFF',
      },
    },
  },
  plugins: [],
};
