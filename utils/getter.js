// utils/getter.js

import prop from "ramda/src/prop";


/*
* *** getter  ***
* ---------------
*/

export const LABEL = "label";
export const MEMBER = "member";
export const ITEMS = "items";
export const AS_PATH = "asPath";

export const getLabel = prop(LABEL);
export const getMember = prop(MEMBER);
export const getItems = prop(ITEMS);
export const getAsPath = prop(AS_PATH);
