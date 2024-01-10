import { ReactNode } from 'react';

import cs from 'classnames';
import Image from 'next/image';

import AuthBackground from '@/assets/images/Auth-Background.webp';

type IMainAgentProps = {
  meta: ReactNode;
  children: ReactNode;
  withPadding?: boolean;
  bgColor?: 'none' | 'gray' | 'white';
};

const desktopBgStyle = `linear-gradient(113deg, #ED1639 0.69%, #000091 100.47%)`;

const MainAuth = ({ children, meta, withPadding = true, bgColor = 'white' }: IMainAgentProps) => {
  return (
    <div
      className="flex h-full items-center place-content-center relative overflow-hidden"
      style={{ backgroundImage: desktopBgStyle }}
    >
      <Image
        src={AuthBackground.src}
        fill
        alt="authentication background"
        className="object-cover laptop:block hidden"
      />
      <div
        className={cs({
          'laptop:h-[755px] laptop:w-[420px] h-full w-full antialiased laptop:relative laptop:rounded-xl laptop:overflow-hidden':
            true,
          'bg-secondary-bg': bgColor === 'gray',
          'bg-white': bgColor === 'white',
        })}
      >
        {meta}

        <div
          className={cs({
            'flex flex-col gap-6 ': true,
            'p-4': withPadding,
          })}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export { MainAuth };
