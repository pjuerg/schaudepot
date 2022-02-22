import when from "ramda/src/when";
import isNil from "ramda/src/isNil";
import always from "ramda/src/always";

/** @module saveArray */

/**
 * #### [a] → [a] 
 *
 * @function
 * @param a - Array
 * @return a - Array
 */

export const saveArray = when(isNil, always([]));