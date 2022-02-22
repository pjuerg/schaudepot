import { fail } from "./fail";

/** @module failIfNotExists */

/**
 * #### * → Error | undefined
 *
 * Throws an error if not exists
 *
 * @function
 * @param * - anything
 * @return err - error
 **/

export const failIfNotExist = (para, str) => {
  if (para === undefined) {
    fail(str);
  }
};