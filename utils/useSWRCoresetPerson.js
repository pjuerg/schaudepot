// utils/useSWRCoresetPerson.js

import { useRouter } from "next/router";
import useSWR from "swr";


import is from "ramda/src/is";

import { fetcher } from "../libs/fetcher";
import { apiPerson, apiSite } from "./api";
import { transformPerson } from "../values/person";
import { getCoresetPersonIdFromPath } from "../components/coreset/menu/Navigation";
import { removeEmptySectionsAndAddMissingLabels } from "../values/structureHelper";

/*
 * *** useSWRCoresetPerson ***
 * --------------------------
 */


export const useSWRCoresetPersonAndStructure = (fieldStructure) => {
  const personData = useSWRCoresetPerson();
  const { data: dataSite } = useSWR(apiSite(), fetcher);

  const cleandFieldStructure = removeEmptySectionsAndAddMissingLabels(
    "person",
    dataSite,
    fieldStructure,
    personData
  );
  return { personData, cleandFieldStructure };
};



export const useSWRCoresetPerson = () => {
  const id = getCoresetPersonIdFromPath(useRouter());
  const { data } = useSWR(is(Number, id) ? apiPerson(id) : null, fetcher);

  return transformPerson(data);
};