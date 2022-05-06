// components/coreset/Fixedbar.js
import { useContext } from "react";
import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useIsMobil } from "../../libs/hooks/useResponsiveShortcut";

import {
  linkAbout,
  linkCollection,
  linkContact,
  linkDepot,
  linkHome,
  linkImprint,
  linkItem,
  linkPerson,
  pageTitle,
} from "../../coresetConfigs";
import { CoresetStateContext } from "../../store/CoresetContext";
// import { ROUTE_HOME } from "../../utils/routes";
import { animations } from "../../utils/animations";

/*
 * *** Fixedbar ***
 * -----------------
 */

export const Fixedbar = () => {
  const { isSlideCanvasOpen, distractionMode } =
    useContext(CoresetStateContext);
  const textColor = "text-white font-light";
  const contactColor = "text-yellow-400 font-light";
  const isMobil = useIsMobil();

  let animation;
  if (distractionMode || isSlideCanvasOpen) animation = animations[3];
  else if (!distractionMode || !isSlideCanvasOpen) animation = animations[4];

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        animate="animate"
        variants={animation.variants}
        transition={animation.transition}
        className="fixed top-0 left-0 z-10 w-full h-[64px] bg-teal"
      >
        <div className="lg:pl-[3.5rem]">
          <div className="flex items-center ">
            <a
              href={linkHome}
              className={`${textColor} px-2 md:px-4 py-2  font-normal hover:underline`}
            >
              {pageTitle}
            </a>

            {!isMobil && (
              <ul className="flex ml-auto ">
                <li className={`${contactColor} text-sm 100 hover:underline`}>
                  <a href={linkImprint}>Impressum und Datenschutzerklärung</a>
                </li>
                <li className={`${contactColor} px-4 text-sm  hover:underline`}>
                  <a href={linkContact}>Kontakt</a>
                </li>
              </ul>
            )}
          </div>
          <div>
            <ul className="flex">
              <li
                className={`${textColor} px-2 md:px-4  text-sm 100 hover:underline`}
              >
                <a href={linkItem}>Werke</a>
              </li>
              <li
                className={`${textColor} px-2 md:px-4  text-sm  hover:underline`}
              >
                <a href={linkPerson}>Personen</a>
              </li>
              <li
                className={`${textColor} px-2 md:px-4  text-sm  hover:underline`}
              >
                <a href={linkCollection}>
                  {isMobil
                    ? "Verzeichnisse"
                    : "Nachlass- und Werkverzeichnisse"}
                </a>
              </li>
              <li
                className={`${textColor} px-2 md:px-4  text-sm  hover:underline`}
              >
                <a href={linkDepot}>Schaudepot</a>
              </li>
              <li
                className={`${textColor} px-2 md:px-4  text-sm  hover:underline`}
              >
                <a href={linkAbout}>{isMobil ? "Über" : "Über uns"}</a>
              </li>
            </ul>
          </div>
        </div>
      </m.div>
    </LazyMotion>
  );
};
