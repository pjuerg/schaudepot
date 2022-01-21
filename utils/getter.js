// utils/getter.js

import prop from "ramda/src/prop";

import { ITEMS, LABEL, MEMBER } from "./constants";

/*
 * *** getter  ***
 * --------------------------
 * 
 */

export const getLabel = prop(LABEL);
export const getMember = prop(MEMBER);
export const getItems = prop(ITEMS);
