// pages/kernbestand/[...slides]

import { useContext } from "react";

import Head from "next/head";
import useSWR from "swr";

import { falsy } from "../../libs/rmd-lib/falsy";
import { exists } from "../../libs/rmd-lib/exists";
import { fetcher } from "../../libs/fetcher";

import { pageSectionTitle } from "../../depotConfigs";
import { apiSite } from "../../utils/api";
import { CoresetStateContext } from "../../store/CoresetContext";
import { useSWRCoresetPerson } from "../../utils/useSWRCoresetPerson";
import {
  CoverSlide,
  IntroSlide,
  ItemSlide,
  AddendumSlide,
} from "../../components/coreset";
import { SlideFactory } from "../../components/coreset/SlideFactory";
import { useRouter } from "next/router";
import { Loading } from "../../components/Loading";

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
  const allDataLoaded =
    exists(slides) && exists(personData) && exists(dataSite);

  return (
    <>
      <Head>
        <title>
          {pageSectionTitle} {(personData && personData.label) || "laden ..."} /{" "}
          {pageSectionTitle}
        </title>
      </Head>
      <div className="h-screen pt-24">
        {falsy(allDataLoaded) ? (
          <Loading className="items-center justify-center" />
        ) : (
          <SlideFactory path={asPath} components={slidesComponents} />
        )}
      </div>
    </>
  );
}
