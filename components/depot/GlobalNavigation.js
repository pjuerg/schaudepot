// components/globalNavigation/GlobalNavigation.js

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

import { apiDepot } from "../../utils/api";
import { fetcher } from "../../utils/fetcher";
import {
  DepotDispatchContext,
  DepotStateContext,
  LOAD_DEPOT_ACTION,
  SET_ANIMATION_DIRECTION,
  SET_DEPOT_PERSON_ID_ACTION,
  SET_KEY_NAVIGATION,
  SUCCESS_LOAD_DEPOT_ACTION,
} from "../../store/DepotContext";
import { getAsPath } from "../../utils/getter";
import { useSWRDepotPerson } from "../../utils/useSWRDepotPerson";

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

const regExDepotId = /\/depot\/(\d+)/;
const matchDepotId = compose(second, match(regExDepotId));

// isFrontpage:: s → b
const isFrontpage = compose(not, test(regExDepotId));

// TODO make hook useDepotPersonId, also in swrDep....
export const getDepotPersonIdFromPath = compose(
  castToInt,
  matchDepotId,
  getAsPath
);

// routeWithDispatch:: Dispatcher → router → Number → String → Event
// Navigate with route.push to trigger the right animation
const pushRouteWithDirection = curry((dispatch, router, direction, url, e) => {
  e.preventDefault();
  dispatch({ type: SET_ANIMATION_DIRECTION, payload: direction });
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
  const { personId, slides, keyNavigation } = useContext(DepotStateContext);
  const dispatch = useContext(DepotDispatchContext);
  const router = useRouter();
  const arrowLeft = useKeyPress("ArrowLeft");
  const arrowRight = useKeyPress("ArrowRight");
  const path = getAsPath(router);
  const navigation = getNavigation(path, slides);
  const currentPersonId = getDepotPersonIdFromPath(router);
  const hasDepotChanged = personId !== currentPersonId;
  const shouldLoadDepot = !slides && currentPersonId;
  const transformedPerson = useSWRDepotPerson();
  const { data: dataDepot } = useSWR(
    shouldLoadDepot ? apiDepot(currentPersonId) : null,
    fetcher
  );

  // keystroke navigation
  // tricky! Needs a state in depotContext which is debounced,
  // else arrows are to long true. the urls change and trigger more than one push ...
  // Other Option; disable eslint in nextjs, but only globally, and remove navigation in array
  useEffect(() => {
    const { nextUrl, previousUrl } = navigation;
    const dispatchResetKeyNavigation = () =>
      dispatch({ type: SET_KEY_NAVIGATION, payload: false });
    const debounceReset = debounce(dispatchResetKeyNavigation, 350);

    if (truthy(arrowLeft) && falsy(keyNavigation) && exists(previousUrl)) {
      dispatch({ type: SET_ANIMATION_DIRECTION, payload: -1 });
      dispatch({ type: SET_KEY_NAVIGATION, payload: true });

      router.push(previousUrl);
      debounceReset();
    } else if (truthy(arrowRight) && falsy(keyNavigation) && exists(nextUrl)) {
      dispatch({ type: SET_ANIMATION_DIRECTION, payload: 1 });
      dispatch({ type: SET_KEY_NAVIGATION, payload: true });
      router.push(nextUrl);
      debounceReset();
    }
  }, [arrowLeft, arrowRight, navigation, keyNavigation, router, dispatch]);

  // // url changed to new  a depot like depot/12/person
  // set person-id which is the suffix in depot/12/person and set loading flag
  useEffect(() => {
    if (hasDepotChanged) {
      dispatch({
        type: SET_DEPOT_PERSON_ID_ACTION,
        payload: currentPersonId || null,
      });
    }
    if (shouldLoadDepot) {
      dispatch({ type: LOAD_DEPOT_ACTION, payload: currentPersonId });
    }
  }, [currentPersonId, hasDepotChanged, shouldLoadDepot, dispatch]);

  // if the current depot ergo the person changed
  // the depot data is asyced fetched
  // set the new data and turn of the loading flag
  useEffect(() => {
    if (dataDepot) {
      dispatch({
        type: SUCCESS_LOAD_DEPOT_ACTION,
        payload: {
          data: dataDepot,
          path: path,
        },
      });
    }
  }, [dataDepot, path, dispatch]);

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
