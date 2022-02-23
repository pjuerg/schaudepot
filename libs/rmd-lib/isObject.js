
/** @module isObject */

/**
 * @function
 * @summary * → Boolean <br/>Logic
 * @description Predicate checks type object
 * @param {*} - Object
 * @return {boolean} - true | false
 **/

export const isObject = (obj) =>
  typeof obj === "object" && !Array.isArray(obj) && obj !== null;