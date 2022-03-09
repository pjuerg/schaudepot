// components/coreset/CoresetNavigation.js

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";

import equals from "ramda/src/equals";
import compose from "ramda/src/compose";
import findIndex from "ramda/src/findIndex";
import not from "ramda/src/not";
import match from "ramda/src/match";
import test from "ramda/src/test";
import curry from "ramda/src/curry";
import prop from "ramda/src/prop";
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
import { second } from "../../../libs/rmd-lib/second";
import { castToInt } from "../../../libs/rmd-lib/castToInt";
import { useKeyPress } from "../../../libs/hooks/useKeyPress";
import { fetcher } from "../../../libs/fetcher";
import {
  useResponsiveShortcut,
  SM,
} from "../../../libs/hooks/useResponsiveShortcut";

// import TypoStar from "../../../assets/typoStar.svg";

import { apiCoreset } from "../../../utils/api";
import { useSWRCoresetPerson } from "../../../utils/useSWRCoresetPerson";
import { ROUTE_CORESET } from "../../../utils/routes";
import {
  CoresetDispatchContext,
  CoresetStateContext,
  LOAD_CORESET_ACTION,
  SET_CORESET_ANIMATION_DIRECTION,
  SET_CORESET_PERSON_ID_ACTION,
  SET_CORESET_KEY_NAVIGATION,
  SUCCESS_LOAD_CORESET_ACTION,
  IS_SLIDEGALLERY_OPEN_ACTION,
} from "../../../store/CoresetContext";
import { SlidesGallery } from "./SlidesGallery";

