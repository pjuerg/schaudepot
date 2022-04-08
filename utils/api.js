//  utils/api.js

import { apiPath, gateway } from "../coresetConfigs";
import { exists } from "../libs/rmd-lib/exists";

/*
 * *** Entry points rest api  ***
 * --------------------------
 */

const GATEWAY_API_PATH = `${gateway}${apiPath}`;
const API_PATH_PERSON = `${GATEWAY_API_PATH}/person`;
const API_PATH_EVENT = `${GATEWAY_API_PATH}/event`;
const API_PATH_PHYSICAL_OBJECT = `${GATEWAY_API_PATH}/physical_object`;

export const apiPerson = (personId) => `${API_PATH_PERSON}/${personId}`;

export const apiPersons = (query) =>
  exists(query) ? `${API_PATH_PERSON}?${query}` : API_PATH_PERSON;

export const apiPhysicalObject = (itemId) =>
  `${API_PATH_PHYSICAL_OBJECT}/${itemId}`;

export const apiPhysicalObjects = (query) =>
  exists(query)
    ? `${API_PATH_PHYSICAL_OBJECT}?${query}`
    : API_PATH_PHYSICAL_OBJECT;

export const apiEvent = (eventId) => `${API_PATH_EVENT}/${eventId}`;

export const apiEvents = () => API_PATH_EVENT;

export const apiCoreset = (personId) =>
  `${GATEWAY_API_PATH}/physical_object?filter[coreset]=1&filter[person]=${personId}`;

export const apiSite = () => `${GATEWAY_API_PATH}/site`;
