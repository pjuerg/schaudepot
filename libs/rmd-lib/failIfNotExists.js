import { fail } from "./fail";

/** @module failIfNotExists */

/**
 * @function
 * @summary * → String → Error | undefined <br/>Logic
 * @description  Throws an error if not exists
 * @param * - anything
 * @return err - error
 **/

export const failIfNotExist = (para, str) => {
  if (para === undefined) {
    fail(str);
  }
};