// pages/index.js

import Head from "next/head";
import Link from "next/link";


import { CenteredContainer } from "../components/coreset/CoresetDesignSystem";
import { ROUTE_CORESET } from "../utils/routes";

/*
 * ** Coreset-Front-Page ***
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
          <h1>Frontpage werkdatenbank</h1>
          <Link href={`${ROUTE_CORESET}`}><a>Menüeintrag Schaudepots</a></Link>

        </div>
      </CenteredContainer>
    </div>
  );
}
