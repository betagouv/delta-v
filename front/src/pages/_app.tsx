import React from 'react';

import { AppProps } from 'next/app';

import '../styles/global.css';
import 'react-toastify/dist/ReactToastify.css';
import '../config/i18n';

const MyApp = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;

export default MyApp;
