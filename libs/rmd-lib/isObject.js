
/** @module isObject */

/**
 *
 * #### * → b
 *
 *
 * @function
 * @param {*} - Object
 * @return {boolean} - true | false
 **/

export const isObject = (obj) =>
  typeof obj === "object" && !Array.isArray(obj) && obj !== null;