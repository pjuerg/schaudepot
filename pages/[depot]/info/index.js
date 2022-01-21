// pages/[depot]/info/index.js

import Head from "next/head";
import { H1 } from "../../../components/designSystem";
import { CenteredContainer, ROUTE_HOME, SimpleLink } from "../../index";

/*
 * *** Info page ***
 * - - - - - - - - - - - - - - - -
 */

export default function Infopage() {
  return (
    <div>
      <Head>
        <title>More info</title>
        <meta name="description" content="TODO" />
      </Head>

      <main >
        <CenteredContainer className="h-screen">
          <div>
            <H1>Abschluss / More Info</H1>
            <ul>
              <li>ENDE</li>
              <li>wichtigste Info Webseite, ....?</li>
              <li>Random some Schaudepots</li>
              <li>
                <SimpleLink url={`${ROUTE_HOME}`}>Zurück alle Werke</SimpleLink>
              </li>
            </ul>
          </div>
        </CenteredContainer>
      </main>
    </div>
  );
}