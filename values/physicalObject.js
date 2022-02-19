// values/physicalObject.js

import compose from "ramda/src/compose";
import prop from "ramda/src/prop";
import map from "ramda/src/map";
import evolve from "ramda/src/evolve";
import omit from "ramda/src/omit";
import mergeAll from "ramda/src/mergeAll";
import pathOr from "ramda/src/pathOr";
import path from "ramda/src/path";
import assoc from "ramda/src/assoc";

import { renameKeys } from "rmd-lib-pp/src/renameKeys";

import {  maybe } from "rmd-lib-pp/src/maybe";

import {
  TIMESPAN,
  STANDART_OMITS,
  LABEL,
  ACCESS_POINT,
} from "../utils/constants";
import {
  lastSlashId,
  renameKeysListing,
  addPropByPath,
  listingTransformer,
  mapOmitType,
  unnestClassifiedAs,
  cleanFilter,
  renameLabelToValue,
  mapRenameLabel,
  cleanIdFromLink,
  renameIdFilter,
  omitClassifiedAs,
  renameTypeToLabel,
  pathTimespan,
  mapRenameOptionsLabel,
  mapRepresentation,
  addPropAdditionalMedia,
  mapRenameLabelToValue,
} from "./valueHelper";

/*
 * *** PhysicalObject value object ***
 * - - - - - - - - - - - - - - - - - - - - -
 *
 * for entry-point: api/physicalObject/id
 */

const assocAccessPoint = (obj) =>
  assoc(ACCESS_POINT, path([ACCESS_POINT, 0, "id"], obj), obj);

const mapAccessPoint = map(assocAccessPoint);

/**
 * transform obj for api/physical_object/id
 */
const physicalObjectTransformer = {
  id: lastSlashId,
  produced_by: compose(
    map(
      compose(
        renameLabelToValue,
        omitClassifiedAs,
        cleanIdFromLink,
        prop("carried_out_by")
      )
    ),
    pathOr([], ["produced_by", "part"])
  ),
  current_location: map(compose(renameLabelToValue)),
  current_owner: map(compose(renameLabelToValue)),
  used_for: compose(unnestClassifiedAs, mapOmitType, mapRenameLabelToValue),
  member_of: map(compose(cleanIdFromLink, renameLabelToValue)),
  identified_by: compose(mapOmitType, unnestClassifiedAs),
  classified_as: compose(
    mapOmitType,
    unnestClassifiedAs,
    map(compose(cleanFilter, renameIdFilter, renameLabelToValue))
  ),
  referred_to_by: compose(mapOmitType, unnestClassifiedAs),
  representation: mapRepresentation,
  made_of: map(
    compose(cleanFilter, renameIdFilter, renameLabelToValue, renameTypeToLabel)
  ),
  subject_of: compose(mapAccessPoint, mapOmitType, unnestClassifiedAs),
};

/**
 * transform function
 */
export const transformPhysicalObject = maybe(
  compose(
    addPropAdditionalMedia(), // position is crucial for using util fns
    evolve(physicalObjectTransformer),
    addPropByPath(TIMESPAN, pathTimespan),
    renameKeys({ _label: LABEL }),
    omit(["@context", "type", "equivalent"])
  )
);

/*
 * *** value transformer PhysicalObjectListing ***
 * - - - - - - - - - - - - - - - - - - - - - - - -
 *
 * for entry-point: api/physical_object
 */

/**
 * transform obj function for api/physical_object
 * @remember merge it with listingTransformer
 */
const memberTransformerPhysicalObject = {
  member: map(transformPhysicalObject),
};

/**
 * transform obj function for api/physical_object
 * @remember merge it with listingTransformer
 */
const searchTransformer = {
  search: {
    filter: compose(mapRenameOptionsLabel, mapRenameLabel),
  },
};

/**
 * merged tranformers api/person
 * generic listingTranfomer - alsways same fieldws
 * specific physical_object transformer
 */
const physicalObjectListingTransformer = mergeAll([
  listingTransformer,
  searchTransformer,
  memberTransformerPhysicalObject,
]);

/**
 * transform function for api/pysical_object
 */
export const transformPhysicalObjectListing = compose(
  evolve(physicalObjectListingTransformer),
  renameKeys({ "hydra:search": "search" }),
  renameKeysListing,
  omit(STANDART_OMITS)
);


