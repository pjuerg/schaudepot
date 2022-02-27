// components/corestock/GlobalNavigation.js

import { useContext, useEffect } from "react";
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

import { apiCoreStock } from "../../utils/api";
import { fetcher } from "../../libs/fetcher";
import {
  CoreStockDispatchContext,
  CoreStockStateContext,
  LOAD_CORESTOCK_ACTION,
  SET_CORESTOCK_ANIMATION_DIRECTION,
  SET_CORESTOCK_PERSON_ID_ACTION,
  SET_CORESTOCK_KEY_NAVIGATION,
  SUCCESS_LOAD_CORESTOCK_ACTION,
} from "../../store/CoreStockContext";
import { getAsPath } from "../../utils/getter";
import { useSWRCoreStockPerson } from "../../utils/useSWRCoreStockPerson";

/*
 * *** GlobalNavigation  ***
 * --------------------------
 */

const LinkBackForward = ({ clickHandler, url, direction, children }) => (
  <div className="w-20 px-2">
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
  className = "",
  navigation: { previousUrl, nextUrl, index, total },
  ...props
}) => {
  return (
    <div className={`${className} flex `}>
      <LinkBackForward url={previousUrl} direction={-1} {...props}>
        zurück
      </LinkBackForward>
      <LinkBackForward url={nextUrl} direction={1} {...props}>
        vor
      </LinkBackForward>
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
      Schaudepot:
      {exists(label) ? label : "laden ..."}
    </div>
  );
};

const regExCoreStockId = /\/kernbestand\/(\d+)/;
const matchCoreStockId = compose(second, match(regExCoreStockId));

// isFrontpage:: s → b
const isFrontpage = compose(not, test(regExCoreStockId));

// TODO make hook useCoreStockPersonId, also in swrDep....
export const getCoreStockPersonIdFromPath = compose(
  castToInt,
  matchCoreStockId,
  getAsPath
);

// routeWithDispatch:: Dispatcher → router → Number → String → Event
// Navigate with route.push to trigger the right animation
const pushRouteWithDirection = curry((dispatch, router, direction, url, e) => {
  e.preventDefault();
  dispatch({ type: SET_CORESTOCK_ANIMATION_DIRECTION, payload: direction });
  router.push(url);
});

const getNavigation = (path, slides) => {
  let previousUrl;
  let nextUrl;
  let index;
  let total;
  if (slides) {
    index = findIndex(equals(path))(slides);
    total = slides.length;
    previousUrl = index === 0 ? null : slides[index - 1];
    nextUrl = index === slides.length - 1 ? null : slides[index + 1];
  }
  return {
    nextUrl,
    previousUrl,
    index,
    total,
  };
};

export const GlobalNavigation = () => {
  const { personId, slides, keyNavigation } = useContext(CoreStockStateContext);
  const dispatch = useContext(CoreStockDispatchContext);
  const router = useRouter();
  const arrowLeft = useKeyPress("ArrowLeft");
  const arrowRight = useKeyPress("ArrowRight");
  const path = getAsPath(router);
  const navigation = getNavigation(path, slides);
  const currentPersonId = getCoreStockPersonIdFromPath(router);
  const hasCoreStockChanged = personId !== currentPersonId;
  const shouldLoadCoreStock = !slides && currentPersonId;
  const transformedPerson = useSWRCoreStockPerson();
  const { data: dataCoreStock } = useSWR(
    shouldLoadCoreStock ? apiCoreStock(currentPersonId) : null,
    fetcher
  );

  // keystroke navigation
  // tricky! Needs a state in depotContext which is debounced,
  // else arrows are to long true. the urls change and trigger more than one push ...
  // Other Option; disable eslint in nextjs, but only globally, and remove navigation in array
  useEffect(() => {
    const { nextUrl, previousUrl } = navigation;
    const dispatchResetKeyNavigation = () =>
      dispatch({ type: SET_CORESTOCK_KEY_NAVIGATION, payload: false });
    const debounceReset = debounce(dispatchResetKeyNavigation, 350);

    if (truthy(arrowLeft) && falsy(keyNavigation) && exists(previousUrl)) {
      dispatch({ type: SET_CORESTOCK_ANIMATION_DIRECTION, payload: -1 });
      dispatch({ type: SET_CORESTOCK_KEY_NAVIGATION, payload: true });

      router.push(previousUrl);
      debounceReset();
    } else if (truthy(arrowRight) && falsy(keyNavigation) && exists(nextUrl)) {
      dispatch({ type: SET_CORESTOCK_ANIMATION_DIRECTION, payload: 1 });
      dispatch({ type: SET_CORESTOCK_KEY_NAVIGATION, payload: true });
      router.push(nextUrl);
      debounceReset();
    }
  }, [arrowLeft, arrowRight, navigation, keyNavigation, router, dispatch]);

  // // url changed to new  a core-stock like kernbestand/12/person
  // set person-id which is the suffix in kernbestand/12/person and set loading flag
  useEffect(() => {
    if (hasCoreStockChanged) {
      dispatch({
        type: SET_CORESTOCK_PERSON_ID_ACTION,
        payload: currentPersonId || null,
      });
    }
    if (shouldLoadCoreStock) {
      dispatch({ type: LOAD_CORESTOCK_ACTION, payload: currentPersonId });
    }
  }, [currentPersonId, hasCoreStockChanged, shouldLoadCoreStock, dispatch]);

  // if the current core-stock ergo the person changed
  // the core-stock data is asyced fetched
  // set the new data and turn of the loading flag
  useEffect(() => {
    if (dataCoreStock) {
      dispatch({
        type: SUCCESS_LOAD_CORESTOCK_ACTION,
        payload: {
          data: dataCoreStock,
          path: path,
        },
      });
    }
  }, [dataCoreStock, path, dispatch]);

  return (
    <>
      {falsy(isFrontpage(path)) && (
        <div className="fixed z-50 inline-flex p-4 bg-gray-200 top-16 left-8">
          <div className="">*</div>
          <div className="ml-2 ">
            <Title
              className="px-2 py-2 border-b border-gray-800"
              {...transformedPerson}
            />

            <ToolsBar
              className="px-2 py-2"
              navigation={navigation}
              clickHandler={pushRouteWithDirection(dispatch, router)}
            />
          </div>
        </div>
      )}
    </>
  );
};
