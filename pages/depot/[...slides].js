// pages/depot/[...slides]

import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import Head from "next/head";
import useSWR from "swr";

import { falsy } from "../../libs/rmd-lib/falsy";
import { exists } from "../../libs/rmd-lib/exists";
import { fetcher } from "../../libs/fetcher";
import { useIsMobil } from "../../libs/hooks/useResponsiveShortcut";

import { pageSectionTitle } from "../../coresetConfigs";
import { apiEvent, apiSite } from "../../utils/api";
import { useSWRCoresetPerson } from "../../utils/useSWRCoresetPerson";
import {
  checkDistractionMode,
  getCoresetEventIdFromPath,
} from "../../utils/utilsCoreset";
import {
  CoresetDispatchContext,
  CoresetStateContext,
  LOAD_CORESET_ACTION,
  SET_CORESET_EVENT_ID_ACTION,
  SUCCESS_LOAD_CORESET_ACTION,
} from "../../store/CoresetContext";
import {
  CoverSlide,
  BioSlide,
  ItemSlide,
  AddendumSlide,
} from "../../components/coreset";
import { SlideFactory } from "../../components/coreset/SlideFactory";
import { Loading } from "../../components/Loading";

/*
 * *** Coreset-Slide-Container ***
 * --------------------------------
 */

const slidesComponents = {
  cover: <CoverSlide />,
  bio: <BioSlide />,
  item: <ItemSlide />,
  addendum: <AddendumSlide />,
};

export default function SlidesContainerPage() {
  const { eventId, slides, distractionMode } = useContext(CoresetStateContext);
  const dispatch = useContext(CoresetDispatchContext);
  const router = useRouter();
  const isMobil = useIsMobil();
  const isDistractionMode = checkDistractionMode(distractionMode, isMobil);
  const { asPath } = router;
  const currentEventId = getCoresetEventIdFromPath(asPath);
  const hasCoresetChanged = eventId !== currentEventId;
  const shouldLoadCoreset = !slides && currentEventId;
  // const personData = useSWRCoresetPerson();
  const { data: dataSite } = useSWR(apiSite(), fetcher);
  const { data: dataCoreset } = useSWR(
    shouldLoadCoreset ? apiEvent(currentEventId) : null,
    fetcher
  );
  const dataPerson = useSWRCoresetPerson();

  const allDataLoaded =
    exists(slides) && exists(dataPerson) && exists(dataSite);

  // // url changed to new  a core-stock like depot/12
  // set person-id which is the suffix in depot/12 and set loading flag
  useEffect(() => {
    if (hasCoresetChanged) {
      dispatch({
        type: SET_CORESET_EVENT_ID_ACTION,
        payload: currentEventId || null,
      });
    }
    if (shouldLoadCoreset) {
      dispatch({ type: LOAD_CORESET_ACTION, payload: currentEventId });
    }
  }, [currentEventId, hasCoresetChanged, shouldLoadCoreset, dispatch]);

  // if the current core-stock ergo the person changed
  // the core-stock data is asyced fetched
  // set the new data and turn of the loading flag
  useEffect(() => {
    if (dataCoreset) {
      dispatch({
        type: SUCCESS_LOAD_CORESET_ACTION,
        payload: {
          data: dataCoreset,
          path: asPath,
        },
      });
    }
  }, [dataCoreset, asPath, dispatch]);

  const className = isDistractionMode ? "pt-16" : "pt-36";

  return (
    <>
      <Head>
        <title>
          {/* {pageSectionTitle} {(personData && personData.label) || "laden ..."} /{" "} */}
          {pageSectionTitle}
        </title>
      </Head>
      <div className={`${className} h-screen`}>
        {falsy(allDataLoaded) ? (
          <Loading className="items-center justify-center h-[80%]" />
        ) : (
          <SlideFactory
            path={asPath}
            isDistractionMode={isDistractionMode}
            components={slidesComponents}
          />
        )}
      </div>
    </>
  );
}
