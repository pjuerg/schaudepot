// components/descriptionfields/EquivalentOffers.js
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import isNil from "ramda/src/isNil";
import apply from "ramda/src/apply";
import compose from "ramda/src/compose";
import head from "ramda/src/head";
import pick from "ramda/src/pick";
import props from "ramda/src/props";
import tail from "ramda/src/tail";
import unless from "ramda/src/unless";
import zip from "ramda/src/zip";

import { DescriptionLabel } from "./GenericDescriptionFields.js";

/*
 * *** EquivalentOffers ***
 * --------------------------
 *
 */

const toArrData = unless(
  isNil,
  compose(apply(zip), props(["labels", "uris"]), pick(["labels", "uris"]))
);

const BEACON = "https://beacon.findbuch.de/seealso/pnd-aks/-lemo@ap";

// @param id: String - for the service
// @param callback: function
async function asyncSeeAlsoCall(id, callback) {
  const SeeAlsoService = (await import("../../libs/modified-see-also.js"))
    .default;
  const service = new SeeAlsoService(BEACON);
  service.query(id, callback);
}


export const EquivalentOffers = ( {equivalent:{id}}) => {
  const [stateSeeAlso, setStatestateSeeAlso] = useState(null);
  
  useEffect(() => {
    asyncSeeAlsoCall(id, (data) => setStatestateSeeAlso(data));
  }, [setStatestateSeeAlso, id]);

  const arrData = toArrData(stateSeeAlso);
  
  return (
    <>
      {isNil(arrData) ? (
        <div>Laden ...</div>
      ) : (
        <DescriptionLabel label="Externe Angebote">
          <ul className="field-markdown-styles">
            {arrData.map((arr, index) => {
              const link = head(tail(arr));
              return (
                <li key={index}>
                  <a href={link} target="_blank" rel="noreferrer">
                    {head(arr)}
                  </a>
                </li>
              );
            })}
          </ul>
        </DescriptionLabel>
      )}
    </>
  );
};
EquivalentOffers.propTypes = {
  data: PropTypes.object, // the generated structure of the row with the label vom sites api
};
