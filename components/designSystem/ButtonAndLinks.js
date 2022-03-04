// components/designSystem/ButtonAndLinks.js

import PropTypes from "prop-types";

import Link from "next/link";

/*
 *  *** ButtonsAndLinks  ***
 * --------------------------
 *
 */


const LinkButton = ({
  className,
  label,
  url,
}) => (
    <Link href={url}>
      <a
        className={`${className} inline-flex rounded-sm items-center transition-colors duration-200 ease-in serifSemibold border border-gray-600 hover:bg-red hover:border-red`}
      >
        {label}
      </a>
    </Link>
); 
LinkButton.propTypes = {
  className: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  wrapperClassName: PropTypes.string,
};

export const PrimaryButtonXL = (props) => (
  <LinkButton {...props} className="px-4 py-2 text-gray-100 bg-gray-700 " />
);

export const PrimaryButtonSM = (props) => (
  <LinkButton
    {...props}
    className="px-2 py-1 text-xs text-gray-100 bg-gray-700"
  />
);

export const SecondaryButtonXL = ({ className="", ...props }) => (
  <LinkButton
    {...props}
    className={`${className} px-4 py-2 text-gray-600 hover:text-gray-100`}
  />
);

export const SecondaryButton = ({className="", ...props}) => (
  <LinkButton
    {...props}
    className={`${className} px-4 py-1 text-sm text-gray-600 hover:text-gray-100`}
  />
);

export const SecondaryButtonSM = (props) => (
  <LinkButton
    {...props}
    className="px-2 py-1 text-xs text-gray-600 hover:text-gray-100 "
  />
);

export const LinkSM = ({ className, label, url }) => (
  <Link href={url}>
    <a
      className={`${className}  text-xs serifSemibold underline hover:text-red text-gray-600`}
    >
      {label}
    </a>
  </Link>
);

// TODO refactor
export const LinkSMRed = ({ className, label, url }) => (
  <Link href={url}>
    <a
      className={`${className}  btn-bg-transition py-1 hover:bg-gray-200 text-xs serifSemibold text-red -ml-2`}
    >
      {label}
    </a>
  </Link>
);
