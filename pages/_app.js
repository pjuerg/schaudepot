// pages/_app.js
import "../styles/tailwind.css";

import { DepotProvider } from "../store/DepotContext";
import Layout from "../components/layout";

/*
 * *** _app  ***
 * -------------
 */

function MyApp({ Component, pageProps }) {
  return (
    <DepotProvider>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </DepotProvider>
  );
}

export default MyApp;
