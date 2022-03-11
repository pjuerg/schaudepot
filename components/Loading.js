// components/designSystem/Loading.js

import PropTypes from "prop-types";
import LoadingSpin from "../assets/loading.svg";

/*
 *  *** Loading  ***
 * -----------------
 *
 */


const Error404Block = () => (
  <div className="flex items-center justify-center h-[60vh]">
    <div className="max-w-lg">
      <h1>
        Fehler 404{" "}
        <span className="px-2 font-bold bg-yellow-600">
          URL existiert nicht
        </span>{" "}
      </h1>
      <p className="text-lg">
        Bitte überprüfen Sie die URL in ihrem Webbrowser. Dieser Link existiert
        nicht mehr. Die Ursache kann ein veralterter Link oder Bookmarkeintrag
        sein.
      </p>
    </div>
  </div>
);


export const Loading = ({ className = "", hasLabel = true }) => {
  return (
    <div
      className={`${className} flex items-center text-xs  text-gray-600`}
    >
      {hasLabel && <div className="pr-3">Laden...</div>}
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
