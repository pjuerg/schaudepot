//  utils/api.js

import { exists } from "../libs/rmd-lib/exists";

/*
 * *** Entry points rest api  ***
 * --------------------------
 */

export const GATEWAY = "https://private-kuenstlernachlaesse-brandenburg.de";
const API_PATH = "/linked-art.php";
export const GATEWAY_API_PATH = `${GATEWAY}${API_PATH}`;
const API_PATH_PERSON = `${GATEWAY_API_PATH}/person`;
const API_PHYSICAL_OBJECT = `${GATEWAY_API_PATH}/physical_object`;

export const apiPerson = (personId) => `${API_PATH_PERSON}/${personId}`;

export const apiPersons = (query) =>
  exists(query) ? `${API_PATH_PERSON}?${query}` : API_PATH_PERSON;

export const apiPhysicalObject = (itemId) => `${API_PHYSICAL_OBJECT}/${itemId}`;

export const apiPhysicalObjects = (query) =>
  exists(query) ? `${API_PHYSICAL_OBJECT}?${query}` : API_PHYSICAL_OBJECT;

export const apiCoreStock = (personId) =>
  `${GATEWAY_API_PATH}/physical_object?filter[coreset]=1&filter[person]=${personId}`;

export const apiSite = () => `${GATEWAY_API_PATH}/site`;
