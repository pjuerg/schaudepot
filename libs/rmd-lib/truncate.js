import when from "ramda/src/when";
import propSatisfies from "ramda/src/propSatisfies";
import pipe from "ramda/src/pipe";
import take from "ramda/src/take";
import append from "ramda/src/append";
import join from "ramda/src/join";
import gt from "ramda/src/gt";
import __ from "ramda/src/__";


/** @module truncate */

/**
 * @function
 * @summary String → Number → String <br/>String
 * @description Truncates a string.
 * @param s - String
 * @param n - Number of signs
 * @return s - String
 **/

export const truncate = (count) =>
  when(
    propSatisfies(gt(__, count), "length"),
    pipe(take(count), append("…"), join(""))
  );