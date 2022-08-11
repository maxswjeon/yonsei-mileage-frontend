import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";

function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
            // notifyOnChangeProps: "tracked",
            // cacheTime: 30000
          },
        },
      })
  );

  return (
    <>
      <Head>
        <title>연세대학교 마일리지 검색기</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider
            theme={extendTheme({
              fonts: {
                heading: `Pretendard, sans-serif`,
                body: `Pretendard, sans-serif`,
                th: `Pretendard, sans-serif`,
                td: `Pretendard, sans-serif`,
              },
            })}
          >
            <Component {...pageProps} />
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default App;
