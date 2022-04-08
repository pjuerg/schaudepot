// utils/useSWRCoresetPerson.js

import { useContext } from "react";
import useSWR from "swr";

import is from "ramda/src/is";

import { fetcher } from "../libs/fetcher";
import { apiPerson, apiSite } from "./api";
import { transformPerson } from "../values/person";
import { removeEmptySectionsAndAddMissingLabels } from "../values/structureHelper";
import { CoresetStateContext } from "../store/CoresetContext";

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
  const { personId } =
    useContext(CoresetStateContext);
  
  const { data } = useSWR(
    is(Number, personId) ? apiPerson(personId) : null,
    fetcher
  );

  return transformPerson(data);
};