
/** @module isString */

/**
 * @function
 * @summary * → Boolean <br/>Logic
 * @description Predicate checks type string
 * @param {Object} - String
 * @return {boolean} - stringified object
 **/
export const isString = (str) =>
  typeof str === "string" || str instanceof String;