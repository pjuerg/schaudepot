// utils/useSWRCoresetPerson.js

import { useContext } from "react";
import useSWR from "swr";

import is from "ramda/src/is";
import compose from "ramda/src/compose";
import path from "ramda/src/path";

import { fetcher } from "../libs/fetcher";
import { castToInt } from "../libs/rmd-lib/castToInt";
import { maybe } from "../libs/rmd-lib/maybe";
import { ATTRIBUTED_BY } from "../values/constants";
import { removeEmptySectionsAndAddMissingLabels } from "../values/structureHelper";
import { apiPerson, apiSite } from "./api";
import { transformPerson } from "../values/person";
import { CoresetStateContext } from "../store/CoresetContext";

/*
 * *** useSWRCoresetPerson ***
 * --------------------------
 */

export const getPersonId = maybe(compose(
  castToInt,
  path([ATTRIBUTED_BY, 0, "id"])
));

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
  const { event } = useContext(CoresetStateContext);

  const personId = getPersonId(event)

  const { data } = useSWR(
    is(Number, personId) ? apiPerson(personId) : null,
    fetcher
  );

  return transformPerson(data);
};
