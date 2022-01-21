// utils/utilsRamda.js

import nth from "ramda/src/nth";
import compose from "ramda/src/compose";
import split from "ramda/src/split";
import last from "ramda/src/last";
import prop from "ramda/src/prop";
import converge from "ramda/src/converge";
import reduce from "ramda/src/reduce";
import tail from "ramda/src/tail";
import head from "ramda/src/head";
import concat from "ramda/src/concat";
import find from "ramda/src/find";
import findIndex from "ramda/src/findIndex";
import filter from "ramda/src/filter";
import curry from "ramda/src/curry";
import propEq from "ramda/src/propEq";
import when from "ramda/src/when";
import isNil from "ramda/src/isNil";
import always from "ramda/src/always";
import complement from "ramda/src/complement";
import isEmpty  from "ramda/src/isEmpty";

/*
 *  *** utilsRamda ***
 * -----------------
 *
 */

export const isNotEmpty = complement(isEmpty);
// export const isNotNil = complement(isEmpty);
export const exists = complement(isNil);

export const saveArray = when(isNil, always([]));

export const toString = (obj) => JSON.stringify(obj);

export const findId = curry((id, arr) => find(propEq("id", id), arr));
export const filterId = curry((id, arr) => filter(propEq("id", id), arr));
export const findIndexId = curry((id, arr) => findIndex(propEq("id", id), arr));
export const idAtIndex = curry(compose(prop("id"), nth));
export const second = nth(1);
export const lastSlash = compose(last, split("/"));
export const lastSlashAtProp = (prp) => compose(lastSlash, prop(prp));

const nthSlashAtProp = curry((n, prp) =>
  compose(nth(n), split("/"), prop(prp))
);
export const secondSlashFromLastAtProp = nthSlashAtProp(-2);
// export const thirdSlashFromLastAtProp = nthSlashAtProp(-3);

export const renameKeys = (keysMap) => (obj) =>
  Object.entries(obj).reduce(
    (a, [k, v]) =>
      k in keysMap ? { ...a, [keysMap[k]]: v } : { ...a, [k]: v },
    {}
  );

export const concatAll = converge(reduce(concat), [head, tail]);

//@see stackoverflow.com/questions/5467129/sort-javascript-object-by-key
export const sortObject = (o) =>
  Object.keys(o)
    .sort()
    .reduce((r, k) => ((r[k] = o[k]), r), {});

/**
 * @see javascript allonge
 * @example var checksForSomething = maybe( function(value) { // functions true logic })
 * @example var something = maybe( doesCheckForSomething ) ( value ) )
 */
export const maybe = function maybe(fn) {
  return function () {
    let i;

    if (arguments.length === 0) {
      return;
    } else {
      for (i = 0; i < arguments.length; i++) {
        if (arguments[i] == null) return;
      }
      return fn.apply(this, arguments);
    }
  };
};

export const castToInt = (str) => (isNumeric(str) ? Number.parseInt(str) : str);

export const isBoolean = (p) => typeof p == "boolean";
export const isArray = (arr) => Array.isArray(arr);
export const isString = (str) =>
  typeof str === "string" || str instanceof String;
export const isObject = (obj) =>
  typeof obj === "object" && !Array.isArray(obj) && obj !== null;

/**
 * @see https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
 * @param {*} str
 * @returns boolean
 */
export const isNumeric = (str) => {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
};

export const fail = (str) => {
  throw new Error(str);
};

export const failIfNotExist = (para, str) => {
  if (para === undefined) {
    fail(str);
  }
};

export function toSnakeCase(str) {
  return (
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((s) => s.toLowerCase())
      .join("_")
  );
}
