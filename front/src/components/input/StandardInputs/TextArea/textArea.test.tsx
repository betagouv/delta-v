import { render } from '@testing-library/react';

import { TextArea } from './TextArea';

describe('TextArea', () => {
  it('should render component', () => {
    const wrapper = render(<TextArea name="inputname" />);
    const input = wrapper.getByTestId('textarea-element');
    expect(input).toBeVisible();
  });
  it('should render disabled component', () => {
    const wrapper = render(<TextArea name="inputname" disabled />);
    const input = wrapper.getByTestId('textarea-element');
    input.hasAttribute('disabled');
  });
});
