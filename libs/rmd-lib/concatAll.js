import converge from "ramda/src/converge";
import reduce from "ramda/src/reduce";
import concat from "ramda/src/concat";
import head from "ramda/src/head";
import tail from "ramda/src/tail";

/** @module concatAll */

/**
 * @function
 * @summary [a] → [a] → [a] <br/>list
 * @description TODO
 * @see stackoverflow.com/questions/5467129/sort-javascript-object-by-key
 * @param {array} a - array
 * @return {array} a - Object
 */

export const concatAll = converge(reduce(concat), [head, tail]);