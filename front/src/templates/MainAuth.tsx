import { ReactNode } from 'react';

type IMainAgentProps = {
  meta: ReactNode;
  children: ReactNode;
};

const MainAuth = ({ children, meta }: IMainAgentProps) => {
  return (
    <div className="h-full antialiased">
      {meta}

      <div className="flex min-h-[calc(100%-74px)] flex-col gap-6 p-4">{children}</div>
    </div>
  );
};

export { MainAuth };
