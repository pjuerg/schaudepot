// components/coreset/SlideFactory.js
import PropTypes from "prop-types";
import React from "react";

import test from "ramda/src/test";

/*
 * *** SlideFactory***
 * ------------------- 
 */

const regExCoverPage = /\/kernbestand\/\d+$/g;
const testCover = test(regExCoverPage);
const regExIntroPage = /\/kernbestand\/\d+\/intro$/;
const testIntro = test(regExIntroPage);
const regExItemPage = /\/kernbestand\/\d+\/item\/\d+$/;
const testItem = test(regExItemPage);
const regExAddendumPage = /\/kernbestand\/\d+\/addendum$/;
const testAddendum = test(regExAddendumPage);


/**
 * Abstraction for  
 * @see CoresetItemsMenu
 * @see [...slides]
 * @remember cloneElement to pass the path-property
 */
export const SlideFactory = ({ components, ...props  }) => {
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
        [...slides] SlideFactory match to router path
        <br />
        {path}
      </p>
    );
  }
};
SlideFactory.propTypes = {
  //
  path: PropTypes.string.isRequired,
  ///
  components: PropTypes.object.isRequired,
};