import { isNumeric } from "./isNumeric";

/** @module castToInt */

/**
 * #### s → n
 *
 * Cast a string-number to int or if not possible the just the value
 * 
 * @function
 * @param {string} s - some string like "1"
 * @return {integer} n - integer
 * @example
 * 
 * const a = castToInt("2") // 2
 * const b = castToInt("wer") // "wer"
 * const c = castToInt(["2"]) // ["2"]
 **/

export const castToInt = (str) => (isNumeric(str) ? Number.parseInt(str) : str);
