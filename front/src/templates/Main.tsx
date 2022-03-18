import { ReactNode } from 'react';

import { Title } from '@dataesr/react-dsfr';

import { AppConfig } from '@/utils/AppConfig';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <div className="px-1 w-full antialiased text-gray-700">
    {props.meta}

    <div className="mx-auto max-w-screen-md">
      <Title as="h1">{AppConfig.site_name}</Title>
      <div className="py-5 text-xl content">{props.children}</div>
    </div>
  </div>
);

export { Main };
