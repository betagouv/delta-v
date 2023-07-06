import { ReactNode } from 'react';

import cs from 'classnames';

type IMainAgentProps = {
  meta: ReactNode;
  children: ReactNode;
  withPadding?: boolean;
  bgColor?: 'none' | 'gray';
};

const MainAuth = ({ children, meta, withPadding = true, bgColor = 'none' }: IMainAgentProps) => {
  return (
    <div className={cs({ 'h-full antialiased': true, 'bg-secondary-100': bgColor === 'gray' })}>
      {meta}

      <div
        className={cs({
          'flex flex-col gap-6': true,
          'p-4': withPadding,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export { MainAuth };
