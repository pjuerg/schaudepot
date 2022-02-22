
/** @module toString */

/**
 *
 * #### {*} → b
 *
 *
 * @function
 * @param {Object} - String
 * @return {boolean} - stringified object
 **/
export const isString = (str) =>
  typeof str === "string" || str instanceof String;