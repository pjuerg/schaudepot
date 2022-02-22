import compose from "ramda/src/compose";
import split from "ramda/src/split";
import last from "ramda/src/last";

/** @module splitAtLastSlash */

/**
* #### s → s 
*
* @function
 * @param s - string
 * @return s - string
 */

export const splitAtLastSlash = compose(last, split("/"));