// components/coreset/Container.js

import PropTypes from "prop-types";

/*
 * *** Container  **
 * ------------------
 */


const classNameClms = "md:w-1/2 h-full pb-8 md:pb-0  md:h-full ";

export const TwoClmsImgTextContainer = ({ className = "", isDistractionMode, children }) => {
  return (
    <div className={`${isDistractionMode ? "pt-16 pb-8" :""} ${className} flex flex-col md:flex-row md:h-full`}>
      <div className={`${classNameClms} order-2 md:order-1  `}>
        {children[0]}
      </div>
      <div
        className={`${classNameClms} order-1 md:order-2 md:w-1/2 mt-16 md:mt-0 `}
      >
        {children[1]}
      </div>
    </div>
  );
};

export const TwoColumnsContainer = ({
  className = "",
  classNameFirstClm = "md:w-1/2 md:h-full",
  classNameSecondClm = "md:w-1/2 md:h-full",
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