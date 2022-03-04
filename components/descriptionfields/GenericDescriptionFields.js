// components/descriptionfields/GenericDescriptionFields.js

import PropTypes from "prop-types";
import Link from "next/link";

import unless from "ramda/src/unless";
import compose from "ramda/src/compose";
import isNil from "ramda/src/isNil";
import has from "ramda/src/has";
import assoc from "ramda/src/assoc";
import isEmpty from "ramda/src/isEmpty";
import test from "ramda/src/test";
import pluck from "ramda/src/pluck";
import uniq from "ramda/src/uniq";
import equals from "ramda/src/equals";
import length from "ramda/src/length";

import { filterAtId } from "../../libs/rmd-lib/filterAtId";
import { regExFilter, condLink } from "../../utils/utilsRoutes";
import { LABEL } from "../../utils/getter";
import {
  FORMAT_INTERNAL_LINK,
  FORMAT_TEXT_HTML,
  FORMAT_TEXT_URI_LIST,
} from "../../utils/utilsFields";

/*
 * *** GenericDescriptionFields  ***
 * ----------------------------------
 */

export const DescriptionLabel = ({ label = "", multipleValues, children }) => (
  <dl
    className={`flex flex-col  ${
      !multipleValues ? "py-2.5" : "py-1"
    } lg:flex-row`}
  >
    <dt className="flex-none py-1 text-sm text-gray-600 md:py-0 lg:w-36 xl:w-44 lg:pr-4 ">
      {label}
      {label && ":"}
    </dt>
    <dd>{children}</dd>
  </dl>
);
DescriptionLabel.propTypes = {
  label: PropTypes.string,
  multipleValues: PropTypes.bool,
  children: PropTypes.any,
};

const FilterLink = ({ label, value, href, ...props }) => {
   return (

  <DescriptionLabel label={label} {...props}>
    <dd>
      <span className="inline-block my-1 lg:my-0 px-3 py-0.5 serifSemibold rounded-sm transition-colors duration-200 text-gray-100 bg-gray-700 text-[13px] hover:bg-red-light">
        <Link href={href}>
          <a>{value}</a>
        </Link>
      </span>
    </dd>
  </DescriptionLabel>
)};
FilterLink.propTypes = {
  label: PropTypes.string,
  values: PropTypes.string,
  href: PropTypes.string,
};

const InternalLink = ({ href, value, label, ...props }) => (
  <DescriptionLabel label={label} {...props}>
    <dd>
      <Link href={href}>
        <a className="underline">{value}</a>
      </Link>
    </dd>
  </DescriptionLabel>
);
InternalLink.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  href: PropTypes.string,
};

const HtmlText = ({ value, label, ...props }) => (
  <DescriptionLabel label={label} {...props}>
    <dd
      className="field-markdown-styles"
      dangerouslySetInnerHTML={{ __html: value }}
    />
  </DescriptionLabel>
);
HtmlText.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
};

const ExternalLink = ({ value, label, ...props }) => (
  <DescriptionLabel label={label} {...props}>
    <dd className="text-lg">
      <a className="underline cursor-pointer" href={value}>
        {value}
      </a>
    </dd>
  </DescriptionLabel>
);
ExternalLink.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
};

const Text = ({ value, label }) => (
  <DescriptionLabel label={label}>
    <dd className="text-lg">
        {value}
    </dd>
  </DescriptionLabel>
);
Text.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
};

const isFilter = test(regExFilter);

export const BasicDescriptionFieldFactory = ({ dataAtKey }) => {
  const { format } = dataAtKey;
  const link = condLink(dataAtKey);

  if (isFilter(link)) {
    return <FilterLink {...dataAtKey} href={link}/>;
  } else if (!isFilter(link) && isNil(format)) {
    return <Text {...dataAtKey} />;
  } else if (format === FORMAT_INTERNAL_LINK) {
    return <InternalLink {...dataAtKey} href={link}/>;
  } else if (format === FORMAT_TEXT_HTML) {
    return <HtmlText {...dataAtKey} />;
  } else if (format === FORMAT_TEXT_URI_LIST) {
    return <ExternalLink {...dataAtKey} />;
  } else {
    return null;
  }
};
BasicDescriptionFieldFactory.propTypes = {
  dataAtKey: PropTypes.object, // data object with the structure {label, value, more ...}  generated in value object
};

export const BasicDescriptionFieldsByArrayWithDataId = ({
  dataAtKey,
  rowStructure: { idData },
}) => {
  const arrDataAtKey = filterAtId(idData, dataAtKey);

  // break
  if (isEmpty(arrDataAtKey)) return null;
  // else
  return (
    <>
      {arrDataAtKey.map((dataObj, index) => (
        <BasicDescriptionFieldFactory key={index} dataAtKey={dataObj} />
      ))}
    </>
  );
};
BasicDescriptionFieldsByArrayWithDataId.propTypes = {
  dataAtKey: PropTypes.array, // from person / item data object at a key where is an array
  rowStructure: PropTypes.object, // the generated structure of the row with the label vom sites api
};

// countLabelVarations: [{label}, {label},...] -> Number
const countLabelVarations = compose(equals(1), length, uniq, pluck(LABEL));

export const BasicDescriptionFieldsByArrayWithoutDataId = ({
  dataAtKey,
  rowStructure: { label },
}) => {
  // break
  if (isEmpty(dataAtKey)) return null;

  const hasGroupOneLabel = countLabelVarations(dataAtKey);

  return (
    <>
      {dataAtKey.map((dataObj, index) => {
        // add label from rowstructure if necessary
        dataObj = unless(has(LABEL), assoc(LABEL, label))(dataObj);
        // if all labels are the same only show the first label
        // easy hack just empty string for label
        if (hasGroupOneLabel && index > 0) {
          dataObj.label = "";
        }
        dataObj = assoc("multipleValues", true, dataObj);
        return <BasicDescriptionFieldFactory key={index} dataAtKey={dataObj} />;
      })}
    </>
  );
};
BasicDescriptionFieldsByArrayWithoutDataId.propTypes = {
  dataAtKey: PropTypes.array, // from person / item data object at a key where is an array
  rowStructure: PropTypes.object, // the generated structure of the row with the label vom sites api
};
