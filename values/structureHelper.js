// values/deleteEmptySectionsInStructure.js

import compose from "ramda/src/compose";
import prop from "ramda/src/prop";
import find from "ramda/src/find";
import anyPass from "ramda/src/anyPass";
import assoc from "ramda/src/assoc";
import curry from "ramda/src/curry";
import evolve from "ramda/src/evolve";
import has from "ramda/src/has";
import map from "ramda/src/map";
import path from "ramda/src/path";
import equals from "ramda/src/equals";
import propOr from "ramda/src/propOr";

import {
  findId,
} from "../utils/utilsRamda";
import {
  CONTENT,
  HYDRA_MEMBER,
  IDENTIFIED_BY,
  LABEL,
  _LABEL,
} from "../utils/constants";

/*
 * *** delete empty sections in structure  ***
 * - - - - - - - - - - - - - - - - -
 */

// path in linkart structure api/site
const pathIdentifier = path([IDENTIFIED_BY, 1, CONTENT]);

// find in data-api-site at "identifier" id the related label
// String "timespan", String "person.timespan", {} -> String
const findLabelByIdentifier = (key, identifier, obj) =>
  compose(propOr(key, _LABEL), findByIdentifier(identifier))(obj);

// find in data-api-site at "identifier" id the related object
// String "person.timespan", {} -> String
export const findByIdentifier = curry((identifier, obj) =>
  compose(
    find(compose(equals(identifier), pathIdentifier)),
    propOr([], HYDRA_MEMBER)
  )(obj)
);

// path to data call side to API_SITE, like about text
export const pathCarriesHtml = path(["carries", 0, CONTENT]);

const isWithLabel = anyPass([has("idData"), has("label")]);

// add labels for fields with no label in linkedart
// labels are fetched in api/site with same structure like linkart
// logic: to identify item or person field id is prefixed "person.timespan"
//@param valuePrefix: String -  "person" or "item"
//@param dataSite: array - linkart hydra object api/site
//@param structure: arr - [{..., fields:[{key, label, idData}]}, ...], @see values/personFieldStructure
export const addLabelsFromSiteApi = curry(
  (valuePrefix, dataSite, structure) => {
    // {} -> {..., label:"foo"}
    const addByIdentifier = (obj) => {
      // break nothing to do
      if (isWithLabel(obj)) return obj;
      // else label from site-api or has hint is missing the key
      const { key } = obj;
      // unique id on site.api
      const identifier = `${valuePrefix}.${key}`;

      return assoc(
        LABEL,
        findLabelByIdentifier(key, identifier, dataSite),
        obj
      );
    };

    return map(
      evolve({
        fields: map(addByIdentifier),
      }),
      structure
    );
  }
);



const isDataInSection = curry((data, objField) => {
  const { key, idData } = objField;
  const dataAtKey = prop(key, data);

  // break: in data no data-object with key from field-structure
  if (!dataAtKey) return false;

  // break: data Object has values false
  if (dataAtKey === false) return false;

  // break: data-object exist, if objField has an idData
  // there has to be an entry
  if (idData && !findId(idData, dataAtKey)) return false;

  return true;
});

const removeEmptySectionsInStructure = curry((structure, data) =>
  structure.reduce((acc, objSection) => {
    const { fields } = objSection;
    const hasSectionData = !!find(isDataInSection(data), fields);

    if (hasSectionData) acc.push(objSection);
    return acc;
  }, [])
);

//@param prefix: String -  "person" or "item"
//@param dataSite: array - linkart hydra object api/site
//@param structure: arr - [{..., fields:[{key, label, idData}]}, ...], @see values/personFieldStructure
//@param data;: {} - transformed value objects, @see values/person
export const removeEmptySectionsAndAddMissingLabels = (
  prefix,
  dataSite,
  structure,
  data
) =>
  compose(
    addLabelsFromSiteApi(prefix, dataSite),
    removeEmptySectionsInStructure(structure)
  )(data);