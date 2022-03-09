// components/coreset/Fixedbar.js

import Link from "next/link";
import { useContext } from "react";
import { linkContact, linkImprint, pageTitle } from "../../coresetConfigs";
import {
  useResponsiveShortcut,
  SM,
} from "../../libs/hooks/useResponsiveShortcut";
import { CoresetStateContext } from "../../store/CoresetContext";

import { ROUTE_HOME } from "../../utils/routes";

/*
 * *** Fixedbar ***
 * -----------------
 */

export const Fixedbar = () => {
  const { isSlidegalleryOpen } = useContext(CoresetStateContext);
  const textColor = isSlidegalleryOpen ? "text-teal" : "text-gray-300";
  const responsiveShortcut = useResponsiveShortcut();
  const isMobil = responsiveShortcut === SM;

  return (
    <div className="fixed top-0 left-0 z-10 flex items-center w-screen transition-colors duration-500 bg-teal text-teal-light">
      <Link href={ROUTE_HOME}>
        <a className={`${textColor} lg:pl-[4.5rem] px-4 py-2  hover:underline`}>
          {pageTitle}
        </a>
      </Link>

      {!isMobil && (
        <ul className="flex ml-auto ">
          <li className={`${textColor} text-sm 100 hover:underline`}>
            <Link href={linkImprint}>
              <a>Impressum und Datenschutzerklärung</a>
            </Link>
          </li>
          <li className={`${textColor} px-4 text-sm  hover:underline`}>
            <Link href="#">
              <a href={linkContact}>Kontakt</a>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};
