// libs/fetcher.js

/*
 * *** fetcher  ***
 * -------------------------
 */

export const fetcher = (...args) => fetch(...args).then((res) => res.json());