/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      screens: {
        xs: '100%',
        sm: '567px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
    extend: {
      screens: {
        'xs': '425px',
        '2xs': '567px',
        
      },
      fontFamily: {
        signika: ['Signika', 'sans-serif'],
      },
      colors: {
        blues: '#007798',
        rating: '#e4e5e9',
        yellows: '#ffc107',
        hoverblue: '#3390a8'
      },
    },
  },
  plugins: [],
};