/*
 * *** Navigation  ***
 * --------------------
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

const ToolsBar = ({
  isMobil,
  isOpenItemMenu,
  navigation: { startUrl, previousUrl, nextUrl, index, total },
  switchSlidesGalleryHandler,
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
        onClick={switchSlidesGalleryHandler}
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

const Title = ({
  isMobil,
  label,
  isOpenItemMenu,
  switchSlidesGalleryHandler,
}) => {
  const classNameOpen =
    "hover:bg-yellow-400 hover:text-gray-800 rounded-sm text-gray-100 cursor-pointer ";
  const classNamneClosed = "text-gray-600 mr-8";
  return (
    <div className="w-full">
      <h2
        className={`${
          isOpenItemMenu ? classNameOpen : classNamneClosed
        }  inline-block text-sm md:text-lg px-2 py-1 leading-tight border-gray-600 `}
        onClick={() => {
          isOpenItemMenu && switchSlidesGalleryHandler();
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

const regExCoresetId = /\/kernbestand\/(\d+)/;
const matchCoresetId = compose(second, match(regExCoresetId));

// isCoresetFrontpage:: s → b
export const isCoresetFrontpage = compose(not, test(regExCoresetId));

// TODO make hook useCoresetPersonId, also in swrDep....
export const getCoresetPersonIdFromPath = compose(
  castToInt,
  matchCoresetId,
  prop("asPath")
);

// routeWithDispatch:: Dispatcher → router → Number → String → Event
// Navigate with route.push to trigger the right animation
const pushRouteWithDirection = curry((dispatch, router, direction, url, e) => {
  e.preventDefault();
  dispatch({ type: SET_CORESET_ANIMATION_DIRECTION, payload: direction });
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

export const Navigation = () => {
  const [isOpenItemMenu, openItemsMenu] = useState(false);
  const { personId, slides, keyNavigation } = useContext(CoresetStateContext);
  const dispatch = useContext(CoresetDispatchContext);
  const router = useRouter();
  const responsiveShortcut = useResponsiveShortcut();
  const isMobil = responsiveShortcut === SM;
  const arrowLeft = useKeyPress("ArrowLeft");
  const arrowRight = useKeyPress("ArrowRight");
  const { asPath: path } = router;
  const navigation = getNavigation(path, slides, personId);
  const currentPersonId = getCoresetPersonIdFromPath(router);
  const hasCoresetChanged = personId !== currentPersonId;
  const shouldLoadCoreset = !slides && currentPersonId;
  const transformedPerson = useSWRCoresetPerson();
  const { data: dataCoreset } = useSWR(
    shouldLoadCoreset ? apiCoreset(currentPersonId) : null,
    fetcher
  );

  const switchSlidesGalleryHandler = () => {
    openItemsMenu(!isOpenItemMenu);
    dispatch({ type: IS_SLIDEGALLERY_OPEN_ACTION, payload: !isOpenItemMenu });
  };

  // keystroke navigation
  // tricky! Needs a state in depotContext which is debounced,
  // else arrows are to long true. the urls change and trigger more than one push ...
  // Other Option; disable eslint in nextjs, but only globally, and remove navigation in array
  useEffect(() => {
    const { nextUrl, previousUrl } = navigation;
    const dispatchResetKeyNavigation = () =>
      dispatch({ type: SET_CORESET_KEY_NAVIGATION, payload: false });
    const debounceReset = debounce(dispatchResetKeyNavigation, 350);

    if (truthy(arrowLeft) && falsy(keyNavigation) && exists(previousUrl)) {
      dispatch({ type: SET_CORESET_ANIMATION_DIRECTION, payload: -1 });
      dispatch({ type: SET_CORESET_KEY_NAVIGATION, payload: true });

      router.push(previousUrl);
      debounceReset();
    } else if (truthy(arrowRight) && falsy(keyNavigation) && exists(nextUrl)) {
      dispatch({ type: SET_CORESET_ANIMATION_DIRECTION, payload: 1 });
      dispatch({ type: SET_CORESET_KEY_NAVIGATION, payload: true });
      router.push(nextUrl);
      debounceReset();
    }
  }, [arrowLeft, arrowRight, navigation, keyNavigation, router, dispatch]);

  // // url changed to new  a core-stock like kernbestand/12/person
  // set person-id which is the suffix in kernbestand/12/person and set loading flag
  useEffect(() => {
    if (hasCoresetChanged) {
      dispatch({
        type: SET_CORESET_PERSON_ID_ACTION,
        payload: currentPersonId || null,
      });
    }
    if (shouldLoadCoreset) {
      dispatch({ type: LOAD_CORESET_ACTION, payload: currentPersonId });
    }
  }, [currentPersonId, hasCoresetChanged, shouldLoadCoreset, dispatch]);

  // if the current core-stock ergo the person changed
  // the core-stock data is asyced fetched
  // set the new data and turn of the loading flag
  useEffect(() => {
    if (dataCoreset) {
      dispatch({
        type: SUCCESS_LOAD_CORESET_ACTION,
        payload: {
          data: dataCoreset,
          path: path,
        },
      });
    }
  }, [dataCoreset, path, dispatch]);

  const className = isOpenItemMenu ? "bg-teal w-full" : "bg-gray-100/90";
  return (
    <>
      <div
        className={`${className} fixed z-50 flex pr-4 pt-6 pb-4 lg:inline-flex lg:flex-col top-10 py-1 lg:top-10 pl-2 lg:pl-16 `}
      >
        <Title
          isOpenItemMenu={isOpenItemMenu}
          switchSlidesGalleryHandler={switchSlidesGalleryHandler}
          isMobil={isMobil}
          {...transformedPerson}
        />
        {falsy(isOpenItemMenu) && (
          <ToolsBar
            isMobil={isMobil}
            isOpenItemMenu={isOpenItemMenu}
            navigation={navigation}
            clickHandler={pushRouteWithDirection(dispatch, router)}
            switchSlidesGalleryHandler={switchSlidesGalleryHandler}
          />
        )}
      </div>
      {truthy(isOpenItemMenu) && (
        <SlidesGallery
          isMobil={isMobil}
          isOpenItemMenu={isOpenItemMenu}
          slides={slides}
          closeHandler={switchSlidesGalleryHandler}
        />
      )}
    </>
  );
};
