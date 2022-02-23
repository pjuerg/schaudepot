import curry from "ramda/src/curry";
import compose from "ramda/src/compose";
import split from "ramda/src/split";
import prop from "ramda/src/prop";
import nth from "ramda/src/nth";

/** @module secondSlashFromLastAtProp */

/**
 * @function
 * @summary {*} → String → String <br/>Object
 * @description Splits a string by / of an object prop.
 * @param s - Number
 * @return n - Number
 **/

const nthSlashAtProp = curry((n, prp) =>
  compose(nth(n), split("/"), prop(prp))
);
export const secondSlashFromLastAtProp = nthSlashAtProp(-2);
