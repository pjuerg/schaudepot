
import complement from "ramda/src/complement";
import isEmpty from "ramda/src/isEmpty";


/** @module isNotEmpty */

/**
 *
 * #### s → b
 *
 *
 * @function
 * @param s - String
 * @return {boolean} - true | false
 **/
export const isNotEmpty = complement(isEmpty);