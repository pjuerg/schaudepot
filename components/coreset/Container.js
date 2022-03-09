// components/coreset/Container.js

import PropTypes from "prop-types";

/*
 * *** Container  **
 * ------------------
 */


export const TwoColumnsContainer = ({
  className = "",
  classNameFirstClm = "w-1/2 h-full",
  classNameSecondClm = "w-1/2 h-full",
  children,
}) => {
  return (
    <div className={`${className} flex`}>
      <div className={`${classNameFirstClm} `}>{children[0]}</div>
      <div className={`${classNameSecondClm} `}>{children[1]}</div>
    </div>
  );
};
TwoColumnsContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.array.isRequired,
};

export const ThreeColumnsContainer = ({
  className = "",
  children,
}) => {
  return (
    <div className={`${className} flex`}>
      <div className="w-1/3 ">{children[0]}</div>
      <div className="w-1/3 ">{children[1]}</div>
      <div className="w-1/3 ">{children[2]}</div>
    </div>
  );
};
TwoColumnsContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.array.isRequired,
};

export const TextContainer = ({ className = "", children }) => {
  return <div className={`${className}`}>{children}</div>;
};