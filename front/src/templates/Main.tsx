import { ReactNode } from 'react';

import { ToastContainer } from 'react-toastify';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="h-full w-full antialiased">
    {props.meta}

    <div className="mx-auto h-full max-w-screen-xl p-4">
      {props.children}
      <ToastContainer />
    </div>
  </div>
);

export { Main };
