// components/globalNavigation/GlobalNavigation.js

import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";
import { equals, findIndex, is, prop, slice, test, when } from "ramda";
import { useContext, useEffect } from "react";
import { exists } from "rmd-lib-pp/src/exists";
import { falsy } from "rmd-lib-pp/src/falsy";
import {
  DepotDispatchContext,
  DepotStateContext,
  LOAD_DEPOT_ACTION,
  SET_DEPOT_PERSON_ID_ACTION,
  SUCCESS_LOAD_DEPOT_ACTION,
} from "../../store/DepotContext";
import { API_DEPOT, API_PERSON } from "../../utils/constants";
import { fetcher } from "../../utils/fetcher";
import {
  getPersonIdFromRouterPath,
  regExDepotId,
} from "../../utils/useSWRPersonWithRouter";
import { transformPerson } from "../../values/person";

/*
 * *** GlobalNavigation  ***
 * --------------------------
 *
 */

const ToolsBar = ({ className, previousUrl, nextUrl, index, total }) => {
  return (
    <div className={`${className} flex `}>
      <div className="w-20 px-2">
        {exists(previousUrl) && (
          <Link href={`${previousUrl}`}>
            <a a className="underline">
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

      <div className="ml-auto"> {exists(index) && `${index} ⁄ ${total}`}</div>
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
const personUrl = (personId) => `${API_PERSON}/${personId}`;
// TODO only work with url functions
const depotUrl = (personId) => `${API_DEPOT}${personId}`;

export const GlobalNavigation = () => {
  const router = useRouter();
  const path = prop("asPath", router);
  const isFrontpage = !test(regExDepotId, path);
  const dispatch = useContext(DepotDispatchContext);
  const { personId, slides } = useContext(DepotStateContext);
  const currentPersonId = getPersonIdFromRouterPath(router);
  const hasDepotChanged = personId !== currentPersonId;
  const shouldLoadDepot = !slides && currentPersonId;
  const { data: dataDepot } = useSWR(
    shouldLoadDepot ? depotUrl(currentPersonId) : null,
    fetcher
  );
  const { data: dataPerson } = useSWR(
    is(Number, currentPersonId) ? personUrl(currentPersonId) : null,
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
  }, [currentPersonId, hasDepotChanged]);

  // if the current depot ergo the person changed
  // the depot data is asyced fetched
  // set the new data and turn of the loading flag
  useEffect(() => {
    if (dataDepot) {
      console.log(depotUrl(currentPersonId));
      dispatch({
        type: SUCCESS_LOAD_DEPOT_ACTION,
        payload: {
          data: dataDepot,
          path: path,
        },
      });
    }
  }, [dataDepot]);

  return (
    <>
      {falsy(isFrontpage) && (
        <div className="fixed inline-flex p-4 bg-gray-200 top-16 left-8">
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
