import { render } from '@testing-library/react';

import { File } from './File';

describe('File', () => {
  it('should render input', () => {
    const wrapper = render(<File name="inputname" />);
    const input = wrapper.getByTestId('file-element');
    expect(input).toBeVisible();
  });
});
