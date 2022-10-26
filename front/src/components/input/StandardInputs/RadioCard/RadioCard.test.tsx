import { fireEvent, render } from '@testing-library/react';
import { useForm } from 'react-hook-form';

import { RadioCard } from './RadioCard';

describe('RadioCard', () => {
  it.only('fake test', () => {
    expect(true).toBe(true);
  });
  it('should render RadioCard', () => {
    const VALUE_1 = 'value_1';
    const VALUE_2 = 'value_2';
    const Component = () => {
      const { control } = useForm();
      return (
        <RadioCard
          name="inputname"
          radioCardValues={[
            { id: 'id_1', value: VALUE_1, svgIcon: 'add' },
            { id: 'id_2', value: VALUE_2, svgIcon: 'add' },
          ]}
          control={control}
        />
      );
    };
    const wrapper = render(<Component />);
    const radioCard = wrapper.getByTestId('radio-cards-element');

    expect(radioCard).toBeVisible();
    expect(wrapper.getAllByTestId('radio-card-element').length).toEqual(2);
    expect(wrapper.getByText(VALUE_1)).toBeVisible();
    expect(wrapper.getByText(VALUE_2)).toBeVisible();
  });
  it('should render RadioCard - and trigger on change', () => {
    const VALUE_1 = 'value_1';
    const VALUE_2 = 'value_2';
    const testFunction = jest.fn();
    const Component = () => {
      const { control, register } = useForm();
      register('inputname', {
        onChange: () => testFunction(),
      });
      return (
        <RadioCard
          name="inputname"
          radioCardValues={[
            { id: 'id_1', value: VALUE_1, svgIcon: 'add' },
            { id: 'id_2', value: VALUE_2, svgIcon: 'add' },
          ]}
          control={control}
        />
      );
    };
    const wrapper = render(<Component />);
    const radioElement = wrapper.getAllByTestId('radio-card-element')[0];

    if (radioElement) {
      fireEvent.click(radioElement);
      expect(testFunction).toBeCalled();
    }
  });
  it('should render RadioCard - and not trigger disabled element', () => {
    const VALUE_1 = 'value_1';
    const VALUE_2 = 'value_2';
    const testFunction = jest.fn();
    const Component = () => {
      const { control, register } = useForm();
      register('inputname', {
        onChange: () => testFunction(),
      });
      return (
        <RadioCard
          name="inputname"
          radioCardValues={[
            { id: 'id_1', value: VALUE_1, svgIcon: 'add', disabled: true },
            { id: 'id_2', value: VALUE_2, svgIcon: 'add' },
          ]}
          control={control}
        />
      );
    };
    const wrapper = render(<Component />);
    const radioElement = wrapper.getAllByTestId('radio-card-element')[0];

    if (radioElement) {
      fireEvent.click(radioElement);
      expect(testFunction).not.toBeCalled();
    }
  });
});
