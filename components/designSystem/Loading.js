// components/designSystem/Loading.js

import PropTypes from "prop-types";
import { Error404Block } from "../error404block";
import LoadingSpin from "../../assets/loading.svg";

/*
 *  *** Loading  ***
 * -----------------
 *
 */

export const Loading = ({ className = "", hasLabel = true }) => {
  return (
    <div
      className={`${className} flex items-center serifSemibold text-xs  text-gray-400`}
    >
      {hasLabel && <div>Laden...</div>}
      <div>
        <LoadingSpin />
      </div>
    </div>
  );
};
Loading.propTypes = {
  className: PropTypes.string,
  hasLabel: PropTypes.bool,
};

export const Error = ({ errorText }) => (
  <div className="my-32 text-center text-red">Error: {errorText} 😢</div>
);
Error.propTypes = {
  errorText: PropTypes.string.isRequired,
};

export const SWRPageLoading = ({ isLoading, hasError, errorText, ...props }) => (
  <>
    {isLoading && (
      <div>
        <Loading {...props} />
      </div>
    )}
    {/* wether custum error text with prop errorText="fooo" */}
    {hasError && errorText && (
      <div>
        <Error {...props} errorText={errorText} />
      </div>
    )}
    {/* or show page does not exist / 404.
      @remember this is for the [item].js and [person].js, when a false url is loaded like /item/234jsdf
    */}
    {hasError && !errorText && <Error404Block />}
  </>
);
SWRPageLoading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  errorText: PropTypes.string,
  className: PropTypes.string,
  hasLabel: PropTypes.bool,
};
