const path = require('path');

const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: [path.join(__dirname, './src/**/*.(js|jsx|ts|tsx)')],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#ecf1fa',
          200: '#dbe2f5',
          300: '#c7d6f0',
          400: '#9fb7e8',
          500: '#8eabe3',
          600: '#7d9ee0',
          700: '#6990da',
          800: '#5882d5',
          900: '#3f70ce',
        },
        secondary: colors.gray,
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
  plugins: [require('@tailwindcss/forms')],
};
