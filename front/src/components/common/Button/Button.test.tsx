import { fireEvent, render } from '@testing-library/react';

import { Button } from './Button';

describe('Button', () => {
  it('should render button with onClick function', () => {
    const testFunction = jest.fn();
    const wrapper = render(<Button onClick={testFunction}>Hello</Button>);
    fireEvent.click(wrapper.getByTestId('button-element'));
    expect(testFunction).toBeCalled();
  });
  test.each([
    ['normal', ['text-white', 'bg-primary-600', 'border-transparent']],
    ['outlined', ['text-primary-600', 'bg-white', 'border-primary-600']],
    ['ghost', ['text-primary-600', 'bg-transparent', 'border-transparent']],
  ])('should render button with variant %p', (variant, classes) => {
    const wrapper = render(
      <Button variant={variant as 'normal' | 'outlined' | 'ghost'}>Hello</Button>,
    );
    const button = wrapper.getByTestId('button-element');

    classes.map((className) => expect(button).toHaveClass(className));
  });
  it('should not trigger on click with loading param', () => {
    const testFunction = jest.fn();
    const wrapper = render(
      <Button onClick={testFunction} loading>
        Hello
      </Button>,
    );
    fireEvent.click(wrapper.getByTestId('button-element'));
    expect(testFunction).not.toBeCalled();
  });
  it('should not trigger on click with disabled param', () => {
    const testFunction = jest.fn();
    const wrapper = render(
      <Button onClick={testFunction} disabled>
        Hello
      </Button>,
    );
    fireEvent.click(wrapper.getByTestId('button-element'));
    expect(testFunction).not.toBeCalled();
  });
});
