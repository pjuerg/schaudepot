
import curry from "ramda/src/curry";
import find from "ramda/src/find";
import propEq from "ramda/src/propEq";

/** @module findAtId */

/**
 * #### v → [{id:v}] → {id:v} | undefined
 *
 * Returns an object or undefined,
 * curried
 * 
 * @function
 * @param s - String
 * @param {array.objects} arr - array with objects
 * @return {array} - array with object with id
 * @see module:src/filterId
 **/
export const findAtId = curry((id, arr) => find(propEq("id", id), arr));