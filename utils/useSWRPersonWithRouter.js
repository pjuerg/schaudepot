// utils/useSWRPersonWithRouter.js

import { useRouter } from "next/router";
import useSWR from "swr";

import compose from "ramda/src/compose";
import match from "ramda/src/match";
import prop from "ramda/src/prop";
import is from "ramda/src/is";

import { castToInt } from "rmd-lib-pp/src/castToInt";
import { second } from "rmd-lib-pp/src/second";

import { API_PERSON } from "./constants";
import { fetcher } from "./fetcher";
import { transformPerson } from "../values/person";

/*
 * *** useSWRPersonWithRouter  ***
 * --------------------------
 * splits person id from the path someting/depot-23/someting
 * and returns transformend person data
 */

const getAsPath = prop("asPath");

// TODO put in globalnavigation
export const regExDepotId = /\/depot-(\d+)\/?/;
export const matchDepotId = compose(second, match(regExDepotId));
export const getPersonIdFromRouterPath = compose(
  castToInt,
  matchDepotId,
  getAsPath
);


const regexItemId = /item\/.+-(\d+)/;
export const matchItemId = compose(second, match(regexItemId));
export const getItemIdFromRouterPath = compose(
  castToInt,
  matchItemId,
  getAsPath
);

// test matchDepotId
// console.log('depp', matchDepotId("/depot-16/person"));

export const useSWRPersonWithRouter = () => {
  const id = getPersonIdFromRouterPath(useRouter());
  const personUrl = `${API_PERSON}/${id}`;
  const { data } = useSWR(is(Number, id) ? personUrl : null, fetcher);
  return transformPerson(data);
};
