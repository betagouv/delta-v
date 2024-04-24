import user from '@testing-library/user-event';
import React from 'react';

import { fireEvent, render, screen, waitFor } from '@/utils/testUtils';

import { Form } from '../../core/Form';

import { Checkbox } from './index';

describe('<Checkbox />', () => {
  test('should validate in form', async () => {
    const mockSubmit = jest.fn((data) => {
      return data;
    });

    render(
      <Form onSubmit={mockSubmit}>
        <Checkbox id="description" />
        <button type="submit" data-testid="button-submit" />
      </Form>
    );

    const field = screen.getByTestId('input-description') as HTMLInputElement;
    fireEvent.input(field, {
      target: {
        value: 'test'
      }
    });

    expect(field.value).toBe('test');

    const submitButton = screen.getByTestId('button-submit') as HTMLButtonElement;
    await waitFor(() => user.click(submitButton));
    expect(mockSubmit).toBeCalledWith({ description: 'test' });
  });

  test('should render even if not in form', async () => {
    render(<Checkbox id="ismember" />);
    await screen.getByTestId('input-username');
  });
});
