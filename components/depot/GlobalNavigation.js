// components/globalNavigation/GlobalNavigation.js

import { useContext, useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";
import equals from "ramda/src/equals";
import compose from "ramda/src/compose";
import findIndex from "ramda/src/findIndex";
import is from "ramda/src/is";
import not from "ramda/src/not";
import match from "ramda/src/match";
import test from "ramda/src/test";
import prop from "ramda/src/prop";

import { exists } from "../../libs/rmd-lib/exists";
import { falsy } from "../../libs/rmd-lib/falsy";
import { truthy } from "../../libs/rmd-lib/truthy";
import { second } from "../../libs/rmd-lib/second";
import { castToInt } from "../../libs/rmd-lib/castToInt";
import { useKeyPress } from "../../libs/hooks/useKeyPress";

import { apiDepot, apiPerson } from "../../utils/api";
import { fetcher } from "../../utils/fetcher";
import {
  DepotDispatchContext,
  DepotStateContext,
  LOAD_DEPOT_ACTION,
  SET_ANIMATION_DIRECTION,
  SET_DEPOT_PERSON_ID_ACTION,
  SUCCESS_LOAD_DEPOT_ACTION,
} from "../../store/DepotContext";
import { transformPerson } from "../../values/person";

/*
 * *** GlobalNavigation  ***
 * --------------------------
 */

const ToolsBar = ({ className="", previousUrl, nextUrl, index, total }) => {
  return (
    <div className={`${className} flex `}>
      <div className="w-20 px-2">
        {exists(previousUrl) && (
          <Link href={`${previousUrl}`}>
            <a className="underline">
              zurück
            </a>
          </Link>
        )}
      </div>
      <div className="w-20 px-2">
        {exists(nextUrl) && (
          <Link href={`${nextUrl}`}>
            <a className="underline">vor</a>
          </Link>
        )}
      </div>

      <div className="ml-auto"> {exists(index) && `${index+1} ⁄ ${total}`}</div>
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

const getAsPath = prop("asPath");
const regExDepotId = /\/depot-(\d+)\/?/;
const matchDepotId = compose(second, match(regExDepotId));

// isFrontpage:: s → b
const isFrontpage = compose(not, test(regExDepotId));
// isFrontpage:: {asPath} → n
export const getPersonIdFromRouterPath = compose(
  castToInt,
  matchDepotId,
  getAsPath
);

export const GlobalNavigation = () => {
  const dispatch = useContext(DepotDispatchContext);
  const { personId, slides } = useContext(DepotStateContext);
  const router = useRouter();
  const arrowLeft = useKeyPress("ArrowLeft");
  const arrowRight = useKeyPress("ArrowRight");

  const path = getAsPath(router);

  const currentPersonId = getPersonIdFromRouterPath(router);
  const hasDepotChanged = personId !== currentPersonId;
  const shouldLoadDepot = !slides && currentPersonId;
  const { data: dataDepot } = useSWR(
    shouldLoadDepot ? apiDepot(currentPersonId) : null,
    fetcher
  );
  const { data: dataPerson } = useSWR(
    is(Number, currentPersonId) ? apiPerson(currentPersonId) : null,
    fetcher
  );
  const transformedPerson = transformPerson(dataPerson);

  // previous, next and index
  let previousUrl;
  let nextUrl;
  let index;
  if (slides) {
    index = findIndex(equals(path))(slides);
    previousUrl = index === 0 ? null : slides[index - 1];
    nextUrl = index === slides.length - 1 ? null : slides[index + 1];
  }

  // console.log("isFrontpage", isFrontpage);
  // console.log("previousUrl", previousUrl);
  // console.log("nextUrl", nextUrl);
  // console.log("index", index);

  // keystroke navigation
  useEffect(() => {
    if (truthy(arrowLeft) && exists(previousUrl)) {
      dispatch({ type: SET_ANIMATION_DIRECTION, payload: -1 });
      router.push(previousUrl);
    } else if (truthy(arrowRight) && exists(nextUrl)) {
      dispatch({ type: SET_ANIMATION_DIRECTION, payload: 1 });
      router.push(nextUrl);
    }
  }, [arrowLeft, arrowRight, dispatch]);

  // url changed to new  a depot like depot-12/foo
  // set person-id which is the suffix in depot-12 and set loading flag
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
              previousUrl={previousUrl}
              nextUrl={nextUrl}
              index={index}
              total={slides && slides.length}
            />
          </div>
        </div>
      )}
    </>
  );
};
