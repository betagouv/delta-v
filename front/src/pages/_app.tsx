import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import 'react-toastify/dist/ReactToastify.css';

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
import { Typography } from '@/components/atoms/Typography';
import { FontInitializer } from '@/components/molecules/FontInitializer';
import { SvgIcon } from '@/components/molecules/SvgIcon';
import { Config } from '@/config';
import { useStore } from '@/stores/store';
import { RoutingAuthentication } from '@/utils/const';

const ONE_DAY = 86400000;

const initAxios = (
  clearUser: () => void,
  setUserFromToken: (accessToken: string, refreshToken: string, lastRefresh: boolean) => void,
  router: NextRouter,
) => {
  configureAxios({
    onRefreshTokenError: () => {
      clearUser();
      router.replace(RoutingAuthentication.login);
    },
    onRefreshTokenSuccess: (accessToken, refreshToken, lastRefresh) => {
      setUserFromToken(accessToken, refreshToken, lastRefresh);
    },
  });
};

const initSplashScreen = (
  setLoading: (loading: boolean) => void,
  setHideLoading: (hideLoading: boolean) => void,
  setShowContent: (showContent: boolean) => void,
) => {
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      setShowContent(true);
    }, 300);
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
  const path = router.pathname;
  const [showContent, setShowContent] = useState(false);
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
    initSplashScreen(setLoading, setHideLoading, setShowContent);
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
      <FontInitializer />
      <ToastContainer />
      <MatomoProvider value={instance}>
        {!hideLoading && (
          <div
            className={classNames({
              'fixed z-50 flex flex-col h-full w-full bg-white transition-[opacity] ease-out duration-300':
                true,
              'opacity-100': loading,
              'opacity-0': !loading,
            })}
          >
            <div className="h-1/3" />
            <div className="flex flex-col w-40 mx-auto h-40">
              <SvgIcon name={path.startsWith('/agent') ? 'logoAgent' : 'logo'} />
              <Typography textPosition="text-center" weight="bold" size="text-2xs">
                Chargement
              </Typography>
            </div>
          </div>
        )}
        {showContent && <Component {...pageProps} />}
      </MatomoProvider>

      {!Config.isProduction && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

export default MyApp;
