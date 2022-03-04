// pages/_app.js
import "../styles/tailwind.css";

import { CoresetProvider } from "../store/CoresetContext";
import Layout from "../components/Layout";

/*
 * *** _app  ***
 * -------------
 */

function MyApp({ Component, pageProps }) {
  return (
    <CoresetProvider>
      <Layout>
         <Component {...pageProps} />;
      </Layout>
    </CoresetProvider>
  );
}

export default MyApp;