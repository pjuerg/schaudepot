import { exists } from "./exists";

/** @module truthy */

/**
 * #### * → b
 *
 * Predicate is true when not null, undefined and false.
 *
 * @function
 * @param {*} - anything
 * @return {boolean} - true | false
 **/

export const truthy = (x) => x !== false && exists(x);
