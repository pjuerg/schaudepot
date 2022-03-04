// components/coreset/CoresetComponentFactory.js
import PropTypes from "prop-types";
import React from "react";

import test from "ramda/src/test";

/*
 * *** CoresetComponentFactory  ***
 * -------------------------------- 
 */

const regExCoverPage = /\/kernbestand\/\d+$/g;
const testCover = test(regExCoverPage);
const regExIntroPage = /\/kernbestand\/\d+\/intro$/;
const testIntro = test(regExIntroPage);
const regExItemPage = /\/kernbestand\/\d+\/item\/\d+$/;
const testItem = test(regExItemPage);
const regExAddendumPage = /\/kernbestand\/\d+\/addendum$/;
const testAddendum = test(regExAddendumPage);

export const CoresetComponentFactory = ({ components, ...props  }) => {
  const {path} = props;
  
  if (testCover(path)) {
    return React.cloneElement(components.cover, props);
  } else if (testIntro(path)) {
    return React.cloneElement(components.intro, props );
  } else if (testItem(path)) {
    return React.cloneElement(components.item, props );
  } else if (testAddendum(path)) {
    return React.cloneElement(components.addendum, props );
  } else {
    return (
      <p className="mt-64 text-2xl text-center text-red">
        [...slides] CoresetComponentFactory match to router path
        <br />
        {path}
      </p>
    );
  }
};
CoresetComponentFactory.propTypes = {
  path: PropTypes.string.isRequired,
  components: PropTypes.any,
};