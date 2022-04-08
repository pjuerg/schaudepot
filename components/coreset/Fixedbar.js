// components/coreset/Fixedbar.js
import { useContext } from "react";
import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useIsMobil } from "../../libs/hooks/useResponsiveShortcut";

import { linkContact, linkImprint, pageTitle } from "../../coresetConfigs";
import { CoresetStateContext } from "../../store/CoresetContext";
import { ROUTE_HOME } from "../../utils/routes";
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
            <Link href={ROUTE_HOME}>
              <a className={`${textColor} px-2 md:px-4 py-2  font-normal hover:underline`}>
                {pageTitle}
              </a>
            </Link>

            {!isMobil && (
              <ul className="flex ml-auto ">
                <li className={`${contactColor} text-sm 100 hover:underline`}>
                  <Link href={linkImprint}>
                    <a>Impressum und Datenschutzerklärung</a>
                  </Link>
                </li>
                <li className={`${contactColor} px-4 text-sm  hover:underline`}>
                  <Link href="https://private-kuenstlernachlaesse-brandenburg.de/index.php?pn=contact">
                    <a href={linkContact}>Kontakt</a>
                  </Link>
                </li>
              </ul>
            )}
          </div>
          <div>
            <ul className="flex">
              <li
                className={`${textColor} px-2 md:px-4  text-sm 100 hover:underline`}
              >
                <Link href="https://private-kuenstlernachlaesse-brandenburg.de/item/">
                  <a>Werke</a>
                </Link>
              </li>
              <li
                className={`${textColor} px-2 md:px-4  text-sm  hover:underline`}
              >
                <Link href="https://private-kuenstlernachlaesse-brandenburg.de/person/">
                  <a href={linkContact}>Personen</a>
                </Link>
              </li>
              <li
                className={`${textColor} px-2 md:px-4  text-sm  hover:underline`}
              >
                <Link href="https://private-kuenstlernachlaesse-brandenburg.de/collection/">
                  <a href={linkContact}>
                    {isMobil ? "Verzeichnisse" : "Nachlass- und Werkverzeichnisse"}
                  </a>
                </Link>
              </li>
              <li
                className={`${textColor} px-2 md:px-4  text-sm  hover:underline`}
              >
                <Link href="https://private-kuenstlernachlaesse-brandenburg.de/depot/">
                  <a href={linkContact}>Schaudepot</a>
                </Link>
              </li>
              <li
                className={`${textColor} px-2 md:px-4  text-sm  hover:underline`}
              >
                <Link href="https://private-kuenstlernachlaesse-brandenburg.de/index.php?pn=about">
                  <a href={linkContact}>{isMobil ? "Über" : "Über uns"}</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </m.div>
    </LazyMotion>
  );
};
