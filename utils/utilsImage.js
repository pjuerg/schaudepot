// moduls/utilsImage.js

import compose from "ramda/src/compose";
import prop from "ramda/src/prop";
import __ from "ramda/src/__";
import both from "ramda/src/both";
import propEq from "ramda/src/propEq";
import head from "ramda/src/head";
import anyPass from "ramda/src/anyPass";
import test from "ramda/src/test";
import lte from "ramda/src/lte";
import length from "ramda/src/length";
import split from "ramda/src/split";
import last from "ramda/src/last";
import join from "ramda/src/join";
import init from "ramda/src/init";

import { exists } from "../libs/rmd-lib/exists";

import { GATEWAY } from "./api";
import {
  ACCESS_POINT,
  CREATED_BY_CARRIED_OUT_BY,
  CREATED_BY_TIMESPAN,
  IDENTIFIED_BY,
  REFERRED_TO_BY,
} from "./constants";
import { LABEL } from "./getter";
/*
 *  *** utilsImage  ***
 * -----------------------
 *
 */

const regExImageFormat = /.*\/png|.*\/jpeg/;
export const IsFormatImage = test(regExImageFormat);

// *** representation image ***
const propEqLabel = propEq(LABEL);

export const hasPortraitOrPreview = anyPass([
  propEqLabel("Preview"),
  propEqLabel("Portrait"),
]);
export const hasPreview = both(exists, compose(hasPortraitOrPreview, head));
const lengthIsOne = compose(lte(__, 1), length);
// export const hasPreview = compose(hasPortraitOrPreview, head);
export const hasOnlyPreview = both(hasPreview, lengthIsOne);

const PLACEHOLDER_IMG = "/imgs/placeholder-missing-image.jpg";
const PLACEHOLDER_IMG_ALT = "Platzhalter: Keine Bildansicht verfügbar";
const CREATOR_LABEL = "Urheber:in";
export const getRepresentationLegend = (data) =>
  data[IDENTIFIED_BY] && data[IDENTIFIED_BY];
export const getRepresentationCopyright = (data) =>
  data[REFERRED_TO_BY] && `© ${data[REFERRED_TO_BY]}`;
export const getRepresentationCreator = (data) => {
  const creator = data[CREATED_BY_CARRIED_OUT_BY];
  const timespan = data[CREATED_BY_TIMESPAN];

  if (creator && timespan) return `${CREATOR_LABEL}: ${creator}, ${timespan}`;
  else if (creator) return `${CREATOR_LABEL}: ${creator}`;
  else if (timespan) return timespan;
};

// used in [item].js, [person].js for Lazyloadimage
// to fit the image in the viewport wether h-full or w-full
// {dimension, ...} -> String
export const stateClassnameFitInHeight = (data) => {
  const str = "s-fitInHeight";
  // break no image data
  if (!data) return "";
  const breakpoint = 0.6;
  const {
    dimension: [w, h],
  } = data;

  return w / h > breakpoint ? str : "";
};

// check for any existing value @see linked.art xls in represenation
export const hasAnyRepresentationInfo = (data) => {
  const fields = [
    REFERRED_TO_BY,
    CREATED_BY_CARRIED_OUT_BY,
    CREATED_BY_TIMESPAN,
    IDENTIFIED_BY,
  ];
  for (const field of fields) {
    if (data[field]) return true;
  }
  return false;
};

const pathServerImage = (fileName) => `${GATEWAY}${fileName}`;
const imageWithPath = compose(pathServerImage, prop(ACCESS_POINT));

const imgSuffix = compose(last, split("."));
const imgName = compose(join("."), init, split("."));

// @param represenation - {}, from value object person or physical object
export const getPreviewImage = (representation, size) => {
  if (hasPreview(representation)) {
    const representationImage = head(representation);
    return getImageData(representationImage, size);
  }

  // else preview image
  const src = PLACEHOLDER_IMG;
  const alt = PLACEHOLDER_IMG_ALT;
  const dimension = [600, 399]; // dimension of placeholder image

  return { src, alt, dimension, isPlaceholder: true };
};

export const getImageData = (data, size) => {
  const srcOriginal = imageWithPath(data);
  const src = size
    ? `${imgName(srcOriginal)}_${size}w.${imgSuffix(srcOriginal)}`
    : srcOriginal;

  const alt = getRepresentationLegend(data) || "";
  const dimension = data.dimension;

  return { src, alt, dimension };
};

// {src} -> undefined
export const loadImageFromObject = compose(
  loadImage,
  prop("src"),
  getImageData
);

// [{src}] -> undefined
export const loadImageFromRepresentation = compose(loadImageFromObject, head);

// String -> undefined
export function loadImage(name) {
  const image = new Image();
  image.src = name;
}
