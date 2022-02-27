// pages/_app.js
import "../styles/tailwind.css";

import { CoreStockProvider } from "../store/CoreStockContext";
import Layout from "../components/Layout";

/*
 * *** _app  ***
 * -------------
 */

function MyApp({ Component, pageProps }) {
  return (
    <CoreStockProvider>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </CoreStockProvider>
  );
}

export default MyApp;