import { render } from '@testing-library/react';

import { PeriodInput } from './PeriodInput';

describe('Input', () => {
  it('should render input', () => {
    const wrapper = render(<PeriodInput />);
    const input = wrapper.getByTestId('input-element');
    expect(input).toBeVisible();
  });
  it('should disable input param', () => {
    const wrapper = render(<PeriodInput />);
    const input = wrapper.getByTestId('input-element');
    input.hasAttribute('disabled');
  });
});
