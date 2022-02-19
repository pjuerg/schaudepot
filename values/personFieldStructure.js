// values/personFieldStructure.js

import {
  IDENTIFIED_BY,
  CLASSIFIED_AS,
  REFERRED_TO_BY,
  ATTRIBUTED_BY,
  ADDITONAL_MEDIA,
  BUTTON_COMPONENT_ITEMS_FROM_ARTIST,
  EQUIVALENT,
} from "../utils/constants";

/*
 *  *** person menu structure  ***
 * --------------------------------
 *
 */

 const titleFields = [
   { key: ATTRIBUTED_BY},
   {
     key: BUTTON_COMPONENT_ITEMS_FROM_ARTIST,
     label: "Alle Werke anschauen",
    },
 ];

 const biografyFields = [
   { key: IDENTIFIED_BY, idData: "300264273" },
   { key: "born.timespan" },
   { key: "born.took_place_at" },
   { key: "died.timespan" },
   { key: "died.tookplace_at" },
   { key: REFERRED_TO_BY, idData: "300435415" },
   { key: "residence" },
   { key: CLASSIFIED_AS, idData: "300379842" },
   { key: REFERRED_TO_BY, idData: "300054360" },
   { key: REFERRED_TO_BY, idData: "300393201" },
   { key: REFERRED_TO_BY, idData: "300263369" },
   { key: REFERRED_TO_BY, idData: "300435422" },
   { key: "contact_point" },
 ];

 const extendedInformationFields = [
   { key: REFERRED_TO_BY, idData: "300435209" },
   { key: REFERRED_TO_BY, idData: "300435210" },
   { key: REFERRED_TO_BY, idData: "300054766" },
   { key: REFERRED_TO_BY, idData: "300026842" },
   { key: REFERRED_TO_BY, idData: "300025976" },
   { key: REFERRED_TO_BY, idData: "300379505" },
 ];

 const exhibitionFields = [{ key: "used_for", idData: "300054766" }];

 const publicationFields = [{ key: REFERRED_TO_BY, idData: "300311705" }];

 const externalReferences = [{ key: EQUIVALENT }];

 const MediaFields = [{ key: ADDITONAL_MEDIA }];

 export const fieldStructure = [
   { fields: titleFields },
   { label: "Biografie", fields: biografyFields },
   { label: "Erweiterte Angaben", fields: extendedInformationFields },
   { label: "Aussstellungen", fields: exhibitionFields },
   { label: "Publikationen / Schriftgut", fields: publicationFields },
   { label: "Externe Angebote", fields: externalReferences },
   { label: "Weitere Medien", fields: MediaFields },
 ];