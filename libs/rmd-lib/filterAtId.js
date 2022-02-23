import curry from "ramda/src/curry";
import filter from "ramda/src/filter";
import propEq from "ramda/src/propEq";

/** @module filterAtId */

/**
 * @function
 * @summary v → [{id:v}] -> [{id:v}] | [] <br/>List
 * @description Returns an Array. Curried
 * @param {v} id - the id to find
 * @param {array.objects} arr - array with objects
 * @return {array} - array with object with id
 * @see {module:findId
 * @example
 *   const arr = [
 *   { id: 3, name: "hans" },
 *   { id: 4, name: "peter" },
 *   { id: 5, name: "rudolf" },
 *   ];
 *   const a = filterId(4, arr) // { id: 4, name: "peter" } 
 * 
 **/
export const filterAtId = curry((id, arr) => filter(propEq("id", id), arr));
