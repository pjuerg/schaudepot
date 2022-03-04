import PropTypes from "prop-types";
import head from "ramda/src/head";

import propOr from "ramda/src/propOr";
import { GATEWAY } from "../../utils/api";
import { ROUTE_ITEM } from "../../utils/routes";
import { DescriptionLabel } from "./GenericDescriptionFields";
import { SecondaryButton } from "../designSystem";

export const PDFLink = ({ subject_of, id, label:labelData }) => {
  const { label, access_point } = head(subject_of);
  return (
    <DescriptionLabel label={label}>
      <div className="field-markdown-styles">
        <a target="_blank" rel="noreferrer" href={`${GATEWAY}${access_point}`}>
          {propOr("", "label", labelData)}{id}.pdf
        </a>
      </div>
    </DescriptionLabel>
  );
};
PDFLink.propTypes = {
  data: PropTypes.object, // transforme data like person or item
};

export const ItemsToPersonButton = ({ id, label }) => (
  <SecondaryButton
    className="my-8"
    url={`${ROUTE_ITEM}?filter[person]=${id}`}
    label={label}
  />
);
ItemsToPersonButton.propTypes = {
  data: PropTypes.object, // transforme data like person or item
};