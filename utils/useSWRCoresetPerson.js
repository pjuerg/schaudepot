// utils/useSWRCoresetPerson.js

import { useRouter } from "next/router";
import useSWR from "swr";


import is from "ramda/src/is";

import { fetcher } from "../libs/fetcher";
import { apiPerson } from "./api";
import { transformPerson } from "../values/person";
import { getCoresetPersonIdFromPath } from "../components/coreset/CoresetNavigation";

/*
 * *** useSWRCoresetPerson ***
 * --------------------------
 */

export const useSWRCoresetPerson = () => {
  const id = getCoresetPersonIdFromPath(useRouter());

  const { data } = useSWR(is(Number, id) ? apiPerson(id) : null, fetcher);
  return transformPerson(data);
};