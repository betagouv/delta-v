import { Meta } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies

import { SvgIcon } from './SvgIcon';

export default {
  title: 'Resources/SvgIcons',
} as Meta;

export const Base = (): JSX.Element => {
  return (
    <div className="flex flex-row space-x-5">
      <div className="flex h-14 w-20 flex-col text-center">
        <SvgIcon name="car" />
        <span>car</span>
      </div>
      <div className="flex h-14 w-20 flex-col text-center">
        <SvgIcon name="boat" />
        <span>boat</span>
      </div>
      <div className="flex h-14 w-20 flex-col text-center">
        <SvgIcon name="other" />
        <span>other</span>
      </div>
      <div className="flex h-14 w-20 flex-col text-center">
        <SvgIcon name="plane" />
        <span>plane</span>
      </div>
      <div className="flex h-14 w-20 flex-col text-center">
        <SvgIcon name="train" />
        <span>train</span>
      </div>
      <div className="flex h-14 w-20 flex-col text-center">
        <SvgIcon name="luggages" />
        <span>luggages</span>
      </div>
      <div className="flex h-14 w-20 flex-col text-center">
        <SvgIcon name="mail" />
        <span>mail</span>
      </div>
      <div className="flex h-14 w-20 flex-col text-center">
        <SvgIcon name="phone" />
        <span>phone</span>
      </div>
      <div className="flex h-14 w-20 flex-col text-center">
        <SvgIcon name="calculator" />
        <span>calculator</span>
      </div>
      <div className="flex h-14 w-20 flex-col text-center">
        <SvgIcon name="question" />
        <span>question</span>
      </div>
    </div>
  );
};
