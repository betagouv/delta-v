import axios from 'axios';

import { Config } from '.';

const axiosInstance = axios.create({
  // FIXME: change with env variable
  baseURL: Config.apiBaseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const isRequestCancelled = (error: Error) => {
  return axios.isCancel(error);
};

export default axiosInstance;
