// values/valueHelper.js

import compose from "ramda/src/compose";
import map from "ramda/src/map";
import prop from "ramda/src/prop";
import path from "ramda/src/path";
import evolve from "ramda/src/evolve";
import curry from "ramda/src/curry";
import omit from "ramda/src/omit";
import when from "ramda/src/when";
import isNil from "ramda/src/isNil";
import always from "ramda/src/always";
import unless from "ramda/src/unless";
import head from "ramda/src/head";
import assoc from "ramda/src/assoc";
import isEmpty from "ramda/src/isEmpty";
import over from "ramda/src/over";
import mergeLeft from "ramda/src/mergeLeft";
import lensProp from "ramda/src/lensProp";

import { splitAtLastSlash } from "../libs/rmd-lib/splitAtLastSlash";
import { renameKeys } from "../libs/rmd-lib/renameKeys";

import { hasOnlyPreview } from "../utils/utilsImage";
import {
  BORN,
  CLASSIFIED_AS,
  CONTENT,
  CREATED_BY,
  CREATED_BY_CARRIED_OUT_BY,
  CREATED_BY_TIMESPAN,
  DIED,
  FILTER,
  HYDRA_MEMBER,
  HYDRA_TOTAL_ITEMS,
  IDENTIFIED_BY,
  _LABEL,
  ACCESS_POINT,
  REFERRED_TO_BY,
  ADDITONAL_MEDIA,
  STANDART_OMITS,
  TIMESPAN,
  VALUE,
} from "./constants";

/*
 *  *** valueHelper  ***
 * -----------------------
 *
 * everything related to API return values
 */

const HYDRA_VIEW = "hydra:view";
const HYDRA_FIRST = "hydra:first";
const HYDRA_NEXT = "hydra:next";
const HYDRA_LAST = "hydra:last";

export const pathSearchFilter = path(["search", FILTER]);
export const pathHydraViewNext = path([HYDRA_VIEW, HYDRA_NEXT]);
export const pathBornTimespan = path([
  BORN,
  TIMESPAN,
  IDENTIFIED_BY,
  0,
  CONTENT,
]);
export const pathDiedTimespan = path([
  DIED,
  TIMESPAN,
  IDENTIFIED_BY,
  0,
  CONTENT,
]);
export const pathBornTookPlaceAt = path([BORN, "took_place_at", 0, _LABEL]);
export const pathDiedTookPlaceAt = path([DIED, "took_place_at", 0, _LABEL]);
export const pathTimespan = path([
  "produced_by",
  TIMESPAN,
  IDENTIFIED_BY,
  0,
  CONTENT,
]);

/**
 * transform obj generic function for listings
 * @remember merge it with special members in listing
 */
export const listingTransformer = {
  view: compose(
    renameKeys({
      [HYDRA_FIRST]: "first",
      [HYDRA_LAST]: "last",
      [HYDRA_NEXT]: "next",
    }),
    omit(STANDART_OMITS)
  ),
};

/**
 * generic listing renaming
 */
export const renameKeysListing = renameKeys({
  [HYDRA_MEMBER]: "member",
  [HYDRA_TOTAL_ITEMS]: "totalItems",
  [HYDRA_VIEW]: "view",
});

const saveString = when(isNil, always(""));
export const lastSlashId = compose(splitAtLastSlash, saveString);

export const addPropByPath = curry((prop, fnPath, obj) =>
  unless(compose(isEmpty, fnPath), assoc(prop, fnPath(obj)))(obj)
);

export const addPropAdditionalMedia = curry((obj) => {
  const { representation } = obj;
  const onlyPreview = hasOnlyPreview(representation);
  let hasAdditional = false;

  // more than ohne entry in representation
  if (representation && representation.length > 2) {
    hasAdditional = true;
  }
  // only one entry, but that is not preview
  else if (representation && !onlyPreview) {
    hasAdditional = true;
  }
  return assoc(ADDITONAL_MEDIA, hasAdditional, obj);
});
// unless(compose(isEmpty, fnPath), assoc(prop, fnPath(obj)))(obj)

export const idLens = lensProp("id");
const idFilterLens = lensProp(FILTER);
export const cleanFilter = over(idFilterLens, lastSlashId);

export const cleanIdFromLink = over(idLens, lastSlashId);

export const renameLabel = renameKeys({ _label: "label" });
export const renameContentToValue = renameKeys({ content: VALUE });
export const renameLabelToValue = renameKeys({ _label: VALUE });
export const renameTypeToLabel = renameKeys({ type: "label" });
export const renameIdFilter = renameKeys({ id: FILTER });

export const omitType = omit(["type"]);
export const omitClassifiedAs = omit([CLASSIFIED_AS]);
export const mapOmitType = map(omitType);

export const mapRenameLabel = map(renameLabel);
export const mapRenameLabelToValue = map(renameLabelToValue);
export const mapRenameOptionsLabel = map(evolve({ options: mapRenameLabel }));

const mapMergeClassifiedAs = map((obj) =>
  mergeLeft(path([CLASSIFIED_AS, 0], obj), obj)
);
export const mergeAssigned = (obj) => mergeLeft(path(["assigned"], obj), obj);

export const unnestClassifiedAs = compose(
  map(
    compose(
      cleanIdFromLink,
      renameLabel,
      renameContentToValue,
      omitClassifiedAs
    )
  ),
  mapMergeClassifiedAs
);

const representationTransformer = {
  [ACCESS_POINT]: path([0, "id"]),
  [IDENTIFIED_BY]: path([0, CONTENT]),
  dimension: map(prop(VALUE)),
  [REFERRED_TO_BY]: compose(prop(VALUE), head, mapOmitType, unnestClassifiedAs),
};

export const transformRepresentationImage = compose(
  renameKeys({ [_LABEL]: "label"}),
  omit(["id", "type", "classified_as", "created_by"]),
  evolve(representationTransformer),
  addPropByPath(
    CREATED_BY_CARRIED_OUT_BY,
    path([CREATED_BY, "carried_out_by", 0, _LABEL])
  ),
  addPropByPath(
    CREATED_BY_TIMESPAN,
    compose(path([CREATED_BY, TIMESPAN, IDENTIFIED_BY, 0, CONTENT]))
  ),
  prop("digitally_shown_by")
);

export const mapRepresentation = map(transformRepresentationImage);
