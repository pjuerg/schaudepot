import nth from "ramda/src/nth";

/** @module second */

/**
 * @function
 * @summary [a] → a <br/>List
 * @description Returns the second entry of a type with index.
 * @param s - Number
 * @return n - Number
 **/

export const second = nth(1);