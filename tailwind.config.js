/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D41F21',
        'primary-hover': '#BC1B1D',
        'primary-active': '#A41719',
        charcoal: '#333333',
      },
      fontFamily: {
        heading: ['Manrope', 'Inter', 'sans-serif'],
        body: ['Inter', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        lg: ['1rem', { fontWeight: '410' }],
        xl: ['1.22rem', { lineHeight: '1.485', fontWeight: '300' }],
        '2xl': '1.68rem',
        '4xl': ['2.6rem', { lineHeight: '1.224' }],
        '5xl': ['5rem', { lineHeight: '1.32', fontWeight: '200' }],
      },
      maxWidth: {
        '7xl': '66em',
      },
    },
  },
  plugins: [],
};
