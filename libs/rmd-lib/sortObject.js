
/** @module sortObject */

/**
 * @function
 * @summary {*} → {*} <br/>Object
 * @description Object sorting
 * @param {*} - Object
 * @return {*} - Object
 * @see stackoverflow.com/questions/5467129/sort-javascript-object-by-key
 */


export const sortObject = (o) =>
  Object.keys(o)
    .sort()
    .reduce((r, k) => ((r[k] = o[k]), r), {});