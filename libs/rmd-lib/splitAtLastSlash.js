import compose from "ramda/src/compose";
import split from "ramda/src/split";
import last from "ramda/src/last";

/** @module splitAtLastSlash */

/**
 * @function
 * @summary  String → String <br/>String
 * @description Splits the string at the last slash.
 * @param s - string
 * @return s - string
 */

export const splitAtLastSlash = compose(last, split("/"));
