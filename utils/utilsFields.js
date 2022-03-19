//utils/utilsFields.js


import unnest from "ramda/src/unnest";
import pick from "ramda/src/pick";
import prop from "ramda/src/prop";
import assoc from "ramda/src/assoc";
import compose from "ramda/src/compose";
import isNil from "ramda/src/isNil";
import reject from "ramda/src/reject";

import { isString } from "../libs/rmd-lib/isString";
import { isArray } from "../libs/rmd-lib/isArray";
import { isBoolean } from "../libs/rmd-lib/isBoolean";
import { filterAtId } from "../libs/rmd-lib/filterAtId";

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




// clean for display 
const clean = compose(reject(isNil),unnest)

/**
 * @description  The server call for physicall objects is translated physicalObjects().
 * The structure with sections and fields is in an filedStructure array. 
 * removeEmptySectionsAndAddMissingLabels() cleans the structure: data which has no
 * counterpart from the call und adds the missing labels from the site call.
 * getFieldsData() looks for the existing matching the fields in a defined structure.
 * To display only map through the array
 * @remember SectionsFieldsFactory has the same idea, but returns components
 * In SectionsFieldFactory are the conditions which here are missing.
 * @param {Array.<Object[]>} fields - [] section part (from removeEmptySectionsAndAddMissingLabels())
 * @param {Object} data -  translated physicalObjects()
 * @returns 
 */  
export const getFieldsData = (fields, data) => {

  let fieldsData = fields.map((rowStructure) => {
    const { key } = rowStructure;
    const dataAtKey = prop(key, data);
    let idData;
    let arrDataAtKey;

    if (isStringAtDataAtKey(dataAtKey)) {
      return { value: dataAtKey, label: rowStructure.label, key: key };
    } else if (isArrayAndhasIdDataAtDataAtKey(dataAtKey, rowStructure)) {
      idData = rowStructure.idData;
      arrDataAtKey = filterAtId(idData, dataAtKey);

      return arrDataAtKey.map((dataObj) => {
        return compose(assoc('key', key)), pick(["value", "label", "id"])(dataObj);
      });
    } else {
      // @remember missing conditions in SectionsFieldsFactory
      return undefined
      // return{ 
      //   value: "ERROR dataFactory; iitemData not parssed",
      //   label: "error datafactory",
      // };
    }
  });
  return clean(fieldsData);
};
