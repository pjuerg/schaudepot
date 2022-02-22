/** @module fail */

/**
 * #### s → Error
 *
 * Just a wrapper to throw an error
 *
 * @function
 * @param {string}  s - errormessage
 * @return {error} Error - error with message
 **/
export function fail(thing) {
  throw new Error(thing);
}
