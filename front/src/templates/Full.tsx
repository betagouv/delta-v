import { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Full = ({ children, meta }: IMainProps) => {
  return (
    <div className="h-full antialiased">
      {meta}

      <div className="flex min-h-[100%] flex-col gap-6 p-4">{children}</div>
    </div>
  );
};

export { Full };
