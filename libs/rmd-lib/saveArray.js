import when from "ramda/src/when";
import isNil from "ramda/src/isNil";
import always from "ramda/src/always";

/** @module saveArray */

/**
 * @function
 * @summary [a] → [a] <br/>Logic
 * @description returns always an array
 * @param a - Array
 * @return a - Array
 */

export const saveArray = when(isNil, always([]));