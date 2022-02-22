
/** @module sortObject */

/**
 * #### o → o
 *
 * @function
 * @see stackoverflow.com/questions/5467129/sort-javascript-object-by-key
 * @param {*} - Object
 * @return {*} - Object
 */


export const sortObject = (o) =>
  Object.keys(o)
    .sort()
    .reduce((r, k) => ((r[k] = o[k]), r), {});