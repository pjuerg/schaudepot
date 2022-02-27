// pages/index.js

import Head from "next/head";

import { H1 } from "../components/designSystem";
import { CenteredContainer, SimpleLink } from "../components/corestock/CoreStockSystem";
import { ROUTE_CORESTOCK } from "../utils/routes";

/*
 * ** CoreStock-Front-Page ***
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
          <SimpleLink url={`${ROUTE_CORESTOCK}`}>Menüeintrag Schaudepots</SimpleLink>
        </div>
      </CenteredContainer>
    </div>
  );
}
