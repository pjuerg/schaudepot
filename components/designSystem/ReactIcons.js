// components/designSystem/Icons.js

import React from "react";
import PropTypes from "prop-types";
import { IconContext } from "react-icons";
// import { GiHamburgerMenu } from "react-icons/gi";

// @see https://github.com/react-icons/react-icons/issues/154
// So what is the solution here for tree shaking / reducing bundle size in v4.2.0?
// Upgrading from v2 to v4 increased my bundle size and seems to have broke tree shaking. Using Next.js with Webpack.
// The solution is to install @react-icons/all-files
// Then select individual icons as in:
// import { GrRotateLeft } from '@react-icons/all-files/gr/GrRotateLeft'
//import { GrRotateRight } from '@react-icons/all-files/gr/GrRotateRight'
import { IoResize } from "@react-icons/all-files/io5/IoResize";
import { IoPersonOutline } from "@react-icons/all-files/io5/IoPersonOutline";
import { FaSearch } from "@react-icons/all-files/fa/FaSearch";
import { failIfNotExist } from "rmd-lib-pp/src/failIfNotExists";

/*
 * *** ReactIcons ***
 *  - - - - - -
 */

export const HAMBURGER_MENU_ICON = "hamburgerMenu";
export const PERSON_ICON = "person";
export const EXPAND_ICON = "expand";
export const SEARCH_ICON = "search";

// Dynamic Components - here icons from react-icons
// @see https://stackoverflow.com/questions/29875869/react-jsx-dynamic-component-name
const iconComponents = {
  // hamburgerMenu: GiHamburgerMenu, @remember its just a letter sign
  person: IoPersonOutline,
  expand: IoResize,
  search: FaSearch,
};

/* *** example context value ***

 * const linkedinContextValue = {
 * color: "rgb(189, 189, 189)",
 * size: "30px",
 * style: { verticalAlign: "middle" },
 * }
 *
 * param id: constante
 */

export const ReactIcon = ({ id, contextValue = {} }) => {
  const Icon = iconComponents[id];

  failIfNotExist(
    Icon,
    `in icons/icons.js: Did not find an apropriate Icon in react-icons ${id}`
  );
  return (
    <IconContext.Provider value={contextValue}>
      <Icon />
    </IconContext.Provider>
  );
};
ReactIcon.propTypes = {
  id: PropTypes.string.isRequired,
  contextValue: PropTypes.object,
};

// const linkedinContextValue = {
//   color: "rgb(22, 22, 22)",
//   size: "30px",
//   style: { verticalAlign: "middle" },
// };

// const LinkedIcon = ({ to, children, className = "" }) => (
//   <a className={className} href={to}>
//     {children}
//   </a>
// );
