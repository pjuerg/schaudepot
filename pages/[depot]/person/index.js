// pages/[depot]/person/index.js

import Head from "next/head";
import { H1 } from "../../../components/designSystem";
import { CenteredContainer, ROUTE_PETER, SimpleLink } from "../../index";

/*
 * *** Person page ***
 * - - - - - - - - - - - - - - - -
 */

export default function PersonPage() {
  return (
    <div>
      <Head>
        <title>Über den Künstler</title>
        <meta name="description" content="DO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen">
        <CenteredContainer className="h-screen">
          <div>
            <H1>Page Biografie</H1>
            <ul>
              <li></li>
              <li>Bild, ....</li>
              <li>
                <SimpleLink url={`${ROUTE_PETER}/item/some-work-123`}>
                  Page Werk 1
                </SimpleLink>
              </li>
            </ul>
          </div>
        </CenteredContainer>
      </main>
    </div>
  );
}
