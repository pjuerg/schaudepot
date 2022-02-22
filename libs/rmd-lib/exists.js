/** @module exists */

/**
 * #### * → b
 *
 * Predicate is false when null and undefined.
 *
 * @function
 * @param {*} a  - anything
 * @return {boolean} b - true | false
 **/

export const exists = (x) => x != null;
