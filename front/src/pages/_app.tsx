import { useEffect, useState } from 'react';

import { AppProps } from 'next/app';

import '../styles/global.css';
import '../config/i18n';
import { SvgIcon } from '@/components/common/SvgIcon';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, []);
  return (
    <>
      {loading && (
        <div className="fixed z-50 flex h-full w-full items-center bg-white">
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
      )}
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
