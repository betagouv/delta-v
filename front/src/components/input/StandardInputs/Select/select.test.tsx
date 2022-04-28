import { render } from '@testing-library/react';
import { useForm } from 'react-hook-form';

import { Select } from './Select';

describe('Select', () => {
  it('should render select', () => {
    const Component = () => {
      const { control } = useForm();
      return <Select name="inputname" options={[{ id: 'id', value: 'value' }]} control={control} />;
    };
    const wrapper = render(<Component />);
    const input = wrapper.getByTestId('select-element');
    expect(input).toBeVisible();
  });
  it('should disable select', () => {
    const Component = () => {
      const { control } = useForm();
      return (
        <Select
          name="inputname"
          options={[{ id: 'id', value: 'value' }]}
          disabled
          control={control}
        />
      );
    };
    const wrapper = render(<Component />);
    const input = wrapper.getByTestId('select-element');
    input.hasAttribute('disabled');
  });
});
