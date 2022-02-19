import PropTypes from "prop-types";
import Link from "next/link";

/*
 * *** DepotSystem  ***
 * --------------------------
 *
 * Components for depot
 *  
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

export const BigLoading = () => <div className="text-3xl">Loading ...</div>;

export const ArtistImage = () => {
  return (
    <figure>
      <div className="flex items-center justify-center w-64 bg-yellow-200 h-96">
        hello image
      </div>
      <figcaption className="italic">some nice infos here</figcaption>
    </figure>
  );
};

export const DepotCard = ({ className = "", personId }) => {
  return (
    <div
      className={`${className} flex items-center justify-center w-64 h-64 bg-yellow-200`}
    >
      Hello Depotcard<br /> Artist {personId}
    </div>
  );
};

export const ArtistImageContainer = () => {
  return (
    <div>
      <CenteredContainer className="">
        <ArtistImage />
      </CenteredContainer>
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
      <div className="w-1/2">{children[0]}</div>
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
