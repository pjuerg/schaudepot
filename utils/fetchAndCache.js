// utils/fetchAndCache.js

import { mutate } from "swr";

import {fetcher} from "../libs/fetcher"
import { apiPerson, apiPhysicalObject } from "./api";

/*
 * *** fetcherAndCache  ***
 * --------------------------
 */


// String -> {}
function fetchAndCache(key) {
  const request = fetcher(key);
  mutate(key, request, false);
  return request;
}

// any -> {}
export const cacheItem = (id) => {
  // TODO bug id is sometimes an event
  return null
  const path = apiPhysicalObject(id);
  return fetchAndCache(path);
};

// any -> undefined
export const cachePerson = (id) => {
  // TODO bug id is sometimes an event
  return null;
  const path = apiPerson(id);
  console.log(id, "cachePerson", path);
  return fetchAndCache(path);
};
