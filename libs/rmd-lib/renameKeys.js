
/** @module renameKeys */

/**
 * @function
 * @summary TODO <br/>List
 * @description Rename the keys of an object
 * @param arr - array with keys
 * @param {*} - Object
 * @return {*} - Object
 */

export const renameKeys = (keysMap) => (obj) =>
  Object.entries(obj).reduce(
    (a, [k, v]) =>
      k in keysMap ? { ...a, [keysMap[k]]: v } : { ...a, [k]: v },
    {}
  );