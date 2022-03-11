// pages/kernbestand/[...slides]

import { useContext, useEffect } from "react";
import { useRouter } from "next/router";

import Head from "next/head";
import useSWR from "swr";

import { falsy } from "../../libs/rmd-lib/falsy";
import { exists } from "../../libs/rmd-lib/exists";
import { fetcher } from "../../libs/fetcher";
import { truthy } from "../../libs/rmd-lib/truthy";

import { pageSectionTitle } from "../../coresetConfigs";
import { apiCoreset, apiSite } from "../../utils/api";
import { useSWRCoresetPerson } from "../../utils/useSWRCoresetPerson";
import { getCoresetPersonIdFromPath } from "../../utils/utilsCoreset";
import {
  CoresetDispatchContext,
  CoresetStateContext,
  LOAD_CORESET_ACTION,
  SET_CORESET_PERSON_ID_ACTION,
  SUCCESS_LOAD_CORESET_ACTION,
} from "../../store/CoresetContext";
import {
  CoverSlide,
  IntroSlide,
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
  intro: <IntroSlide />,
  item: <ItemSlide />,
  addendum: <AddendumSlide />,
};


export default function SlidesContainerPage() {
  const { personId, slides, distractionMode } = useContext(CoresetStateContext);
  const dispatch = useContext(CoresetDispatchContext);
  const router = useRouter();
  const { asPath } = router;
  const currentPersonId = getCoresetPersonIdFromPath(asPath);
  const hasCoresetChanged = personId !== currentPersonId;
  const shouldLoadCoreset = !slides && currentPersonId;
  const personData = useSWRCoresetPerson();
  const { data: dataSite } = useSWR(apiSite(), fetcher);
  const { data: dataCoreset } = useSWR(
    shouldLoadCoreset ? apiCoreset(currentPersonId) : null,
    fetcher
  );

  const allDataLoaded =
    exists(slides) && exists(personData) && exists(dataSite);

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
          path: asPath,
        },
      });
    }
  }, [dataCoreset, asPath, dispatch]);

  const className = truthy(distractionMode) ? "pt-24" : "pt-36";

  return (
    <>
      <Head>
        <title>
          {pageSectionTitle} {(personData && personData.label) || "laden ..."} /{" "}
          {pageSectionTitle}
        </title>
      </Head>
      <div className={`${className} h-screen`}>
        {falsy(allDataLoaded) ? (
          <Loading className="items-center justify-center h-[80%]" />
        ) : (
            <SlideFactory path={asPath} components={slidesComponents} />
        )}
      </div>
    </>
  );
}
