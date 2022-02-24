// pages/[depot]/person/index.js

import { useContext } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import isNil from "ramda/src/isNil";
import test from "ramda/src/test";
import equals from "ramda/src/equals";


import { DepotStateContext } from "../../store/DepotContext";
import {
  BigLoading,
  PersonSlide,
  AddendumSlide,
  ItemSlide,
} from "../../components/depot";

/*
 * *** Depot-Subpages ***
 * - - - - - - - - - - - - - - - -
 */

const regExPersonPage = /\/depot\/\d+\/person$/;
const testPerson = test(regExPersonPage);
const regExItemPage = /\/depot\/\d+\/item\/\d+$/;
const testItem = test(regExItemPage);
const regExAddendumPage = /\/depot\/\d+\/addendum$/;
const testAddendum = test(regExAddendumPage);

const PERSON = "PERSON";
const ITEM = "ITEM";
const ADDENDUM = "ADDENDUM";
const ERROR = "ERROR";

const getSlideType = (s) => {
  if (testPerson(s)) {
    return PERSON;
  } else if (testItem(s)) {
    return ITEM;
  } else if (testAddendum(s)) {
    return ADDENDUM;
  } else {
    return ERROR;
  }
};

export default function SlideContainer() {
  const { asPath } = useRouter();
  const { slides } = useContext(DepotStateContext);
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
          {equals(slideType, PERSON) && <PersonSlide />}
          {equals(slideType, ITEM) && <ItemSlide />}
          {equals(slideType, ADDENDUM) && <AddendumSlide />}
        </>
      )}
    </div>
  );
}
