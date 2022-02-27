// pages/kernbestand/[...slides]

import { useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import isNil from "ramda/src/isNil";
import test from "ramda/src/test";
import equals from "ramda/src/equals";


import { CoreStockStateContext } from "../../store/CoreStockContext";
import {
  BigLoading,
  IntroSlide,
  AddendumSlide,
  ItemSlide,
} from "../../components/corestock";

/*
 * *** CoreStock-Subpages ***
 * - - - - - - - - - - - - - - - -
 */

const regExIntroPage = /\/kernbestand\/\d+\/intro$/;
const testIntro = test(regExIntroPage);
const regExItemPage = /\/kernbestand\/\d+\/item\/\d+$/;
const testItem = test(regExItemPage);
const regExAddendumPage = /\/kernbestand\/\d+\/addendum$/;
const testAddendum = test(regExAddendumPage);

const INTRO = "INTRO";
const ITEM = "ITEM";
const ADDENDUM = "ADDENDUM";
const ERROR = "ERROR";

const getSlideType = (s) => {
  if (testIntro(s)) {
    return INTRO;
  } else if (testItem(s)) {
    return ITEM;
  } else if (testAddendum(s)) {
    return ADDENDUM;
  } else {
    return ERROR;
  }
};

export default function CoreStockSlideContainerPage() {
  const { asPath } = useRouter();
  const { slides } = useContext(CoreStockStateContext);
  const slideType = getSlideType(asPath);

  // TODO head  for individuel slides with preloading
  return (
    <div className="h-screen">
      <Head>
        <title>TODO</title>
        <meta name="description" content="TODO" />
      </Head>

      {isNil(slides) ? (
        <BigLoading />
      ) : (
        <>
          {equals(slideType, INTRO) && <IntroSlide />}
          {equals(slideType, ITEM) && <ItemSlide />}
          {equals(slideType, ADDENDUM) && <AddendumSlide />}
        </>
      )}
    </div>
  );
}
