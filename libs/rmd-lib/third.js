import nth from "ramda/src/nth";

/** @module third */

/**
 * @function
 * @summary [a] → a <br/>List
 * @description Returns the third entry of a type with index.
 * @param s - Number
 * @return n - Number
 **/

export const third = nth(2);