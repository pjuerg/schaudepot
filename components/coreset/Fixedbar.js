// components/coreset/Fixedbar.js
import { LazyMotion, domAnimation, m } from "framer-motion";
import Link from "next/link";
import { useContext } from "react";
import { linkContact, linkImprint, pageTitle } from "../../coresetConfigs";
import {
  useResponsiveShortcut,
  SM,
} from "../../libs/hooks/useResponsiveShortcut";
import { CoresetStateContext } from "../../store/CoresetContext";

import { ROUTE_HOME } from "../../utils/routes";

import { animations } from "../../utils/animations";

/*
 * *** Fixedbar ***
 * -----------------
 */

export const Fixedbar = () => {
  const { isSlidegalleryOpen } = useContext(CoresetStateContext);
  // const textColor = isSlidegalleryOpen ? "text-teal" : "text-gray-300";
  const textColor = "text-gray-300";
  const responsiveShortcut = useResponsiveShortcut();
  const isMobil = responsiveShortcut === SM;

  let animation;
  if (isSlidegalleryOpen) animation = animations[2];
  else if (!isSlidegalleryOpen) animation = animations[0];

  return (
    <div className="fixed top-0 left-0 z-10 w-full bg-teal ">
      <LazyMotion features={domAnimation}>
        <m.div
          animate="animate"
          variants={animation.variants}
          transition={animation.transition}
          className="flex items-center"
        >
          <Link href={ROUTE_HOME}>
            <a
              className={`${textColor} lg:pl-[4.5rem] px-4 py-2  hover:underline`}
            >
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
        </m.div>
      </LazyMotion>
    </div>
  );
};
