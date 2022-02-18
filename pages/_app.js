// pages/_app.js
import Link from "next/link";
import { RemoteControl } from "../components/remotecontrol/RemoteControl";
import "../styles/tailwind.css";


const TopBar = () => {
  return (
    <div className="flex bg-gray-200">
      <Link href="#">
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
    <div>
      <TopBar />
      {/* <div className="px-4 mt-8">
        <RemoteControl />
      </div> */}
      <Component {...pageProps} />;
    </div>
  );
}

export default MyApp;
