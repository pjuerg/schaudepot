import equals from "ramda/src/equals";
import always from "ramda/src/always";
import curry from "ramda/src/curry";
import ifElse from "ramda/src/ifElse";

/** @module commaIfNotLast */

// isNotLast :: [a] -> n -> a -> b
const isNotLastItem = (arr, index) => !equals(arr.length - 1, index);

// delimiterIfNotLast :: s -> [a] -> n -> s
const delimiterIfNotLast = curry((sign, arr, index) => {
  return ifElse(isNotLastItem, always(sign), always(""))(arr, index);
});

/**
 *
 * #### [a] → n → s
 *
 * adds a comma to string-array items, but not to the last item
 *
 * @function
 * @param {String[]} a - array with strings
 * @param {Number} n - index of the current array item
 * @return {String} s - array with "comma", if its not last index
 * @example
 * {
 *   arr.map((str, index) => (
 *     <li key={index}>
 *       {str} {appendCommaByIndex(tags, index)}
 *     </li>
 *   ));
 * }
 */
export const commaIfNotLast = delimiterIfNotLast(" ,");
