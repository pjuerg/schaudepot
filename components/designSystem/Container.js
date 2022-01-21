// components/designSystem/Container.js

import PropTypes from "prop-types";


/*
 * *** Container  ***
 * --------------------------
 *
 */

export const FullWidthContainer = ({ className = "px-4", children }) => (
  <div
    className={`${className}  border-white md:border-l-[1rem] md:border-r-[1rem] `}
  >
    {children}
  </div>
);
FullWidthContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
};

export const OneColumnContainer = ({ className, children }) => (
  <div
    className={`${className} w-full max-w-screen-xl mx-auto px-2 md:px-40 lg:px-56`}
  >
    {children}
  </div>
);
OneColumnContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
};

export const SidebarContainer = ({ className = "", children }) => {
  const [sidebar, main] = children;
  return (
    <FullWidthContainer
      className={`${className} px-4 bg-gray-200`}
    >
      <div className="flex max-w-screen-xl mx-auto">
        <div className={`hidden  md:block md:flex-none md:w-40 lg:w-56`}>
          {sidebar}
        </div>
        <div className="w-full lg:pl-4 ">{main}</div>
      </div>
    </FullWidthContainer>
  );
};
SidebarContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.array.isRequired,
};

export const GalleryListContainer = ({ className, children }) => (
  <ul
    className={`${className} grid grid-cols-2 py-16 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-2 gap-y-2 md:gap-x-8 md:gap-y-8 xl:gap-x-12 xl:gap-y-12 2xl:gap-x-14 2xl:gap-y-14`}
  >
    {children}
  </ul>
);
GalleryListContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any.isRequired,
};
