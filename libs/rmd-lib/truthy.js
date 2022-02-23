import { exists } from "./exists";

/** @module truthy */

/**
 * @function
 * @summary * → Boolean <br/>Logic
 * @description Predicate is true when not null, undefined and false.
 * @param {*} - anything
 * @return {boolean} - true | false
 **/

export const truthy = (x) => x !== false && exists(x);
