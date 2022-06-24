import { render } from '@testing-library/react';

import { SvgIcon } from './SvgIcon';

describe('SvgIcon', () => {
  it('should render SvgIcon', () => {
    const wrapper = render(<SvgIcon name="add" />);
    expect(wrapper.getByTestId('svg-element')).toBeVisible();
  });
});
