import compose from "ramda/src/compose";
import prop from "ramda/src/prop";
import {splitAtLastSlash} from "./splitAtLastSlash";

/** @module splitAtLastSlashAtProp */

/**
 * @function
 * @summary {*} → String → String <br/>Object
 * @description Splits a string of property of an object.
 * @param s - key
 * @param {*} - object
 * @return s - string
 */

export const splitAtLastSlashAtProp = (prp) => compose(splitAtLastSlash, prop(prp));
