import compose from "ramda/src/compose";
import prop from "ramda/src/prop";
import {lastSlash} from "./splitAtLastSlash";

/** @module splitAtLastSlashAtProp */

/**
 * #### s → s 
 *
 * @function
 * @param s - key
 * @param {*} - object
 * @return s - string
 */

export const splitAtLastSlashAtProp = (prp) => compose(lastSlash, prop(prp));
