import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { GlobalStyle } from "../styles/global-styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import "../styles/common.scss";

declare global {
  interface Window {
    Kakao: any;
  }
}

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
