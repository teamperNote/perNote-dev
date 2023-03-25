import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { GlobalStyle } from "../styles/global-styles";
import "../styles/common.scss";
import { RecoilRoot } from "recoil";

declare global {
  interface Window {
    Kakao: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp;
