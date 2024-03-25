import { Meta } from '@storybook/react';

import { Tuto } from './Tuto';
import StepOneTuto from '@/assets/images/Step-One-Tuto.png';

export default {
  title: 'Components/Organisms/Tuto',
  component: Tuto,
} as Meta;

export const base = (): JSX.Element => (
  <div className="p-3">
    <br />
    <Tuto image={StepOneTuto} title="Title">
      Bonsoir
    </Tuto>
    <br />
  </div>
);
