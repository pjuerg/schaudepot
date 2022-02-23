// utils/useSWRPersonWithRouter.js

import { useRouter } from "next/router";
import useSWR from "swr";

import compose from "ramda/src/compose";
import is from "ramda/src/is";
import match from "ramda/src/match";

import { second } from "../libs/rmd-lib/second";
import { castToInt } from "../libs/rmd-lib/castToInt";

import { fetcher } from "./fetcher";
import { apiPerson } from "./api";
import { getAsPath } from "./getter";
import { transformPerson } from "../values/person";

/*
 * *** useSWRDepotPerson  ***
 * --------------------------
 */

const regExPersonId = /\/depot\/(\d+)/;
const matchPersonId = compose(castToInt, second, match(regExPersonId), getAsPath);

export const useSWRDepotPerson = () => {
  const id = matchPersonId(useRouter());

  // const id = splitAtLastSlashAtProp(AS_PATH)(useRouter());
  const { data } = useSWR(is(Number, id) ? apiPerson(id) : null, fetcher);
  return transformPerson(data);
};