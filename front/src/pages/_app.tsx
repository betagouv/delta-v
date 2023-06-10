import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react';
import classNames from 'classnames';
import { AppProps } from 'next/app';
import '../styles/global.css';
import '../config/i18n';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import shallow from 'zustand/shallow';

import { SvgIcon } from '@/components/common/SvgIcon';
import { useStore } from '@/stores/store';

const ONE_DAY = 86400000;

const MyApp = ({ Component, pageProps }: AppProps) => {
  const instance = createInstance({
    urlBase: 'https://declare-douane.matomo.cloud/',
    siteId: 1,
  });
  const [loading, setLoading] = useState(true);
  const [hideLoading, setHideLoading] = useState(false);
  const { getCurrenciesResponse, getProductsResponse } = useStore(
    (state) => ({
      getCurrenciesResponse: state.getCurrenciesResponse,
      getProductsResponse: state.getProductsResponse,
    }),
    shallow,
  );
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

  useEffect(() => {
    getProductsResponse();
    getCurrenciesResponse();

    const intervalId = setInterval(() => {
      getProductsResponse();
      getCurrenciesResponse();
    }, ONE_DAY);

    return () => clearInterval(intervalId);
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: undefined,
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <MatomoProvider value={instance}>
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
        <ToastContainer />
      </MatomoProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
