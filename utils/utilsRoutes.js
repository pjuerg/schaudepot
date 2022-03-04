// utils/utilsRoutes

import flip from "ramda/src/flip";
import compose from "ramda/src/compose";
import join from "ramda/src/join";
import prop from "ramda/src/prop";
import allPass from "ramda/src/allPass";
import cond from "ramda/src/cond";
import append from "ramda/src/append";
import has from "ramda/src/has";
import propEq from "ramda/src/propEq";
import pipe from "ramda/src/pipe";
import last from "ramda/src/last";
import split from "ramda/src/split";
import concat from "ramda/src/concat";
import always from "ramda/src/always";
import ifElse from "ramda/src/ifElse";
import isEmpty from "ramda/src/isEmpty";
import lte from "ramda/src/lte";
import __ from "ramda/src/__";
import length from "ramda/src/length";

import { isNotEmpty } from "../libs/rmd-lib/isNotEmpty";

import { ROUTE_ITEM, ROUTE_PERSON } from "./routes";


/*
 *  *** utilsRoutes  ***
 * ---------------------
 *
 */

export const regExFilter = /filter\[(.+)\]/;

// {} -> [{}]
const toArrStrFilter = (filter) =>
  Object.entries(filter).map(([key, value]) => `filter[${key}]=${value}`);

  // [][] -> fn -> str
const joinWithQuerySeparator = compose(join("&"), concat);

// str -> fn -> str
const addPathPhysicalObject = ifElse(
  isNotEmpty,
  concat(`${ROUTE_ITEM}?`),
  always(ROUTE_ITEM)
);

// [[][]] -> fn -> str
const sumRouteParts = compose(addPathPhysicalObject, joinWithQuerySeparator);


// getRouteForSearch :: (String, [String]) -> String
export const getRouteForSearch = (term, filter) => {
  const arrQ = isEmpty(term) ? [] : [`q=${term}`];
  const arrFilter = toArrStrFilter(filter);
  const str = sumRouteParts(arrQ, arrFilter);
  // console.log("- VALUES - ", 't', term, 'f', filter);
  // console.log("- ARR - ", arrQ, arrFilter);
  // console.log("- ROUTE FOR SEARCH - ", str);
  return str;
};


// str -> str || ''
// item?filter[type]=32 -> ?filter[type]=32
export const getQueryString = pipe(
  split("?"),
  ifElse(compose(lte(__, 1), length), always(""), compose(concat("?"), last))
);

// create links from value object data

const flippedAppend = flip(append);
const routePerson = compose(
  join(""),
  flippedAppend([ROUTE_PERSON, "/"]),
  prop("id")
);
const routeFilterByString = ({ filter }) => {
  const [key, value] = filter.split("#");
  return `${ROUTE_ITEM}?filter[${key}]=${value}`;
};
const routeFilterBySet = ({ id }) =>
  `${ROUTE_ITEM}?filter[set]=${id}`;
const isDataWithPerson = allPass([has("id"), propEq("type", "Person")]);
const isDataWithFilter = allPass([has("filter")]);
const isDataWithSet = allPass([(has("id"), propEq("type", "Set"))]);

export const condLink = cond([
  [isDataWithPerson, routePerson],
  [isDataWithFilter, routeFilterByString],
  [isDataWithSet, routeFilterBySet],
]);