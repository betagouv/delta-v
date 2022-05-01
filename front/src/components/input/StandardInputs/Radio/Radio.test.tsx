import { render } from '@testing-library/react';

import { Radio } from './Radio';

describe('Radio', () => {
  it('should render radio', () => {
    const wrapper = render(<Radio name="inputname" radioValues={[{ id: 'id', value: 'value' }]} />);
    const input = wrapper.getByTestId('radio-element');
    expect(input).toBeVisible();
  });
  it('should disable radio param', () => {
    const wrapper = render(
      <Radio name="inputname" radioValues={[{ id: 'id', value: 'value' }]} disabled />,
    );
    const input = wrapper.getByTestId('radio-element');
    input.hasAttribute('disabled');
  });
});
