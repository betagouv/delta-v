import user from '@testing-library/user-event';
import React from 'react';

import { render, screen, waitFor } from '@/utils/testUtils';

import { Form } from '../../core/Form';

import { SelectInput } from './index';

describe('<SelectInput />', () => {
  test('should validate in form', async () => {
    const mockSubmit = jest.fn((data) => {
      return data;
    });

    render(
      <Form onSubmit={mockSubmit}>
        <SelectInput
          id="choice"
          options={[
            { value: 'false', label: 'No' },
            { value: 'true', label: 'Yes' }
          ]}
        />
        <button type="submit" data-testid="button-submit" />
      </Form>
    );

    const select = screen.getByTestId('select-choice') as HTMLButtonElement;
    await waitFor(() => user.click(select));

    const option = screen.getByTestId('select-option-false') as HTMLElement;
    await waitFor(() => user.click(option));

    const submitButton = screen.getByTestId('button-submit') as HTMLButtonElement;
    await waitFor(() => user.click(submitButton));
    expect(mockSubmit).toBeCalledWith({ choice: 'false' });
  });
});
