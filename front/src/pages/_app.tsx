import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react';
import classNames from 'classnames';
import { AppProps } from 'next/app';
import '../styles/global.css';
import '../config/i18n';
import { NextRouter, useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ToastContainer } from 'react-toastify';
import shallow from 'zustand/shallow';

import { configureAxios } from '@/api/base';
import { SvgIcon } from '@/components/common/SvgIcon';
import { Config } from '@/config';
import { useStore } from '@/stores/store';
import { RoutingAuthentication } from '@/utils/const';

const ONE_DAY = 86400000;

const initAxios = (
  clearUser: () => void,
  setUserFromToken: (accessToken: string, refreshToken: string) => void,
  router: NextRouter,
) => {
  configureAxios({
    onRefreshTokenError: () => {
      clearUser();
      router.push(RoutingAuthentication.login);
    },
    onRefreshTokenSuccess: (accessToken, refreshToken) => {
      setUserFromToken(accessToken, refreshToken);
    },
  });
};

const initSplashScreen = (
  setLoading: (loading: boolean) => void,
  setHideLoading: (hideLoading: boolean) => void,
) => {
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
    setTimeout(() => {
      setHideLoading(true);
    }, 1500);
  }
};

const initLoadingData = (getProductsResponse: () => void, getCurrenciesResponse: () => void) => {
  getProductsResponse();
  getCurrenciesResponse();

  const intervalId = setInterval(() => {
    getProductsResponse();
    getCurrenciesResponse();
  }, ONE_DAY);

  return () => clearInterval(intervalId);
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  const instance = createInstance({
    urlBase: 'https://declare-douane.matomo.cloud/',
    siteId: 1,
  });
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [hideLoading, setHideLoading] = useState(false);
  const { getCurrenciesResponse, getProductsResponse, clearUser, setUserFromToken } = useStore(
    (state) => ({
      getCurrenciesResponse: state.getCurrenciesResponse,
      getProductsResponse: state.getProductsResponse,
      clearUser: state.clearUser,
      setUserFromToken: state.setUserFromToken,
    }),
    shallow,
  );

  useEffect(() => {
    initSplashScreen(setLoading, setHideLoading);
    initAxios(clearUser, setUserFromToken, router);
    return initLoadingData(getProductsResponse, getCurrenciesResponse);
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: undefined,
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <MatomoProvider value={instance}>
        {!hideLoading && (
          <div
            className={classNames({
              'fixed z-50 flex h-full w-full items-center bg-white transition-[opacity] ease-out duration-300':
                true,
              'opacity-100': loading,
              'opacity-0': !loading,
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
        )}
        {!loading && <Component {...pageProps} />}
        <ToastContainer />
      </MatomoProvider>
      {!Config.isProduction && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default MyApp;
