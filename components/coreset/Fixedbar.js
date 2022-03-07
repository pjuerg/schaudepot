// components/coreset/Fixedbar.js

import Link from "next/link";
import { linkContact, linkImprint, pageTitle } from "../../coresetConfigs";

import { ROUTE_HOME } from "../../utils/routes";

/*
 * *** Fixedbar ***
 * -----------------
 */


export const Fixedbar = () => (
  <div className="fixed top-0 left-0 z-10 flex items-center w-screen bg-teal">
    <Link href={ROUTE_HOME}>
      <a className="px-4 py-2 font-semibold text-gray-100 hover:underline">
        {pageTitle}
      </a>
    </Link>

    <ul className="flex ml-auto">
      <li className="text-sm text-gray-100 hover:underline">
        <Link href={linkImprint}>
          <a>Impressum und Datenschutzerklärung</a>
        </Link>
      </li>
      <li className="px-4 text-sm text-gray-100 hover:underline">
        <Link href="#">
          <a href={linkContact}>Kontakt</a>
        </Link>
      </li>
    </ul>
  </div>
);
