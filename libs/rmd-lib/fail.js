/** @module fail */

/**
 * @function
 * @summary String → Error <br/>Logic
 * @description Just a wrapper to throw an error.
 * @param {string} s - errormessage
 * @return {error} Error - error with message
 **/
export function fail(thing) {
  throw new Error(thing);
}
