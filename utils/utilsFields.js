//utils/utilsFields.js

import { isString } from "../libs/rmd-lib/isString";
import { isArray } from "../libs/rmd-lib/isArray";
import { isBoolean } from "../libs/rmd-lib/isBoolean";

/*
 * *** fieldsUtils  ***
 * -------------------
 */


// special field types

export const FORMAT_INTERNAL_LINK = "text/internal-link";

export const FORMAT_TEXT_HTML = "text/html";

export const FORMAT_TEXT_URI_LIST = "text/uri-list";


// predicates to match structure row fields to presentation fields

export const rowKeyEquals = (key, rowStructure) => rowStructure.key === key;

export const isStringAtDataAtKey = (dataAtKey) => isString(dataAtKey);

export const isTruthyAtDataAtKey = (dataAtKey) =>
  isBoolean(dataAtKey) && dataAtKey === true;

export const isArrayAndhasIdDataAtDataAtKey = (dataAtKey, rowStructure) =>
  isArray(dataAtKey) && rowStructure.idData;

export const isArrayOnlyAtDataAtKey = (dataAtKey, rowStructure) =>
  isArray(dataAtKey) && !rowStructure.idData;
