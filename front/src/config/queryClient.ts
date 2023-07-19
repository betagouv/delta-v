import axios from 'axios';
import { QueryClient } from 'react-query';

const defaultQueryFn = async ({ queryKey }: { queryKey: any }) => {
  const data = await axios.get(queryKey[0], {
    ...(queryKey[1]?.params ? { params: queryKey[1].params } : {}),
  });

  return data.data;
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
