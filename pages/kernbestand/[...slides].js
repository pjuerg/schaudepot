// pages/kernbestand/[...slides]

import { useContext } from "react";

import { useRouter } from "next/router";
import Head from "next/head";
import useSWR from "swr";


import { falsy } from "../../libs/rmd-lib/falsy";
import { exists } from "../../libs/rmd-lib/exists";

import { apiSite } from "../../utils/api";
import { fetcher } from "../../libs/fetcher";
import { CoresetStateContext } from "../../store/CoresetContext";
import { useSWRCoresetPerson } from "../../utils/useSWRCoresetPerson";
import { CoresetComponentFactory } from "../../components/coreset/CoresetComponentFactory";
import {
  BigLoading,
  CoverSlide,
  IntroSlide,
  ItemSlide,
  AddendumSlide,
} from "../../components/coreset";

/*
 * *** Coreset-Slide-Container ***
 * - - - - - - - - - - - - - - - -
 */

const slidesComponents = {
  cover: <CoverSlide />,
  intro: <IntroSlide />,
  item: <ItemSlide />,
  addendum: <AddendumSlide />,
};

export default function SlidesContainerPage() {
  const { asPath } = useRouter();
  const { slides } = useContext(CoresetStateContext);
  const personData = useSWRCoresetPerson();
  const { data: dataSite } = useSWR(apiSite(), fetcher);
  // TODO big inital load 
  const allDataLoaded =
    exists(slides) && exists(personData) && exists(dataSite);

  return (
    <div className="h-screen bg-gray-200 px-4 pb-4 pt-24 border-white border-b-[1rem] border-x-[1rem]">
      <Head>
        <title>TODO head for individuel slides with preloading</title>
        <meta name="description" content="TODO" />
      </Head>

      {falsy(allDataLoaded) ? (
        <BigLoading />
      ) : (
        <CoresetComponentFactory
          path={asPath}
          components={slidesComponents}
        />
      )}
    </div>
  );
}
