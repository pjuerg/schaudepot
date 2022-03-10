// utils/utilsCoreset.js


import compose from "ramda/src/compose";

import not from "ramda/src/not";
import match from "ramda/src/match";
import test from "ramda/src/test";

import { second } from "../libs/rmd-lib/second";
import { castToInt } from "../libs/rmd-lib/castToInt";



/*
 * *** utilsCoreset  ***
 * ----------------------
 */

const regExCoresetId = /\/kernbestand\/(\d+)/;
const matchCoresetId = compose(second, match(regExCoresetId));

// isCoresetFrontpage:: s → b
export const isCoresetFrontpage = compose(not, test(regExCoresetId));

export const getCoresetPersonIdFromPath = compose(
  castToInt,
  matchCoresetId,
);
