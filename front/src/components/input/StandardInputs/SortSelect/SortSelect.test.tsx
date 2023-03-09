import { render } from '@testing-library/react';
import { useForm } from 'react-hook-form';

import { SortSelect } from './SortSelect';

describe('SortSelect', () => {
  it('should render select', () => {
    const Component = () => {
      const { control } = useForm();
      return (
        <SortSelect name="inputname" options={[{ id: 'id', value: 'value' }]} control={control} />
      );
    };
    const wrapper = render(<Component />);
    const input = wrapper.getByTestId('select-element');
    expect(input).toBeVisible();
  });
  it('should disable select', () => {
    const Component = () => {
      const { control } = useForm();
      return (
        <SortSelect
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
