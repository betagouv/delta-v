import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { addDecorator } from '@storybook/react';
import { addParameters } from '@storybook/react';
import '../src/styles';
import '../src/configs/i18n';

import { GlobalThemeProvider } from '../src/theming/providers';

addDecorator((storyFn) => (
  <MemoryRouter>
    <GlobalThemeProvider>{storyFn()}</GlobalThemeProvider>
  </MemoryRouter>
));

addParameters({
  layout: 'fullscreen',
});

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};
