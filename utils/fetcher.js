// utils/getter.js
/*
 * *** fetcher  ***
 * --------------------------
 *
 */

import { mutate } from "swr";
import { API_PERSON, API_PHYSICAL_OBJECT } from "./constants";
import { isNumeric } from "./utilsRamda";


export const fetcher = (...args) => fetch(...args).then((res) => res.json());

// String -> {}
export function fetchAndCache(key) {
  const request = fetcher(key);
  mutate(key, request, false);
  return request;
}


// any -> {}
export const cacheItem = (id) => {
  const path = isNumeric(id) ? `${API_PHYSICAL_OBJECT}/${id}` : API_PHYSICAL_OBJECT;
  return fetchAndCache(path);
};

// any -> undefined
export const cachePerson = (id) => {
  const path = isNumeric(id) ? `${API_PERSON}/${id}` : API_PERSON;
  return fetchAndCache(path);
};
