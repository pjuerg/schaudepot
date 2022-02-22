
import curry from "ramda/src/curry";
import compose from "ramda/src/compose";
import prop from "ramda/src/prop";

/** @module idAtIndex */

/**
 *
 * #### id → arr
 *
 *
 * @function
 * @param s - String
 * @return {boolean} - true | false
 **/
export const idAtIndex = curry(compose(prop("id"), nth));