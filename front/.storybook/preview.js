import { addParameters } from '@storybook/react';
import { AppRouterContext } from "next/dist/shared/lib/app-router-context";
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
  nextRouter: {
    Provider: AppRouterContext.Provider,
  },
};
