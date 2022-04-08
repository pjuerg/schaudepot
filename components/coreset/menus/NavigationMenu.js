// components/coreset/menus/NavigationMenu.js

import { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import equals from "ramda/src/equals";
import findIndex from "ramda/src/findIndex";
import curry from "ramda/src/curry";
import identity from "ramda/src/identity";
import thunkify from "ramda/src/thunkify";
import debounce from "lodash.debounce";

import {
  MdCloseFullscreen,
  MdOpenInFull,
  MdChevronRight,
  MdViewModule,
  MdChevronLeft,
  MdFirstPage,
} from "react-icons/md";

import { exists } from "../../../libs/rmd-lib/exists";
import { falsy } from "../../../libs/rmd-lib/falsy";
import { truthy } from "../../../libs/rmd-lib/truthy";
import { useKeyPress } from "../../../libs/hooks/useKeyPress";
import { useIsMobil } from "../../../libs/hooks/useResponsiveShortcut";

import { useSWRCoresetPerson } from "../../../utils/useSWRCoresetPerson";
import { ROUTE_CORESET } from "../../../utils/routes";
import { checkDistractionMode } from "../../../utils/utilsCoreset";
import {
  CoresetDispatchContext,
  CoresetStateContext,
  SET_CORESET_ANIMATION_DIRECTION_ACTION,
  SET_CORESET_KEY_NAVIGATION_ACTION,
  IS_SLIDES_CANVAS_OPEN_ACTION,
  SWITCH_DISTRACTION_MODE_ACTION,
} from "../../../store/CoresetContext";
import { SlidesCanvas } from "./SlidesCanvas";

/*
 * *** NavigationMenu ***
 * ----------------------
 */

export const LinkWidthDirection = ({
  className = "",
  clickHandler,
  url,
  direction,
  children,
}) => {
  className = `${className} px-1 md:px-2 flex items-center`;
  return (
    <>
      {!exists(url) ? (
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

const classNameIcon = "group-hover:text-yellow-400 text-gray-600";
const classNameIconBasic = `${classNameIcon} text-4xl`;
const classNameIconSmaller = `${classNameIcon} text-2xl`;

const Label = ({ className, children }) => (
  <div
    className={`${className} text-sm group-hover:text-yellow-400 font-light text-gray-600`}
  >
    {children}
  </div>
);

export const switchDistractionModeDispatcher = thunkify(
  (dispatch, distractionMode) => {
    return dispatch({
      type: SWITCH_DISTRACTION_MODE_ACTION,
      payload: !distractionMode,
    });
  }
);

const NavigationBar = ({
  isMobil,
  isCanvasOpen,
  isDistractionMode,
  navigation: { startUrl, previousUrl, nextUrl, index, total },
  switchSlideGalleryHandler,
  switchDistractionModeHandler,
  ...props
}) => {
  const className = isDistractionMode ? "" : "md:border-t";
  return (
    <div
      className={`${className} flex items-center border-gray-500 text-gray-600`}
    >
      <LinkWidthDirection
        className={`-ml-2`}
        url={startUrl}
        direction={-1}
        {...props}
      >
        <MdFirstPage className={classNameIconBasic} />
      </LinkWidthDirection>

      <LinkWidthDirection url={previousUrl} direction={-1} {...props}>
        <MdChevronLeft className={classNameIconBasic} />
      </LinkWidthDirection>

      <Label>Blättern</Label>

      <LinkWidthDirection url={nextUrl} direction={1} {...props}>
        <MdChevronRight className={classNameIconBasic} />
      </LinkWidthDirection>

      {/* index counter */}
      <div className="ml-2  py-0.5  text-sm text-gray-gray-600 font-light">
        {exists(index) && (
          <>
            <span>{index + 1}</span>
            <span className="px-0.5">|</span>
            <span>{total}</span>
          </>
        )}
      </div>

      {/* open slideGallery */}
      <button
        className="flex items-center px-4 group outline-0"
        onClick={switchSlideGalleryHandler}
      >
        <MdViewModule className={classNameIconBasic} />
        {!isMobil && <Label className="pl-0">Gallerie</Label>}
      </button>
      {/* mode distraction */}
      {!isMobil && (
        <button
          className="flex items-center pl-4 pr-2 group outline-0"
          onClick={switchDistractionModeHandler}
        >
          {isDistractionMode && (
            <MdCloseFullscreen className={classNameIconSmaller} />
          )}
          {!isDistractionMode && (
            <MdOpenInFull className={classNameIconSmaller} />
          )}

          <Label className="pl-1 whitespace-nowrap">
            {isDistractionMode ? "Mehr Informationen" : "Weniger Informationen"}
          </Label>
        </button>
      )}
    </div>
  );
};

const Title = ({
  label,
  isMobil,
  isCanvasOpen,
  isDistractionMode,
  switchSlideGalleryHandler,
}) => {
  const classNamenClosed = "text-gray-600 mr-8";
  const classNameOpen =
    "hover:bg-yellow-400 hover:text-gray-800 rounded-sm text-gray-100 cursor-pointer ";
  const classNameDistractionMode = isDistractionMode
    ? "md:text-base md:font-light "
    : " md:text-2xl";
  const className = `${classNameDistractionMode} ${
    isCanvasOpen ? classNameOpen : classNamenClosed
  }`;

  return (
    <div className="w-full">
      <h2
        className={`${className} inline-block text-sm font-normal px-2 py-1 leading-tight border-gray-500  `}
        onClick={switchSlideGalleryHandler}
      >
        <span className="pr-1">Kernbestand:</span>
        {isMobil && <br />}
        {exists(label) ? label : "laden ..."}
        {/* <TypoStar className="absolute top-5 -left-3" /> */}
      </h2>
    </div>
  );
};

// routeWithDispatch:: Dispatcher → router → Number → String → Event
// Navigate with route.push to trigger the right animation
export const pushRouteWithDirection = curry(
  (dispatch, router, direction, url, e) => {
    e.preventDefault();
    dispatch({
      type: SET_CORESET_ANIMATION_DIRECTION_ACTION,
      payload: direction,
    });
    url && router.push(url);
  }
);

export const getNavigation = (path, slides, eventId) => {
  // break: slides not loaded
  if (!slides) return {};
  const index = findIndex(equals(path))(slides);
  return {
    index,
    total: slides.length,
    startUrl: index === 0 ? null : `${ROUTE_CORESET}/${eventId}`,
    previousUrl: index === 0 ? null : slides[index - 1],
    nextUrl: index === slides.length - 1 ? null : slides[index + 1],
  };
};
const W_KEY_TIME = 0;
export const NavigationMenu = () => {
  const {
    eventId,
    slides,
    keyNavigation,
    distractionMode,
    isSlideCanvasOpen: isCanvasOpen,
  } = useContext(CoresetStateContext);
  const dispatch = useContext(CoresetDispatchContext);
  const router = useRouter();
  const isMobil = useIsMobil();
  const isDistractionMode = checkDistractionMode(distractionMode, isMobil);
  const arrowKeyLeft = useKeyPress("ArrowLeft");
  const arrowKeyRight = useKeyPress("ArrowRight");
  const wKey = useKeyPress("w");
  const { asPath: path } = router;
  const navigation = getNavigation(path, slides, eventId);
  const transformedPerson = useSWRCoresetPerson();

  const switchSlideGalleryHandler = () => {
    dispatch({ type: IS_SLIDES_CANVAS_OPEN_ACTION, payload: !isCanvasOpen });
  };

  const switchDistractionModeHandler = !isMobil
    ? switchDistractionModeDispatcher(dispatch, distractionMode)
    : identity;

  // keystroke navigation
  // tricky! Needs a state in depotContext which is debounced,
  // else arrows are to long true. the urls change and trigger more than one push ...
  // Other Option; disable eslint in nextjs, but only globally, and remove navigation in array
  useEffect(() => {
    const { nextUrl, previousUrl } = navigation;
    const dispatchResetKeyNavigation = () =>
      dispatch({ type: SET_CORESET_KEY_NAVIGATION_ACTION, payload: false });
    const debounceReset = debounce(dispatchResetKeyNavigation, 350);

    if (truthy(arrowKeyLeft) && falsy(keyNavigation) && exists(previousUrl)) {
      dispatch({ type: SET_CORESET_ANIMATION_DIRECTION_ACTION, payload: -1 });
      dispatch({ type: SET_CORESET_KEY_NAVIGATION_ACTION, payload: true });

      router.push(previousUrl);
      debounceReset();
    } else if (truthy(arrowKeyRight) && falsy(keyNavigation) && exists(nextUrl)) {
      dispatch({ type: SET_CORESET_ANIMATION_DIRECTION_ACTION, payload: 1 });
      dispatch({ type: SET_CORESET_KEY_NAVIGATION_ACTION, payload: true });
      router.push(nextUrl);
      debounceReset();
    } else if (
      truthy(wKey) &&
      falsy(keyNavigation) &&
      Math.abs(W_KEY_TIME - Date.now()) > 250
    ) {
      W_KEY_TIME = Date.now();
      dispatch({
        type: SWITCH_DISTRACTION_MODE_ACTION,
        payload: !distractionMode,
      });
      debounceReset();
    }
  }, [
    arrowKeyLeft,
    arrowKeyRight,
    wKey,
    navigation,
    keyNavigation,
    router,
    dispatch,
  ]);

  // transparent ... but hmmm
  // ? "bg-gradient-to-b from-teal via-teal to-transparent"

  const classNameBackground = isCanvasOpen ? "" : " bg-gray-100/90 md:w-auto";
  const classNameDistraction = truthy(distractionMode)
    ? "md:flex-row top-0"
    : "md:flex-col top-16 md:top-20";
  const className = `${classNameBackground} ${classNameDistraction}`;

  return (
    <>
      <div
        className={`${className} fixed z-50 flex pr-4 pb-4 lg:inline-flex  pl-0 md:pl-2 lg:pl-16 w-full `}
      >
        <Title
          isCanvasOpen={isCanvasOpen}
          isDistractionMode={isDistractionMode}
          switchSlideGalleryHandler={switchSlideGalleryHandler}
          isMobil={isMobil}
          {...transformedPerson}
        />
        {falsy(isCanvasOpen) && (
          <NavigationBar
            isMobil={isMobil}
            isCanvasOpen={isCanvasOpen}
            isDistractionMode={isDistractionMode}
            navigation={navigation}
            clickHandler={pushRouteWithDirection(dispatch, router)}
            switchSlideGalleryHandler={switchSlideGalleryHandler}
            switchDistractionModeHandler={switchDistractionModeHandler}
          />
        )}
      </div>
      {isCanvasOpen && (
        <SlidesCanvas
          isMobil={isMobil}
          isCanvasOpen={isCanvasOpen}
          isDistractionMode={isDistractionMode}
          slides={slides}
          closeHandler={switchSlideGalleryHandler}
        />
      )}
    </>
  );
};
