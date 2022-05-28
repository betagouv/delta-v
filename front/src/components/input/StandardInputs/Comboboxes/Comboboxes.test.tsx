import { render } from '@testing-library/react';
import { useForm } from 'react-hook-form';

import { Comboboxes } from './Comboboxes';

describe('Comboboxes', () => {
  it('should render Comboboxes', () => {
    const Component = () => {
      const { control } = useForm();
      return (
        <Comboboxes name="inputname" options={[{ id: 'id', value: 'value' }]} control={control} />
      );
    };
    const wrapper = render(<Component />);
    const input = wrapper.getByTestId('comboboxes-element');
    expect(input).toBeVisible();
  });
  it('should disable select', () => {
    const Component = () => {
      const { control } = useForm();
      return (
        <Comboboxes
          name="inputname"
          options={[{ id: 'id', value: 'value' }]}
          disabled
          control={control}
        />
      );
    };
    const wrapper = render(<Component />);
    const input = wrapper.getByTestId('comboboxes-element');
    input.hasAttribute('disabled');
  });
});
