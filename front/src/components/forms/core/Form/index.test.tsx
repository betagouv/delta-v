import user from '@testing-library/user-event';
import React from 'react';

import { fireEvent, render, screen, waitFor } from '@/utils/testUtils';

import { SelectInput } from '../../base/SelectInput';
import { TextInput } from '../../base/TextInput';

import { Form } from './index';

describe('<Form />', () => {
  test('should have working form', async () => {
    const mockSubmit = jest.fn((data) => {
      return data;
    });

    render(
      <Form onSubmit={mockSubmit}>
        <TextInput id="text" label="text" />
        <div>
          <TextInput id="nested" label="nested" />
        </div>
        <button type="submit" data-testid="button-submit" />
      </Form>
    );

    const field = screen.getByTestId('input-text') as HTMLInputElement;
    fireEvent.input(field, {
      target: {
        value: 'test'
      }
    });

    expect(field.value).toBe('test');

    const submitButton = screen.getByTestId('button-submit') as HTMLButtonElement;
    await waitFor(() => user.click(submitButton));
    expect(mockSubmit).toBeCalledWith({ text: 'test', nested: '' });
  });

  test('should handle custom input in submit', async () => {
    const mockSubmit = jest.fn((data) => {
      return data;
    });

    render(
      <Form onSubmit={mockSubmit}>
        <SelectInput
          id="custom"
          label="custom"
          options={[
            { value: 'false', label: 'No' },
            { value: 'true', label: 'Yes' }
          ]}
        />
        <button type="submit" data-testid="button-submit" />
      </Form>
    );

    const select = screen.getByTestId('select-custom') as HTMLButtonElement;
    await waitFor(() => user.click(select));

    const option = screen.getByTestId('select-option-false') as HTMLElement;
    await waitFor(() => user.click(option));

    const submitButton = screen.getByTestId('button-submit') as HTMLButtonElement;
    await waitFor(() => user.click(submitButton));
    expect(mockSubmit).toBeCalledWith({ custom: 'false' });
  });
});
