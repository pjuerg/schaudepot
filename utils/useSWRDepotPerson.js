// utils/useSWRPersonWithRouter.js

import { useRouter } from "next/router";
import useSWR from "swr";


import is from "ramda/src/is";

import { fetcher } from "./fetcher";
import { apiPerson } from "./api";
import { transformPerson } from "../values/person";
import { getDepotPersonIdFromPath } from "../components/depot/GlobalNavigation";

/*
 * *** useSWRDepotPerson  ***
 * --------------------------
 */

export const useSWRDepotPerson = () => {
  const id = getDepotPersonIdFromPath(useRouter());

  const { data } = useSWR(is(Number, id) ? apiPerson(id) : null, fetcher);
  return transformPerson(data);
};