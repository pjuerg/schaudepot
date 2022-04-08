//  utils/api.js;

import { gateway } from "../coresetConfigs";

/*
 * *** Routes  ***
 * ---------------
 */

export const ROUTE_HOME = "/";
export const ROUTE_BIO = "/bio";
export const ROUTE_ADDENDUM = "/addendum";
export const ROUTE_PERSON = "/person";
export const ROUTE_CORESET = "/kernbestand";
export const ROUTE_PHYSICAL_OBJECT = "/physical_object";
export const ROUTE_SITE = "/site";
export const ROUTE_ITEM = "/item";

export const absoluteLinkItem = (id) => `${gateway}${ROUTE_ITEM}/${id}`;
export const absoluteLinkPerson = (id) => `${gateway}${ROUTE_PERSON}/${id}`;