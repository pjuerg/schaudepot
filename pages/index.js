// pages/index.js

import Head from "next/head";

import { ROUTE_DEPOT, DEPOTS } from "../utils/constants";
import { H1 } from "../components/designSystem";
import { CenteredContainer, SimpleLink } from "../components/depot/DepotSystem";

/*
 * *** Depot-Front-Page ***
 * --------------------------
 */

export default function Frontpage() {
  return (
    <div>
      <Head>
        <title>Alle Schaudepots</title>
        <meta name="description" content="DO" />

      </Head>

      <CenteredContainer className="h-screen">
        <div>
          <H1>Alle Schaudepots</H1>
          <ul>
            {/* TODO Preload depots */}
            {DEPOTS.map(({ id }, index) => (
              <li key={index} className="p-4 mb-4 bg-gray-200">
                <SimpleLink url={`${ROUTE_DEPOT}-${id}`}>
                  Schaudepot Person {id}
                </SimpleLink>
              </li>
            ))}
          </ul>
        </div>
      </CenteredContainer>
    </div>
  );
}
