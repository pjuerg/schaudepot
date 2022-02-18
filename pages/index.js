// pages/index.js

import PropTypes from "prop-types";
import Head from "next/head";
import Link from "next/link";
import { H1 } from "../components/designSystem";

/*
 * *** Depot index page   ***
 * --------------------------
 */

const DEPOTS = [
  {
    id: 15,
  },
  {
    id: 16,
  },
  {
    id: 10,
  },
];

export const ROUTE_PETER = "/peter-Schmidt-23";
export const ROUTE_DEPOT_PREFIX = "/depot-";
export const ROUTE_HOME = "/";

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

export const DepotCard = ({ className = "" }) => {
  return (
    <div
      className={`${className} flex items-center justify-center w-64 h-64 bg-yellow-200`}
    >
      Hello Depotcard
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

export const SimpleLink = ({ className = "mt-4", url, children }) => (
  <Link href={url}>
    <a
      className={`${className} inline-block text-3xl text-red hover:underline`}
    >
      {children}
    </a>
  </Link>
);


export default function Frontpage() {
  return (
    <div>
      <Head>
        <title>Alle Schaudepots</title>
        <meta name="description" content="DO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <CenteredContainer className="h-screen">
          <div>
            <H1>Alle Schaudepots</H1>
            <ul>
              {DEPOTS.map(({ id }, index) => (
                <li key={index} className="p-4 mb-4 bg-gray-200">
                  <SimpleLink url={`${ROUTE_DEPOT_PREFIX}${id}`}>
                    Schaudepot Person {id}
                  </SimpleLink>
                </li>
              ))}
            </ul>
          </div>
        </CenteredContainer>
      </main>
    </div>
  );
}
