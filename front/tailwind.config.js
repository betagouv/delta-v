const path = require('path');

// eslint-disable-next-line import/no-extraneous-dependencies
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: [path.join(__dirname, './src/**/*.(js|jsx|ts|tsx)')],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#ecf1fa',
          200: '#b3b3de',
          300: '#9999d3',
          400: '#6666bd',
          500: '#3333a7',
          600: '#000091',
          700: '#000074',
          800: '#000057',
          900: '#00003a',
        },
        secondary: colors.gray,
        disabled: {
          background: '#E5E5E5',
          text: '#929292',
        },
        cancel: colors.red,
      },
      spacing: {
        small: '1rem',
        lightBase: '1.25rem',
        base: '1.5rem',
        largeBase: '1.75rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  // eslint-disable-next-line global-require
  plugins: [require('@tailwindcss/forms')],
};
