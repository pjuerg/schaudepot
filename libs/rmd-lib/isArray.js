
/** @module isArray */

/**
 *
 * #### a → b
 *
 *
 * @function
 * @param a - Array
 * @return {boolean} - true | false
 **/

export const isArray = (str) =>
  typeof str === "string" || str instanceof String;