import { truthy } from "./truthy";
import complement from "ramda/src/complement";

/** @module falsy */

/**
 * @function
 * @summary * → Boolean <br/>Logic
 * @description Predicate is true when false, undefined, null
 * @param {*} value - anything
 * @return {boolean} boolean - true | false
 **/

export const falsy = complement(truthy)
