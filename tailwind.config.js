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
        primary: '#ED2224',
        'primary-hover': '#D41E20',
        'primary-active': '#C01A1C',
        charcoal: '#333333',
        'orange-sharp': '#ED8421',
        'yellow-sharp': '#EDEA21',
        'lime-sharp': '#8BED21',
        'green-sharp': '#25ED21',
        'mint-sharp': '#21ED84',
        'cyan-sharp': '#21EDEA',
        'sky-sharp': '#218BED',
        'blue-sharp': '#2125ED',
        'purple-sharp': '#8421ED',
        'magenta-sharp': '#EA21ED',
        'pink-sharp': '#ED218B',
        success: '#25ED21',
        warning: '#EDEA21',
        error: '#ED2224',
        info: '#218BED',
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
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
