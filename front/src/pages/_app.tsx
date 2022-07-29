import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { AppProps } from 'next/app';

import '../styles/global.css';
import '../config/i18n';
import { SvgIcon } from '@/components/common/SvgIcon';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const shouldLoad = process.env.NODE_ENV === 'production';

  const [loading, setLoading] = useState(shouldLoad);
  const [hideLoading, setHideLoading] = useState(shouldLoad);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        setLoading(false);
      }, 1200);
      setTimeout(() => {
        setHideLoading(true);
      }, 1500);
    }
  }, []);
  return (
    <>
      <div
        className={classNames({
          'fixed z-50 flex h-full w-full items-center bg-white transition-[opacity] ease-out duration-300':
            true,
          'opacity-100': loading,
          'opacity-0': !loading,
          hidden: hideLoading,
        })}
      >
        <span className="flex-1" />
        <div className="flex flex-row gap-1">
          <div className="h-16 w-auto">
            <SvgIcon name="logoDouane" />
          </div>
          <div
            className="logo-animate bg-gradient-to-br from-[#ED1639] to-[#000091] bg-clip-text text-4xl font-bold leading-8 
    text-transparent"
          >
            Déclare <br /> Douane
          </div>
        </div>
        <span className="flex-1" />
      </div>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
