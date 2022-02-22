// pages/[depot]/info/index.js

import Head from "next/head";

import { DEPOTS, ROUTE_HOME } from "../../../utils/constants";
import {
  CenteredContainer,
  DepotCards,
  SimpleLink,
  Textbar,
} from "../../../components/depot";

/*
 * *** Depot-Info-Page ***
 * - - - - - - - - - - - - - - - -
 */

export default function DepotInfoPage() {
  return (
    <div>
      <Head>
        <title>TODO More info</title>
        <meta name="description" content="TODO" />
      </Head>

      <CenteredContainer className="mt-48">
        <div>
          <div>
            <Textbar>Last Page</Textbar>
            <ul>
              <li className="font-bold">Abschlussinformation, ....?</li>
              <li>Webseite</li>
              <li>Kontakt</li>
              <li>Link in die DB</li>
              <li>
                <SimpleLink className="my-16" url={`${ROUTE_HOME}`}>
                  Startseite
                </SimpleLink>
              </li>
            </ul>
          </div>
          <DepotCards depots={DEPOTS} />
        </div>
      </CenteredContainer>
    </div>
  );
}
