import { addParameters } from '@storybook/react';
import '../src/styles/global.css';
import '../src/config/i18n';

addParameters({
  layout: 'fullscreen',
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  previewTabs: {
    'storybook/docs/panel': { index: -1 },
  },
};
