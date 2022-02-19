// pages/_app.js
import "../styles/tailwind.css";
import Link from "next/link";

import { DepotProvider } from "../store/DepotContext";
import { ROUTE_HOME } from "../utils/constants";
import { GlobalNavigation } from "../components/globalNavigation/";
import { DevInfo } from "../components/devInfo";

/*
 * *** _app  ***
 * --------------------------
 *
 */

const TopBar = () => {
  return (
    <div className="flex bg-gray-200">
      <Link href={ROUTE_HOME}>
        <a className="px-4 font-bold">
          Private Künstlernachlässe im Land Brandenburg
        </a>
      </Link>

      <ul className="flex ml-auto">
        <li>
          <Link href="#">
            <a>Impressum und Datenschutzerklärung</a>
          </Link>
        </li>
        <li className="px-4">
          <Link href="#">
            <a>Kontakt</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <DepotProvider>
      <div>
        <TopBar />
        <GlobalNavigation />
        <DevInfo />
        <Component {...pageProps} />;
      </div>
    </DepotProvider>
  );
}

export default MyApp;
