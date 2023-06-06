import { Method } from 'axios';
import { QueryClient } from 'react-query';
import { toast } from 'react-toastify';

import axiosInstance from './axios';

const defaultQueryFn = async ({ queryKey }: { queryKey: any }) => {
  const data = await axiosInstance.get(queryKey[0], {
    ...(queryKey[1]?.params ? { params: queryKey[1].params } : {}),
  });

  return data.data;
};

export const fetch = async <T>(url: string, input: T, method: Method = 'POST') => {
  try {
    const { data } = await axiosInstance(url, {
      method,
      data: input,
    });
    return data;
  } catch (err: any) {
    if (err?.response?.data?.message) {
      toast.error(err.response.data.message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        theme: 'colored',
      });
    }
    throw err;
  }
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      retryDelay: 1000 * 30, // 30 sec
      retry: 3,
    },
  },
});

export default queryClient;
