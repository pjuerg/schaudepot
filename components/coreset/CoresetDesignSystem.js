// components/coreset/CoresetDesignSystem.js

import PropTypes from "prop-types";
import Link from "next/link";

import {
  getPreviewImage,
  getRepresentationCopyright,
  getRepresentationCreator,
  getRepresentationLegend,
  hasAnyRepresentationInfo,
} from "../../utils/utilsImage";
import { ROUTE_CORESET } from "../../utils/routes";
import { LinkedArtImage } from "../linkedartimage";

/*
 * *** CoresetDesignSystem  **
 * --------------------------
 *
 * Components for Coreset
 */

// export const SecondaryButtonButton = ({ className = "", ...props }) => {
//   return (
//     <button
//       {...props}
//       className={`${className} px-4 py-2 text-gray-100 bg-gray-700  inline-flex rounded-sm items-center transition-colors duration-200 ease-in serifSemibold border border-gray-600 hover:bg-red hover:border-red`}
//     >
//       Weiterlesen
//     </button>
//   );
// };

export const BigLoading = ({ className = "mt-64" }) => (
  <div className={`${className} text-3xl`}>Loading ...</div>
);

export const RepresentationPortraitImage = ({ representation }) => {
  const imgData = representation[0];
  return (
    <div className="flex flex-col items-center justify-center h-full ">
      <LinkedArtImage
        {...getPreviewImage(representation)}
        className="linkedArtImg--slidePortrait"
        lazy="eager"
        showLoading={true}
      />
      {hasAnyRepresentationInfo(imgData) && (
        <div>
          <div>{getRepresentationLegend(imgData)}</div>
          <div className="text-sm">{getRepresentationCreator(imgData)}</div>
          <div className="text-sm">{getRepresentationCopyright(imgData)}</div>
        </div>
      )}
    </div>
  );
};

export const CoresetCards = ({ className, coresets}) => {
  return (
    <div className={`${className} flex`}>
      {coresets.map(({ id }, index) => (
        <Link key={index} href={`${ROUTE_CORESET}/${id}`}>
          <a>
            <CoresetCard className="mx-2" personId={id} />
          </a>
        </Link>
      ))}
    </div>
  );
};

const CoresetCard = ({ className = "", personId }) => {
  return (
    <div
      className={`${className} flex items-center justify-center w-32 h-32 bg-gray-700 text-lg text-gray-100`}
    >
      Schaudepot
      <br /> Artist {personId}
    </div>
  );
};

export const CenteredContainer = ({ className = "", children }) => (
  <div className={`${className} flex justify-center items-center`}>
    {children}
  </div>
);

export const TwoColumnsContainer = ({ className = "", children }) => {
  return (
    <div className={`${className} flex`}>
      <div className="w-1/2 h-full ">{children[0]}</div>
      <div className="w-1/2 h-full ">{children[1]}</div>
    </div>
  );
};
TwoColumnsContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.array.isRequired,
};

export const ThreeColumnsContainer = ({ className = "", children }) => {
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
  return <div className={`${className} px-8 pt-20 pb-10`}>{children}</div>;
};
