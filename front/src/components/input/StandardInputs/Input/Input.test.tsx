import { render } from '@testing-library/react';

import { Input } from './Input';

describe('Input', () => {
  it('should render input', () => {
    const wrapper = render(<Input name="inputname" type="text" />);
    const input = wrapper.getByTestId('input-element');
    expect(input).toBeVisible();
  });
  it('should disable input param', () => {
    const wrapper = render(<Input name="inputname" type="text" disabled />);
    const input = wrapper.getByTestId('input-element');
    input.hasAttribute('disabled');
  });
});
