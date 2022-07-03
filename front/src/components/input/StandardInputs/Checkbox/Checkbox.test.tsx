import { render } from '@testing-library/react';

import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('should render Checkbox', () => {
    const wrapper = render(<Checkbox name="inputname" />);
    const input = wrapper.getByTestId('checkbox-element');
    expect(input).toBeVisible();
  });
  it('should disable Checkbox param', () => {
    const wrapper = render(<Checkbox name="inputname" disabled />);
    const input = wrapper.getByTestId('checkbox-element');
    input.hasAttribute('disabled');
  });
});
