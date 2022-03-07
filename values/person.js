// values/person.js

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
  BORN,
  DIED,
  ADDITONAL_MEDIA,
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
 * *** person value object ***
 * - - - - - - - - - - - - - - - - -
 *
 * for entry-point: api/person/id
 */

const assocId = (obj) => assoc("id", splitAtLastSlash(obj.id))(obj);
/**
 * transform obj for api/person/id
 */
const personTransformer = {
  id: lastSlashId,
  residence: map(compose(omitType, renameLabelToValue)),
  identified_by: compose(mapOmitType, unnestClassifiedAs),
  referred_to_by: compose(mapOmitType, unnestClassifiedAs),
  member_of: compose(mapOmitType, unnestClassifiedAs, mapRenameLabelToValue),
  contact_point: compose(mapOmitType, unnestClassifiedAs),
  equivalent: compose(assocId, renameLabel, head),
  classified_as: compose(
    mapOmitType,
    unnestClassifiedAs,
    mapRenameLabelToValue
  ),
  representation: mapRepresentation,
  attributed_by: compose(
    map(dissoc("assigned")),
    map(
      compose(cleanIdFromLink, renameLabelToValue, mergeAssigned, renameLabel)
    )
  ),
};

/**
 * transform function for api/person/id
 */
export const transformPerson = maybe(
  compose(
    addPropAdditionalMedia(), // position is crucial for using util fns
    evolve(personTransformer),
    assoc(ADDITONAL_MEDIA, true),
    dissoc(BORN),
    dissoc(DIED),
    addPropByPath("died.took_place_at", pathDiedTookPlaceAt),
    addPropByPath("died.timespan", pathDiedTimespan),
    addPropByPath("born.timespan", pathBornTimespan),
    addPropByPath("born.took_place_at", pathBornTookPlaceAt),
    renameKeys({ _label: "label" }),
    omit(["@context", "type"])
  )
);

/*
 * *** value transformer PersonListing ***
 * - - - - - - - - - - - - - - - - - - - -
 * for entry-point: api/person
 */

/**
 * transform obj function for api/person
 * @remember merge it with listingTransformer
 */
const memberTransformerPerson = {
  member: map(transformPerson),
};

/**
 * merged tranformers api/person
 * generic listingTranfomer - alsways same fieldws
 * specific person transformer
 */
const personListingTransformer = mergeRight(
  memberTransformerPerson,
  listingTransformer
);

/**
 * transform function for api/person
 */
export const transformPersonListing = compose(
  evolve(personListingTransformer),
  renameKeysListing,
  omit(STANDART_OMITS)
);
