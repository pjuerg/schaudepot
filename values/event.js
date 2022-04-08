// values/event.js

import compose from "ramda/src/compose";
import map from "ramda/src/map";
import evolve from "ramda/src/evolve";
import omit from "ramda/src/omit";
import mergeRight from "ramda/src/mergeRight";
import dissoc from "ramda/src/dissoc";
import assoc from "ramda/src/assoc";

import { splitAtLastSlash } from "../libs/rmd-lib/splitAtLastSlash";
import { maybe } from "../libs/rmd-lib/maybe";
import { renameKeys } from "../libs/rmd-lib/renameKeys";

import {
  CLASSIFIED_AS,
  IDENTIFIED_BY,
  STANDART_OMITS,
} from "./constants";

import {
  renameKeysListing,
  mapRepresentation,
  lastSlashId,
  listingTransformer,
  mapOmitType,
  renameLabel,
  renameLabelToValue,
  cleanIdFromLink,
  mergeAssigned,
  unnestClassifiedAs,
} from "./valueHelper";
import { transformPhysicalObject } from "./physicalObject";

/*
 * *** event value object ***
 * - - - - - - - - - - - - - - - - -
 *
 * for entry-point: api/person/id
 */


/**
 * transform obj for api/event/id
 */
const eventTransformer = {
  id: lastSlashId,
  referred_to_by: compose(mapOmitType, unnestClassifiedAs),
  representation: mapRepresentation,
  used_specific_object: map(transformPhysicalObject),
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
      CLASSIFIED_AS,
      IDENTIFIED_BY
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
