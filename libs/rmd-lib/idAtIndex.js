
import curry from "ramda/src/curry";
import compose from "ramda/src/compose";
import prop from "ramda/src/prop";
import nth from "ramda/src/nth";


/** @module idAtIndex */

/** 
 * @function
 * @summary id → arr <br/>List
 * @description TODO
 * @param s - String
 * @return {boolean} - true | false
 **/
export const idAtIndex = curry(compose(prop("id"), nth));