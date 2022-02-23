
/** @module maybe */

/**
 * @function
 * @summary TODO <br/>Logic
 * @description Executes fn if is not undefined
 * @param {*} - anything
 * @return {boolean} - true | false
 * @see javascript allonge
 * @example var checksForSomething = maybe( function(value) { // functions true logic })
 * @example var something = maybe( doesCheckForSomething ) ( value ) )
 */

export const maybe = (fn) =>
  function (...args) {
    if (args.length === 0) {
      return;
    } else {
      for (let arg of args) {
        if (arg == null) {
          return;
        }
      }
    }
    return fn.apply(this, args);
  };
