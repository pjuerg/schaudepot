// utils/utilsCoreset.js


import compose from "ramda/src/compose";

import not from "ramda/src/not";
import match from "ramda/src/match";
import test from "ramda/src/test";

import { second } from "../libs/rmd-lib/second";
import { castToInt } from "../libs/rmd-lib/castToInt";
import { truthy } from "../libs/rmd-lib/truthy";
import { falsy } from "../libs/rmd-lib/falsy";


/*
 * *** utilsCoreset  ***
 * ----------------------
 */

const regExCoresetId = /\/depot\/(\d+)/;
const matchCoresetId = compose(second, match(regExCoresetId));

// isCoresetFrontpage:: s → b
export const isCoresetFrontpage = compose(not, test(regExCoresetId));

// export const isNotDistractionMode = (distractionMode, isMobil) => !exists(distractionMode) && truthy(isMobil) 
export const checkDistractionMode = (distractionMode, isMobil) =>
  truthy(distractionMode) && falsy(isMobil); 
// export const isNotDistractionMode = (distractionMode, isMobil) =>
//   truthy(distractionMode) && falsy(isMobil);
export const getCoresetEventIdFromPath = compose(
  castToInt,
  matchCoresetId,
);
