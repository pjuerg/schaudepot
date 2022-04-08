// components/coreset/menus/ForwardBackwardArrows.js

import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import {
  CoresetDispatchContext,
  CoresetStateContext,
} from "../../../store/CoresetContext";
import { getNavigation, pushRouteWithDirection } from "./NavigationMenu";

/*
 * *** ForwardBackwardArrows  ***
 * ------------------------------
 */

const ChevronLink = ({direction, url, className, clickHandler, children}) => (
  <Link href={url}>
    <a
      onClick={(e) => {
        clickHandler(direction, url, e);
      }}
    >
      <div className={`${className} z-30 absolute opacity-0 hover:opacity-100 transition-opacity duration-300 top-0 translate-y-[50%]  w-[12%]  flex items-center  text-8xl text-gray-400`}>
        {children}
      </div>
    </a>
  </Link>
);

export const ForwardBackwardArrows = () => {
  const { eventId, slides } = useContext(CoresetStateContext);
  const dispatch = useContext(CoresetDispatchContext);
  const router = useRouter();
  const { asPath } = router;
  const { previousUrl, nextUrl } = getNavigation(asPath, slides, eventId);
  const clickHandler = pushRouteWithDirection(dispatch, router);

  return (
    <>
      {previousUrl && (
        <ChevronLink
          direction={-1}
          url={previousUrl}
          clickHandler={clickHandler}
          className="left-0 h-[50%] "
        >
          <MdChevronLeft className="drop-shadow-lg" />
        </ChevronLink>
      )}
      {nextUrl && (
        <ChevronLink
          direction={1}
          url={nextUrl}
          clickHandler={clickHandler}
          className="right-0 h-[50%] justify-end "
        >
          <MdChevronRight className="drop-shadow-lg" />
        </ChevronLink>
      )}
    </>
  );
};
