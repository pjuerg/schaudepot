
import curry from "ramda/src/curry";
import findIndex from "ramda/src/findIndex";
import propEq from "ramda/src/propEq";

/** @module findIndexAtId */

/**
 * #### id → arr
 *
 *
 * @function
 * @param {*} id - the id to find
 * @param [{id:v}, ...]  - the id to find
 * @return {*} object - the object with the arr
 **/
export const findIndexAtId = curry((id, arr) => findIndex(propEq("id", id), arr));
