
/** @module isNumeric */

/**
 * @function
 * 
 * @summary * → Boolean <br/>Logic
 * @description Check if string is a valid number?
 * @param {*} - anything
 * @return {boolean} - true | false
 * @see https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
 **/

export const isNumeric = (str) => {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
};