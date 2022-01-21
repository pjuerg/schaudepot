// components/designSystem/Elements.js

import PropTypes from "prop-types";
import { EXPAND_ICON, ReactIcon } from "./ReactIcons";

/*
 *  *** Elements  ***
 * -----------------
 *
 */

// *** export headers ***

export const H1 = ({ pb = "pb-4 ", children }) => (
  <h1 className={`${pb} font-normal text-3xl`}>{children}</h1>
);
H1.propTypes = {
  pb: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export const H1bold = ({ pb = "pb-4", children }) => (
  <h1 className={`${pb} font-bold text-3xl`}>{children}</h1>
);
H1bold.propTypes = {
  pb: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export const H2Large = ({ pb = "pb-4", children }) => (
  <h2 className={`${pb} text-2xl lg:text-3xl serifMedium`}>{children}</h2>
);
H2Large.propTypes = {
  pb: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export const H2 = ({ pb = "pb-4", children }) => (
  <h2 className={`${pb} text-2xl serifSemibold`}>{children}</h2>
);
H2.propTypes = {
  pb: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export const IconSign = ({ sign, className }) => (
  <span className={className} dangerouslySetInnerHTML={{ __html: sign }} />
);

export const IkonScale = () => (
  <div className="linkedArtImg-icon">
    <ReactIcon id={EXPAND_ICON} />
  </div>
);

export const ThumbnailCaption = ({ children }) => (
  <figcaption className="pt-2 px-1.5 text-sm">{children}</figcaption>
);
ThumbnailCaption.propTypes = {
  children: PropTypes.node,
};
