// values/event.js

import compose from "ramda/src/compose";
import map from "ramda/src/map";
import evolve from "ramda/src/evolve";
import omit from "ramda/src/omit";
import mergeRight from "ramda/src/mergeRight";
import dissoc from "ramda/src/dissoc";
import assoc from "ramda/src/assoc";
import head from "ramda/src/head";

import { splitAtLastSlash } from "../libs/rmd-lib/splitAtLastSlash";
import { maybe } from "../libs/rmd-lib/maybe";
import { renameKeys } from "../libs/rmd-lib/renameKeys";

import {
  STANDART_OMITS,
} from "./constants";


import {
  renameKeysListing,
  mapRepresentation,
  lastSlashId,
  addPropByPath,
  listingTransformer,
  omitType,
  mapOmitType,
  renameLabel,
  mapRenameLabelToValue,
  renameLabelToValue,
  cleanIdFromLink,
  mergeAssigned,
  unnestClassifiedAs,
  pathBornTimespan,
  pathDiedTimespan,
  pathBornTookPlaceAt,
  pathDiedTookPlaceAt,
  addPropAdditionalMedia,
} from "./valueHelper";

/*
 * *** event value object ***
 * - - - - - - - - - - - - - - - - -
 *
 * for entry-point: api/person/id
 */

const assocId = (obj) => assoc("id", splitAtLastSlash(obj.id))(obj);
/**
 * transform obj for api/event/id
 */
const eventTransformer = {
  id: lastSlashId,
  // identified_by: compose(mapOmitType, unnestClassifiedAs),
  referred_to_by: compose(mapOmitType, unnestClassifiedAs),
  representation: mapRepresentation,
  attributed_by: compose(
    map(dissoc("assigned")),
    map(
      compose(cleanIdFromLink, renameLabelToValue, mergeAssigned, renameLabel)
    )
  ),
};

/**
 * transform function for api/event/id
 */
export const transformEvent = maybe(
  compose(
    evolve(eventTransformer),
    renameKeys({ _label: "label" }),
    omit([
      "@context",
      "type",
      "classified_as",
      "identified_by",
      "used_specific_object",
      "classified_as",
    ])
  )
);

/*
 * *** value transformer EventListing ***
 * - - - - - - - - - - - - - - - - - - - -
 * for entry-point: api/event
 */

/**
 * transform obj function for api/event
 * @remember merge it with listingTransformer
 */
const memberTransformerEvent = {
  member: map(transformEvent),
};

/**
 * merged tranformers api/event
 * generic listingTranfomer - alsways same fieldws
 * specific person transformer
 */
const eventListingTransformer = mergeRight(
  memberTransformerEvent,
  listingTransformer
);

/**
 * transform function for api/event
 */
export const transformEventListing = compose(
  evolve(eventListingTransformer),
  renameKeysListing,
  omit(STANDART_OMITS)
);
