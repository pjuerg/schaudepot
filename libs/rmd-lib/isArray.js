
/** @module isArray */

/**
 * @function
 * @summary a → Boolean <br/>Logic
 * @description Predicate checks type array
 * @param a - Array
 * @return {boolean} - true | false
 **/

export const isArray = (str) =>
  typeof str === "string" || str instanceof String;