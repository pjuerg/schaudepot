
import complement from "ramda/src/complement";
import isEmpty from "ramda/src/isEmpty";


/** @module isNotEmpty */

/**
 * @function
 * @summary * → Boolean <br/>Logic
 * @description Predicate checks if not empty, contrary to ramda isEmpty
 * @param s - String
 * @return {boolean} - true | false
 **/
export const isNotEmpty = complement(isEmpty);