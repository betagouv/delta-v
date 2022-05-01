import { render } from '@testing-library/react';

import { InputGroup } from './InputGroup';

describe('InputGroup', () => {
  it('should render input group', () => {
    const wrapper = render(<InputGroup name="inputname" label="Label" type="text" />);
    const label = wrapper.getByTestId('label-element');
    const input = wrapper.getByTestId('input-element');
    expect(() => wrapper.getByTestId('error-element')).toThrowError();
    expect(label).toBeVisible();
    expect(input).toBeVisible();
  });
  it('should render input group disabled', () => {
    const wrapper = render(<InputGroup name="inputname" label="Label" type="text" disabled />);
    const label = wrapper.getByTestId('label-element');
    const input = wrapper.getByTestId('input-element');
    expect(label).toBeVisible();
    expect(input).toBeVisible();
    input.hasAttribute('disabled');
  });
  it('should render input group with error', () => {
    const wrapper = render(
      <InputGroup name="inputname" label="Label" type="text" disabled error="Error" />,
    );
    const label = wrapper.getByTestId('label-element');
    const input = wrapper.getByTestId('input-element');
    const error = wrapper.getByTestId('error-element');
    expect(label).toBeVisible();
    expect(input).toBeVisible();
    expect(error).toBeVisible();
  });
});
