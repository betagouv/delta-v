/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
const path = require('path');
const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: [path.join(__dirname, './src/**/*.(js|jsx|ts|tsx)')],
  safelist: ['truncate'],
  theme: {
    extend: {
      fontSize: {
        '2xs': '.625rem',
      },
      colors: {
        primary: {
          100: '#ecf1fa',
          200: '#b3b3de',
          300: '#9999d3',
          400: '#6A6AF4',
          500: '#0C0CCF',
          600: '#000091',
          700: '#000074',
          800: '#000057',
          900: '#00003a',
        },
        secondary: { bg: '#f6f6f6', ...colors.gray, 600: '#161616' },
        disabled: {
          bg: '#D9D9D9',
          text: '#929292',
        },
        defaultText: '#161616',
        lightBlue: '#E3E3FD',
        cancel: colors.red,
        link: '#6A6AF4',
        error: '#CE0500',
        success: '#18753C',
        note: '#FFEA79',
      },
      spacing: {
        extraSmall: '0.75rem',
        small: '1rem',
        lightBase: '1.25rem',
        base: '1.5rem',
        largeBase: '1.75rem',
        modal: '35px',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  corePlugins: {
    textOpacity: false,
    backgroundOpacity: false,
    borderOpacity: false,
    divideOpacity: false,
    placeholderOpacity: false,
    ringOpacity: false,
  },
  plugins: [
    require('@tailwindcss/forms'),
    // eslint-disable-next-line func-names
    plugin(function ({ addBase, theme, addVariant }) {
      addBase({
        h1: { fontSize: theme('fontSize.3xl'), lineHeight: theme('lineHeight.none') },
      });
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    }),

    require('@tailwindcss/line-clamp'),
  ],
};
