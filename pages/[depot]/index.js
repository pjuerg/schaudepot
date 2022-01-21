// pages/[depot]/index.js

import Head from "next/head";
import { H1 } from "../../components/designSystem";
import { CenteredContainer, ROUTE_PETER, SimpleLink } from "../index";


/*
 * *** Cover index page ***
 * - - - - - - - - - - - - - - - -
 */

export default function Coverpage() {
  return (
    <div>
      <Head>
        <title>front</title>
        <meta name="description" content="DO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <CenteredContainer className="h-screen">
          <div>
            <H1>Cover Information here</H1>
            <ul>
              <li>nice artist image </li>
              <li>title etc</li>
              <li ><SimpleLink url={`${ROUTE_PETER}/person`}>Page Biographie</SimpleLink></li>
            </ul>
          </div>
        </CenteredContainer>
      </main>
    </div>
  );
}
