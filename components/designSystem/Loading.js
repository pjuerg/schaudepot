// components/designSystem/Loading.js

import PropTypes from "prop-types";
import LoadingSpin from "../../assets/loading.svg";

/*
 *  *** Loading  ***
 * -----------------
 *
 */


export const Loading = ({ className="", hasLabel = true }) => {
  return (
  <div
    className={`${className} flex items-center serifSemibold text-xs  text-gray-400`}
  >
    {hasLabel && <div>Laden...</div>}
    <div>
      <LoadingSpin />
    </div>
  </div>
)};
Loading.propTypes = {
  className: PropTypes.string,
  hasLabel: PropTypes.bool,
};

export const Error = ({ errorText }) => (
  <div className="my-32 text-center text-red">Error: { errorText} 😢</div>
);
Error.propTypes = {
  errorText: PropTypes.string.isRequired,
};

export const SWRPageLoading = ({ isLoading, hasError, ...props }) => (
  <>
    {isLoading && (
      <div >
        <Loading {...props} />
      </div>
    )}
    {hasError && (
      <div >
        <Error {...props} />;
      </div>
    )}
  </>
);
SWRPageLoading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  errorText: PropTypes.string.isRequired,
  className: PropTypes.string,
  hasLabel: PropTypes.bool,
};
