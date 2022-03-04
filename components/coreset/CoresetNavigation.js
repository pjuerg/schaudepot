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
import debounce from "lodash.debounce";

import { exists } from "../../libs/rmd-lib/exists";
import { falsy } from "../../libs/rmd-lib/falsy";
import { truthy } from "../../libs/rmd-lib/truthy";
import { second } from "../../libs/rmd-lib/second";
import { castToInt } from "../../libs/rmd-lib/castToInt";
import { useKeyPress } from "../../libs/hooks/useKeyPress";
import { fetcher } from "../../libs/fetcher";

import { apiCoreset } from "../../utils/api";
import { getAsPath } from "../../utils/getter";
import { useSWRCoresetPerson } from "../../utils/useSWRCoresetPerson";
import { ROUTE_CORESET } from "../../utils/routes";
import {
  CoresetDispatchContext,
  CoresetStateContext,
  LOAD_CORESET_ACTION,
  SET_CORESET_ANIMATION_DIRECTION,
  SET_CORESET_PERSON_ID_ACTION,
  SET_CORESET_KEY_NAVIGATION,
  SUCCESS_LOAD_CORESET_ACTION,
} from "../../store/CoresetContext";
import { CoresetItemsMenu } from "./CoresetItemsMenu";

/*
 * *** CoresetNavigation  ***
 * --------------------------
 */

const LinkBackForward = ({
  className = "",
  clickHandler,
  url,
  direction,
  children,
}) => (
  <div className={`${className} px-4`}>
    {exists(url) && (
      <Link href={`${url}`}>
        <a
          onClick={(e) => {
            clickHandler(direction, url, e);
          }}
          className="underline"
        >
          {children}
        </a>
      </Link>
    )}
  </div>
);

const ToolsBar = ({
  isOpenItemMenu,
  className = "",
  navigation: { startUrl, previousUrl, nextUrl, index, total },
  switchItemsMenuHandler,
  ...props
}) => {
  return (
    <div className={`${className} flex `}>
      <LinkBackForward
        className="-ml-4"
        url={startUrl}
        direction={-1}
        {...props}
      >
        Start
      </LinkBackForward>
      <LinkBackForward url={previousUrl} direction={-1} {...props}>
        zurück
      </LinkBackForward>
      <LinkBackForward url={nextUrl} direction={1} {...props}>
        vor
      </LinkBackForward>
      <button className="px-4 underline" onClick={switchItemsMenuHandler}>
        Gallerie
      </button>
      <div className="ml-auto">
        {exists(index) && `${index + 1} ⁄ ${total}`}
      </div>
      {/* <div>play</div>
      <div>gallery</div> */}
    </div>
  );
};

const Title = ({ className, label }) => {
  return (
    <div className={`${className} `}>
      Schaudepot: {exists(label) ? label : "laden ..."}
    </div>
  );
};

const regExCoresetId = /\/kernbestand\/(\d+)/;
const matchCoresetId = compose(second, match(regExCoresetId));

// isCoresetFrontpage:: s → b
const isCoresetFrontpage = compose(not, test(regExCoresetId));

// TODO make hook useCoresetPersonId, also in swrDep....
export const getCoresetPersonIdFromPath = compose(
  castToInt,
  matchCoresetId,
  getAsPath
);

// routeWithDispatch:: Dispatcher → router → Number → String → Event
// Navigate with route.push to trigger the right animation
const pushRouteWithDirection = curry((dispatch, router, direction, url, e) => {
  e.preventDefault();
  dispatch({ type: SET_CORESET_ANIMATION_DIRECTION, payload: direction });
  router.push(url);
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

export const CoresetNavigation = () => {
  const [isOpenItemMenu, openItemsMenu] = useState(false);
  const switchItemsMenuHandler = () => openItemsMenu(!isOpenItemMenu);
  const { personId, slides, keyNavigation } = useContext(CoresetStateContext);
  const dispatch = useContext(CoresetDispatchContext);
  const router = useRouter();
  const arrowLeft = useKeyPress("ArrowLeft");
  const arrowRight = useKeyPress("ArrowRight");
  const path = getAsPath(router);
  const navigation = getNavigation(path, slides, personId);
  const currentPersonId = getCoresetPersonIdFromPath(router);
  const hasCoresetChanged = personId !== currentPersonId;
  const shouldLoadCoreset = !slides && currentPersonId;
  const transformedPerson = useSWRCoresetPerson();
  const { data: dataCoreset } = useSWR(
    shouldLoadCoreset ? apiCoreset(currentPersonId) : null,
    fetcher
  );

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

  return (
    <>
      {falsy(isCoresetFrontpage(path)) && (
        <div
          className={`${falsy(
            isOpenItemMenu
          ) ? "bg-gray-200/30" : "text-white"} fixed z-50 inline-flex p-4  top-20 left-8`}
        >
          <div className="">*</div>
          <div className="ml-2 ">
            <Title
              className="px-2 py-2 border-b border-gray-800"
              {...transformedPerson}
            />
            {falsy(isOpenItemMenu) && (
              <ToolsBar
                isOpenItemMenu={isOpenItemMenu}
                className="px-2 py-2"
                navigation={navigation}
                clickHandler={pushRouteWithDirection(dispatch, router)}
                switchItemsMenuHandler={switchItemsMenuHandler}
              />
            )}
          </div>
        </div>
      )}
      {isOpenItemMenu && (
        <CoresetItemsMenu
          isOpenItemMenu={isOpenItemMenu}
          slides={slides}
          closeHandler={switchItemsMenuHandler}
        />
      )}
    </>
  );
};
