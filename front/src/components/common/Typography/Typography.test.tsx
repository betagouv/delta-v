import { render } from '@testing-library/react';

import { Typography } from './Typography';

describe('Typography', () => {
  it('should render Typography - default type', () => {
    const wrapper = render(<Typography>Test</Typography>);
    const typography = wrapper.getByTestId('typography-element');
    expect(typography).toBeVisible();
    expect(typography.nodeName).toEqual('P');
  });
  it('should render Typography - type H2', () => {
    const wrapper = render(<Typography tag="h2">Test</Typography>);
    const typography = wrapper.getByTestId('typography-element');
    expect(typography).toBeVisible();
    expect(typography.nodeName).toEqual('H2');
  });
});
