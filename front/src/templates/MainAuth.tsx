import { ReactNode } from 'react';

import cs from 'classnames';

type IMainAgentProps = {
  meta: ReactNode;
  children: ReactNode;
  noPadding?: boolean;
};

const MainAuth = ({ children, meta, noPadding = false }: IMainAgentProps) => {
  return (
    <div className="h-full antialiased">
      {meta}

      <div
        className={cs({
          'flex min-h-[calc(100%-74px)] flex-col gap-6': true,
          'p-4': !noPadding,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export { MainAuth };
