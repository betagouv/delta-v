import { Meta } from '@storybook/react';

import { Input } from './Input';

export default {
  title: 'Components/Input/StandardInputs/Input',
  component: Input,
} as Meta;

export const base = (): JSX.Element => (
  <>
    <div>
      <Input name="test" type="text" placeholder="auto width" />
    </div>
    <br />
    <br />
    <div>
      <Input name="test" type="text" fullWidth placeholder="Full Width" />
    </div>
    <br />
    <br />
    <div>
      <Input name="test" type="text" placeholder="with trailing icon" trailingIcon="menu" />
    </div>
    <br />
    <br />
    <div>
      <Input name="test" type="text" placeholder="with leading icon" leadingIcon="menu" />
    </div>
    <br />
    <br />
    <div>
      <Input name="test" type="text" placeholder="with leading adons" leadingAddons="$" />
    </div>
    <br />
    <br />
    <div>
      <Input name="test" type="text" placeholder="with trailing adons" trailingAddons="ans" />
    </div>
    <br />
    <br />
    <div>
      <Input name="test" type="text" error="test" placeholder="with error" />
    </div>
  </>
);
