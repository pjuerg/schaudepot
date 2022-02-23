// components/depot/Topbar.js

import Link from "next/link";

import { ROUTE_HOME } from "../../utils/routes";

/*
 * *** Topbar Depot  ***
 * --------------------------
 */

export const TopBar = () => {
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