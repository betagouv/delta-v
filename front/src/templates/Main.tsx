import { ReactNode } from 'react';

import { ToastContainer } from 'react-toastify';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full antialiased">
    {props.meta}

    <div className="mx-auto max-w-screen-xl">
      <div>{props.children}</div>
      <ToastContainer />
    </div>
  </div>
);

export { Main };
