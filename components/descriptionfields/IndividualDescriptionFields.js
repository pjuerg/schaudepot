import PropTypes from "prop-types";
import head from "ramda/src/head";
import Link from "next/link";

import propOr from "ramda/src/propOr";

import { gateway } from "../../coresetConfigs";
import { ROUTE_ITEM } from "../../utils/routes";
import { DescriptionLabel } from "./GenericDescriptionFields";

export const PDFLink = ({ subject_of, id, label:labelData }) => {
  const { label, access_point } = head(subject_of);
  return (
    <DescriptionLabel label={label}>
      <div className="field-markdown-styles">
        <a target="_blank" rel="noreferrer" href={`${gateway}${access_point}`}>
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
  <div className="my-8">
    <Link href={`${ROUTE_ITEM}?filter[person]=${id}`}><a>{label}</a></Link>
  </div>
);
ItemsToPersonButton.propTypes = {
  data: PropTypes.object, // transforme data like person or item
};