import { QueryClient } from "@tanstack/react-query";

// getQueryClient
export const getQueryClient = (() => {
  let client = null;
  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            // staleTime: Infinity,
            // cacheTime: Infinity,
            // refetchOnReconnect: false,
            // refetchOnWindowFocus: false,
            gcTime: 1000 * 60 * 60 * 24,
          },
        },
      });
    return client;
  };
})();
