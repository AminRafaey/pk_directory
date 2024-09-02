import "@fontsource/saira/500.css";
import "styles/globals.css";
import { browserEvents } from "utils";
import Head from "next/head";
import { Provider } from 'react-redux';
import NextNprogress from "nextjs-progressbar";
import { COLOR_BUTTON_RED } from "styles/colors";
import { store } from "src/redux/store";

process.browser && browserEvents();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover, user-scalable=no"
        />
        <meta
          name="google-site-verification"
          content="fbRP9Y1JgSrpgP8Y27SOvg2nwAdJT_kDD4e76fJjN8w"
        />
        <link rel="manifest" href="/manifest.json"></link>
      </Head>
      <Provider store={store}>
        <NextNprogress color={COLOR_BUTTON_RED} />
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
