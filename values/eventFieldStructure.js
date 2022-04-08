// values/eventFieldStructure.js

import {
  REFERRED_TO_BY,
  ATTRIBUTED_BY,
} from "./constants";

/*
 *  *** event  structure  ***
 * --------------------------------
 * @remember not used! only to remember fields
 */

 const fields = [
   { key: ATTRIBUTED_BY }, // person
   { key: REFERRED_TO_BY, idData: "300435416" }, // Beschreibung
   { key: REFERRED_TO_BY, idData: "300435418" }, // Nachspann
 ];

 export const fieldStructure = [
   { fields: fields },
 ];