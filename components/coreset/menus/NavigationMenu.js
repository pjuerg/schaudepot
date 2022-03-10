// components/coreset/menus/NavigationMenu.js

import { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import equals from "ramda/src/equals";
import findIndex from "ramda/src/findIndex";
import curry from "ramda/src/curry";
import debounce from "lodash.debounce";

import {
  MdChevronRight,
  MdViewModule,
  MdChevronLeft,
  MdFirstPage,
} from "react-icons/md";

import { exists } from "../../../libs/rmd-lib/exists";
import { falsy } from "../../../libs/rmd-lib/falsy";
import { truthy } from "../../../libs/rmd-lib/truthy";

import { useKeyPress } from "../../../libs/hooks/useKeyPress";
import {
  useResponsiveShortcut,
  SM,
} from "../../../libs/hooks/useResponsiveShortcut";
import { useSWRCoresetPerson } from "../../../utils/useSWRCoresetPerson";
import { ROUTE_CORESET } from "../../../utils/routes";
import {
  CoresetDispatchContext,
  CoresetStateContext,
  SET_CORESET_ANIMATION_DIRECTION_ACTION,
  SET_CORESET_KEY_NAVIGATION_ACTION,
  IS_SLIDES_CANVAS_OPEN_ACTION,
} from "../../../store/CoresetContext";
import { SlidesCanvas } from "./SlidesCanvas";

/*
 * *** NavigationMenu ***
 * ------------
 */

const LinkWidthDirection = ({
  className = "",
  clickHandler,
  url,
  direction,
  children,
  disabled,
}) => {
  className = `${className} px-1 md:px-2 flex items-center`;
  return (
    <>
      {truthy(disabled) ? (
        <div className={`${className} opacity-50`}>{children}</div>
      ) : (
        <Link href={`${url}`}>
          <a
            className={`${className} group`}
            onClick={(e) => {
              clickHandler(direction, url, e);
            }}
          >
            {children}
          </a>
        </Link>
      )}
    </>
  );
};

const classNameIcon = "group-hover:text-yellow-400 text-gray-600 text-4xl";

const Label = ({ className, children }) => (
  <div
    className={`${className} text-sm group-hover:text-yellow-400 font-light text-gray-600`}
  >
    {children}
  </div>
);

const NavigationBar = ({
  isMobil,
  isCanvasOpen,
  navigation: { startUrl, previousUrl, nextUrl, index, total },
  switchSlideGalleryHandler,
  ...props
}) => {
  return (
    <div
      className={`flex items-center lg:border-t border-gray-600 text-gray-600`}
    >
      <LinkWidthDirection
        className={`-ml-2`}
        url={startUrl}
        direction={-1}
        disabled={index === 0 ? true : false}
        {...props}
      >
        <MdFirstPage className={classNameIcon} />
        {!isMobil && <Label className="md:-ml-1">Start</Label>}
      </LinkWidthDirection>

      <LinkWidthDirection
        url={previousUrl}
        direction={-1}
        {...props}
        disabled={index === 0 ? true : false}
      >
        <MdChevronLeft className={classNameIcon} />
      </LinkWidthDirection>

      <Label>Blättern</Label>

      <LinkWidthDirection
        url={nextUrl}
        direction={1}
        {...props}
        disabled={index === total - 1 ? true : false}
      >
        <MdChevronRight className={classNameIcon} />
      </LinkWidthDirection>

      {/* open slideGallery */}
      <button
        className="flex items-center px-4 group"
        onClick={switchSlideGalleryHandler}
      >
        <MdViewModule className={classNameIcon} />
        {!isMobil && <Label className="pl-0">Gallerie</Label>}
      </button>

      {/* index counter */}
      <div className="-ml-3 md:px-2 py-0.5  text-sm text-gray-gray-600 font-light">
        {exists(index) && (
          <>
            <span>{index + 1}</span>
            {!isMobil ? (
              <span className="px-1">von</span>
            ) : (
              <span className="px-0.5">|</span>
            )}
            <span>{total}</span>
          </>
        )}
      </div>
    </div>
  );
};

const Title = ({ isMobil, label, isCanvasOpen, switchSlideGalleryHandler }) => {
  const classNameOpen =
    "hover:bg-yellow-400 hover:text-gray-800 rounded-sm text-gray-100 cursor-pointer ";
  const classNamneClosed = "text-gray-600 mr-8";
  return (
    <div className="w-full">
      <h2
        className={`${
          isCanvasOpen ? classNameOpen : classNamneClosed
        }  inline-block text-sm md:text-lg px-2 py-1 leading-tight border-gray-600 `}
        onClick={() => {
          isCanvasOpen && switchSlideGalleryHandler();
        }}
      >
        <span className="pr-1">Schaudepot:</span>
        {isMobil && <br />}
        {exists(label) ? label : "laden ..."}
        {/* <TypoStar className="absolute top-5 -left-3" /> */}
      </h2>
    </div>
  );
};

// routeWithDispatch:: Dispatcher → router → Number → String → Event
// Navigate with route.push to trigger the right animation
const pushRouteWithDirection = curry((dispatch, router, direction, url, e) => {
  e.preventDefault();
  dispatch({
    type: SET_CORESET_ANIMATION_DIRECTION_ACTION,
    payload: direction,
  });
  url && router.push(url);
});

const getNavigation = (path, slides, personId) => {
  // break: slides not loaded
  if (!slides) return {};

  const index = findIndex(equals(path))(slides);

  return {
    index,
    total: slides.length,
    startUrl: `${ROUTE_CORESET}/${personId}`,
    previousUrl: index === 0 ? null : slides[index - 1],
    nextUrl: index === slides.length - 1 ? null : slides[index + 1],
  };
};

export const NavigationMenu = () => {
  const {
    personId,
    slides,
    keyNavigation,
    isSlideCanvasOpen: isCanvasOpen,
  } = useContext(CoresetStateContext);
  const dispatch = useContext(CoresetDispatchContext);
  const router = useRouter();
  const responsiveShortcut = useResponsiveShortcut();
  const isMobil = responsiveShortcut === SM;
  const arrowLeft = useKeyPress("ArrowLeft");
  const arrowRight = useKeyPress("ArrowRight");
  const { asPath: path } = router;
  const navigation = getNavigation(path, slides, personId);
  const transformedPerson = useSWRCoresetPerson();

  const switchSlideGalleryHandler = () => {
    dispatch({ type: IS_SLIDES_CANVAS_OPEN_ACTION, payload: !isCanvasOpen });
  };

  // keystroke navigation
  // tricky! Needs a state in depotContext which is debounced,
  // else arrows are to long true. the urls change and trigger more than one push ...
  // Other Option; disable eslint in nextjs, but only globally, and remove navigation in array

  useEffect(() => {
    const { nextUrl, previousUrl } = navigation;
    const dispatchResetKeyNavigation = () =>
      dispatch({ type: SET_CORESET_KEY_NAVIGATION_ACTION, payload: false });
    const debounceReset = debounce(dispatchResetKeyNavigation, 350);

    if (truthy(arrowLeft) && falsy(keyNavigation) && exists(previousUrl)) {
      dispatch({ type: SET_CORESET_ANIMATION_DIRECTION_ACTION, payload: -1 });
      dispatch({ type: SET_CORESET_KEY_NAVIGATION_ACTION, payload: true });

      router.push(previousUrl);
      debounceReset();
    } else if (truthy(arrowRight) && falsy(keyNavigation) && exists(nextUrl)) {
      dispatch({ type: SET_CORESET_ANIMATION_DIRECTION_ACTION, payload: 1 });
      dispatch({ type: SET_CORESET_KEY_NAVIGATION_ACTION, payload: true });
      router.push(nextUrl);
      debounceReset();
    }
  }, [arrowLeft, arrowRight, navigation, keyNavigation, router, dispatch]);

  const className = isCanvasOpen ? "bg-teal w-full" : "bg-gray-100/90";

  return (
    <>
      <div
        className={`${className} fixed z-50 flex pr-4 pt-6 pb-4 lg:inline-flex lg:flex-col top-10 py-1 lg:top-10 pl-2 lg:pl-16 `}
      >
        <Title
          isCanvasOpen={isCanvasOpen}
          switchSlideGalleryHandler={switchSlideGalleryHandler}
          isMobil={isMobil}
          {...transformedPerson}
        />
        {falsy(isCanvasOpen) && (
          <NavigationBar
            isMobil={isMobil}
            isCanvasOpen={isCanvasOpen}
            navigation={navigation}
            clickHandler={pushRouteWithDirection(dispatch, router)}
            switchSlideGalleryHandler={switchSlideGalleryHandler}
          />
        )}
      </div>
      {truthy(isCanvasOpen) && (
        <SlidesCanvas
          isMobil={isMobil}
          isCanvasOpen={isCanvasOpen}
          slides={slides}
          closeHandler={switchSlideGalleryHandler}
        />
      )}
    </>
  );
};
