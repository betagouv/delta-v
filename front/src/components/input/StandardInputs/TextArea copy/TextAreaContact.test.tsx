import { render } from '@testing-library/react';

import { TextAreaContact } from './TextAreaContact';

describe('TextAreaContact', () => {
  it('should render component', () => {
    const wrapper = render(<TextAreaContact name="inputname" />);
    const input = wrapper.getByTestId('textarea-element');
    expect(input).toBeVisible();
  });
  it('should render disabled component', () => {
    const wrapper = render(<TextAreaContact name="inputname" disabled />);
    const input = wrapper.getByTestId('textarea-element');
    input.hasAttribute('disabled');
  });
});
