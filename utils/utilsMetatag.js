// utils/utilsMetatag.js

import concat from "ramda/src/concat";
import always from "ramda/src/always";
import ifElse from "ramda/src/ifElse";
import compose from "ramda/src/compose";
import __ from "ramda/src/__";
import isNil from "ramda/src/isNil";

import { TITLE } from "./constants"
import { getLabel } from "./getter";

/*
 * *** utilsMetatag  ***
 * --------------------------
 * 
 */

export const saveMetaTagTitle = ifElse(
  isNil,
  always(""),
  concat(__, ` - ${TITLE}`)
);
export const saveMetaTagTitleFromLabel = compose(saveMetaTagTitle, getLabel);
