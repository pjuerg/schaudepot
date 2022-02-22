
/** @module toSnakeCase */

/**
 * #### s → s
 *
 * dieser_satz_ist_snake_case_geschrieben
 * 
 * @function
 * @param s - String
 * @return s - String
 **/
export function toSnakeCase(str) {
  return (
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((s) => s.toLowerCase())
      .join("_")
  );
}
