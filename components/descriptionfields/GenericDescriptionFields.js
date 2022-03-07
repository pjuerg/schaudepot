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
import {
  FORMAT_INTERNAL_LINK,
  FORMAT_TEXT_HTML,
  FORMAT_TEXT_URI_LIST,
} from "../../utils/utilsFields";
import { truthy } from "../../libs/rmd-lib/truthy";

/*
 * *** GenericDescriptionFields  ***
 * ----------------------------------
 */

export const DescriptionLabel = ({
  classNameDesriptionLabelConfigs,
  label = "",
  multipleValues,
  children,
}) => {
  let py = !multipleValues ? "py-2.5" : "py-1";
  py = classNameDesriptionLabelConfigs?.py ?? py;

  return (
    <dl className={`${py} flex flex-col lg:flex-row`}>
      <dt
        className={`flex-none text-sm text-gray-600 md:py-0 lg:w-36 xl:w-44 lg:pr-4`}
      >
        {label}
        {label && ":"}
      </dt>
      <dd>{children}</dd>
    </dl>
  );
};
DescriptionLabel.propTypes = {
  label: PropTypes.string,
  multipleValues: PropTypes.bool,
  children: PropTypes.any,
};

const FilterLink = ({ label, value, href, ...props }) => {
  return (
    <DescriptionLabel label={label} {...props}>
      <span className="inline-block my-1 lg:my-0 px-3 py-0.5 serifSemibold rounded-sm transition-colors duration-200 text-gray-100 bg-gray-700 text-[13px] hover:bg-red-light">
        <Link href={href}>
          <a>{value}</a>
        </Link>
      </span>
    </DescriptionLabel>
  );
};
FilterLink.propTypes = {
  label: PropTypes.string,
  values: PropTypes.string,
  href: PropTypes.string,
};

const InternalLink = ({ href, value, label, ...props }) => (
  <DescriptionLabel label={label} {...props}>
    <Link href={href}>
      <a className="underline">{value}</a>
    </Link>
  </DescriptionLabel>
);
InternalLink.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  href: PropTypes.string,
};

const HtmlText = ({ value, label, ...props }) => (
  <DescriptionLabel label={label} {...props}>
    <div
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
    <a className="text-lg underline cursor-pointer" href={value}>
      {value}
    </a>
  </DescriptionLabel>
);
ExternalLink.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
};

const Text = ({ value, label, classNameFieldConfigs, ...props }) => {
 const textSize =  classNameFieldConfigs?.textSize ?? "text-lg";
 return  (
  <DescriptionLabel label={label} {...props}>
    <div className={`${textSize}`}>{value}</div>
  </DescriptionLabel>
)};
Text.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
};

const isFilter = test(regExFilter);

export const BasicDescriptionFieldFactory = ({
  dataAtKey,
  rowStructure,
  ...props
}) => {
  const { format } = dataAtKey;
  const { textOnly } = rowStructure;
  const link = condLink(dataAtKey);

  console.log("dataAtKey", dataAtKey);
  if (truthy(textOnly)) {
    return <Text {...dataAtKey} {...props} />;
  } else if (isFilter(link)) {
    return <FilterLink href={link} {...dataAtKey} {...props} />;
  } else if (!isFilter(link) && isNil(format)) {
    return <Text {...dataAtKey} {...props} />;
  } else if (format === FORMAT_INTERNAL_LINK) {
    return <InternalLink href={link} {...dataAtKey} {...props} />;
  } else if (format === FORMAT_TEXT_HTML) {
    return <HtmlText {...dataAtKey} {...props} />;
  } else if (format === FORMAT_TEXT_URI_LIST) {
    return <ExternalLink {...dataAtKey} {...props} />;
  } else {
    return null;
  }
};
BasicDescriptionFieldFactory.propTypes = {
  dataAtKey: PropTypes.object, // data object with the structure {label, value, more ...}  generated in value object
};

export const BasicDescriptionFieldsByArrayWithDataId = ({
  dataAtKey,
  rowStructure,
  ...props
}) => {
  const { idData } = rowStructure;
  const arrDataAtKey = filterAtId(idData, dataAtKey);

  // break
  if (isEmpty(arrDataAtKey)) return null;
  // else
  return (
    <>
      {arrDataAtKey.map((dataObj, index) => (
        <BasicDescriptionFieldFactory
          key={index}
          dataAtKey={dataObj}
          rowStructure={rowStructure}
          {...props}
        />
      ))}
    </>
  );
};
BasicDescriptionFieldsByArrayWithDataId.propTypes = {
  dataAtKey: PropTypes.array, // from person / item data object at a key where is an array
  rowStructure: PropTypes.object, // the generated structure of the row with the label vom sites api
};

// countLabelVarations: [{label}, {label},...] -> Number
const countLabelVarations = compose(equals(1), length, uniq, pluck("label"));

export const BasicDescriptionFieldsByArrayWithoutDataId = ({
  dataAtKey,
  rowStructure,
  ...props
}) => {
  // break
  if (isEmpty(dataAtKey)) return null;

  const { label } = rowStructure;
  const hasGroupOneLabel = countLabelVarations(dataAtKey);

  return (
    <>
      {dataAtKey.map((dataObj, index) => {
        // add label from rowstructure if necessary
        dataObj = unless(has("label"), assoc("label", label))(dataObj);
        // if all labels are the same only show the first label
        // easy hack just empty string for label
        if (hasGroupOneLabel && index > 0) {
          dataObj.label = "";
        }
        dataObj = assoc("multipleValues", true, dataObj);
        return (
          <BasicDescriptionFieldFactory
            key={index}
            dataAtKey={dataObj}
            rowStructure={rowStructure}
            {...props}
          />
        );
      })}
    </>
  );
};
BasicDescriptionFieldsByArrayWithoutDataId.propTypes = {
  dataAtKey: PropTypes.array, // from person / item data object at a key where is an array
  rowStructure: PropTypes.object, // the generated structure of the row with the label vom sites api
};
