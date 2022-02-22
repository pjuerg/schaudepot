import { truthy } from "./truthy";
import complement from "ramda/src/complement";

/** @module falsy */

/**
 * #### * → b
 *
 * Predicate is trze when false, undefined, null
 *
 * @function
 * @param {*} value - anything
 * @return {boolean} boolean - true | false
 **/

export const falsy = complement(truthy)
