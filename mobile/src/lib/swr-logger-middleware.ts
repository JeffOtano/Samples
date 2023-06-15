import Config from 'react-native-config';
import { Middleware } from 'swr';

const swrLoggerMiddleware: Middleware = (useSWRNext) => (key, fetcher, config) => {
  const extendedFetcher = (...args) => {
    if (Config.SWR_LOGGER === 'true') {
      // eslint-disable-next-line no-console
      console.log(`SWR fetch: ${key}`);
    }
    return fetcher(...args);
  };

  return useSWRNext(key, extendedFetcher, config);
};

export default swrLoggerMiddleware;
