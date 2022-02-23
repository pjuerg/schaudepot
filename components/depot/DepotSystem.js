import PropTypes from "prop-types";
import Link from "next/link";
import { getPreviewImage } from "../../utils/utilsImage";
import { ROUTE_DEPOT } from "../../utils/routes";

/*
 * *** DepotSystem  ***
 * --------------------------
 *
 * Components for depot
 */

export const SimpleLink = ({ className = "mt-4", url, children }) => (
  <Link href={url}>
    <a
      className={`${className} inline-block text-3xl text-red hover:underline`}
    >
      {children}
    </a>
  </Link>
);

export const Textbar = ({ children }) => (
  <p className="inline-block px-4 py-2 mb-16 text-xl text-white bg-gray-800 serifSemibold">
    {children}
  </p>
);

export const BigLoading = () => <div className="text-3xl">Loading ...</div>;

export const RepresentationImage = ({ className = "", representation }) => {
  const { alt, src } = getPreviewImage(representation);

  return (
    <figure className={`${className}`}>
      <div className="flex items-center justify-center w-64 h-96">
        <img src={`${src}`} alt=""/>
      </div>
      <figcaption className="italic">{alt}</figcaption>
    </figure>
  );
};

export const DepotCards = ({ depots }) => {
  return (
    <div className="flex">
      {depots.map(({ id }, index) => (
        <SimpleLink key={index} url={`${ROUTE_DEPOT}-${id}`}>
          <DepotCard className="mx-2" personId={id} />
        </SimpleLink>
      ))}
    </div>
  );
};

const DepotCard = ({ className = "", personId }) => {
  return (
    <div
      className={`${className} flex items-center justify-center w-64 h-64 bg-gray-200`}
    >
      Schaudepot
      <br /> Artist {personId}
    </div>
  );
};

// const ThreeColumnsContainer = ({ className, children }) => {
//   return (
//     <div className={`${className} flex px-4`}>
//       <div className="w-1/3">{children[0]}</div>
//       <div className="w-1/3">{children[1]}</div>
//       <div className="w-1/3">{children[2]}</div>
//     </div>
//   );
// };
// ThreeColumnsContainer.propTypes = {
//   className: PropTypes.string,
//   children: PropTypes.array.isRequired,
// };

export const CenteredContainer = ({ className = "", children }) => (
  <div className={`${className} flex justify-center items-center`}>
    {children}
  </div>
);

export const TwoColumnsContainer = ({ className = "", children }) => {
  return (
    <div className={`${className} flex`}>
      <div className="w-1/2 ">{children[0]}</div>
      <div className="w-1/2">{children[1]}</div>
    </div>
  );
};
TwoColumnsContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.array.isRequired,
};

export const TextContainer = ({ className = "", children }) => {
  return <div className={`${className} px-8 mt-16`}>{children}</div>;
};
