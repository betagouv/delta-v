import { render } from '@testing-library/react';

import { CheckboxInput } from './CheckboxInput';

describe('Checkbox', () => {
  it('should render Checkbox', () => {
    const wrapper = render(<CheckboxInput name="inputname" />);
    const input = wrapper.getByTestId('checkbox-element');
    expect(input).toBeVisible();
  });
  it('should disable Checkbox param', () => {
    const wrapper = render(<CheckboxInput name="inputname" disabled />);
    const input = wrapper.getByTestId('checkbox-element');
    input.hasAttribute('disabled');
  });
});
