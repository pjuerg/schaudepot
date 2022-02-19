// values/physicalObjectFieldStructure.js
import {
  IDENTIFIED_BY,
  CLASSIFIED_AS,
  REFERRED_TO_BY,
  MEMBER_OF,
  TIMESPAN,
  ADDITONAL_MEDIA,
  SUBJECT_OF,
} from "../utils/constants";

/*
 *  *** physical object menu structure  ***
 * -----------------------------------------
 *
 */

const titleFields = [
  { key: TIMESPAN },
  { key: IDENTIFIED_BY, idData: "300404620" },
  { key: MEMBER_OF },
  { key: SUBJECT_OF, idData: "300412188" }, // PDF sheet
];

const workFields = [
  { key: IDENTIFIED_BY, idData: "300404620" },
  { key: CLASSIFIED_AS, idData: "300435443" },
  { key: IDENTIFIED_BY, idData: "300264273" },
  { key: REFERRED_TO_BY, idData: "300444120" },
  { key: REFERRED_TO_BY, idData: "300435448" },
  { key: REFERRED_TO_BY, idData: "300435447" },
  { key: "made_of" },
  { key: REFERRED_TO_BY, idData: "300435429" },
  { key: REFERRED_TO_BY, idData: "300435430" },
  { key: REFERRED_TO_BY, idData: "300056240" },
  { key: REFERRED_TO_BY, idData: "300435441" },
  { key: REFERRED_TO_BY, idData: "300443981" },
  { key: REFERRED_TO_BY, idData: "300435435" },
  { key: REFERRED_TO_BY, idData: "300435414" },
  { key: REFERRED_TO_BY, idData: "300435420" },
  { key: REFERRED_TO_BY, idData: "300435416" },
  { key: REFERRED_TO_BY, idData: "300435436" },
];

const provenanceFields = [
  { key: "current_location" },
  { key: IDENTIFIED_BY, idData: "300404621" },
  { key: REFERRED_TO_BY, idData: "300435449" },
  { key: "current_owner" },
  { key: REFERRED_TO_BY, idData: "300435439" },
  { key: REFERRED_TO_BY, idData: "300445025" },
  { key: REFERRED_TO_BY, idData: "300444173" },
];

const documentationFields = [
  { key: REFERRED_TO_BY, idData: "300026842" },
  { key: REFERRED_TO_BY, idData: "300435427" },
  { key: REFERRED_TO_BY, idData: "300444121" },
  { key: REFERRED_TO_BY, idData: "300435444" },
];

const exhibitionFields = [{ key: "used_for", idData: "300054766" }];

const publicationFields = [{ key: REFERRED_TO_BY, idData: "300311705" }];

const MediaFields = [{ key: ADDITONAL_MEDIA }];

export const fieldStructure = [
  { fields: titleFields },
  { label: "Werk", fields: workFields },
  { label: "Provenienz", fields: provenanceFields },
  { label: "Dokumentation", fields: documentationFields },
  { label: "Aussstellungen", fields: exhibitionFields },
  { label: "Publikationen / Schriftgut", fields: publicationFields },
  { label: "Weitere Medien", fields: MediaFields },
];
