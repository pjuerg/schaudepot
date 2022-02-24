// pages/index.js

import Head from "next/head";

// import { DEPOTS } from "../utils/constants";
// import { ROUTE_DEPOT } from "../utils/routes";
import { H1 } from "../components/designSystem";
import { CenteredContainer, SimpleLink } from "../components/depot/DepotSystem";
import { ROUTE_DEPOT } from "../utils/routes";

/*
 * *** Depot-Front-Page ***
 * --------------------------
 */

export default function Frontpage() {
  return (
    <div>
      <Head>
        <title>From Somewhere</title>
        <meta name="description" content="DO" />
      </Head>

      <CenteredContainer className="h-screen">
        <div>
          <H1>Frontpage werkdatenbank</H1>
          <SimpleLink url={`${ROUTE_DEPOT}`}>Menüeintrag Schaudepots</SimpleLink>
        </div>
      </CenteredContainer>
    </div>
  );
}
