import when from "ramda/src/when";
import propSatisfies from "ramda/src/propSatisfies";
import pipe from "ramda/src/pipe";
import take from "ramda/src/take";
import append from "ramda/src/append";
import join from "ramda/src/join";
import gt from "ramda/src/gt";

/** @module truncate */

/**
 * #### s → n → s
 *
 *
 * @function
 * @param s - String
 * @param n - Number of signs
 * @return s - String
 **/

export const truncate = (count) =>
  when(
    propSatisfies(gt(__, count), "length"),
    pipe(take(count), append("…"), join(""))
  );