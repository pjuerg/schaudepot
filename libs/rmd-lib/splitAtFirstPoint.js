import head from "ramda/src/head";
import split from "ramda/src/split";
import pipe from "ramda/src/pipe";

/** @module splitAtFirstPoint */

/**
 * @function
 * @summary String → String <br/>String
 * @description Splits a string at the first delimieter ".". With no point returns just the string-
 * @param {String} - some String 
 * @return {String} - splitted string
 * * @example
 * const str = splitAtFirstPoint("hello.world.cafe")
 * console.log(str) // hello
 */
export const splitAtFirstPoint = pipe(split("."), head);
