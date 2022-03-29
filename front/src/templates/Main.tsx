import { ReactNode } from 'react';

import { ToastContainer } from 'react-toastify';

import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="w-full px-1 text-gray-700 antialiased">
    {props.meta}

    <div className="mx-auto max-w-screen-xl">
      <h1 className="text-2xl">{AppConfig.site_name}</h1>
      <div className="py-5 text-xl">{props.children}</div>
      <ToastContainer />
    </div>
  </div>
);

export { Main };
