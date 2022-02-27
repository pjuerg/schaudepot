// utils/useSWRCoreStockPerson.js

import { useRouter } from "next/router";
import useSWR from "swr";


import is from "ramda/src/is";

import { fetcher } from "../libs/fetcher";
import { apiPerson } from "./api";
import { transformPerson } from "../values/person";
import { getCoreStockPersonIdFromPath } from "../components/corestock/GlobalNavigation";

/*
 * *** useSWRCoreStockPerson ***
 * --------------------------
 */

export const useSWRCoreStockPerson = () => {
  const id = getCoreStockPersonIdFromPath(useRouter());

  const { data } = useSWR(is(Number, id) ? apiPerson(id) : null, fetcher);
  return transformPerson(data);
};