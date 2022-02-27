// pages/kernbestand/index.js

import Head from "next/head";

import { DEPOTS } from "../../utils/constants";
import { ROUTE_CORESTOCK } from "../../utils/routes";
import { H1 } from "../../components/designSystem";
import {
  CenteredContainer,
  SimpleLink,
} from "../../components/corestock/CoreStockSystem";

/*
 * *** All CoreStock-Front-Page ***
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
          <p className="p-2 my-8 text-lg bg-yellow-500">Vorwärts und rückwärts mit Pfeiltasten</p>
          <ul>
            {/* TODO Preload depots */}
            {DEPOTS.map(({ id }, index) => (
              <li key={index} className="p-4 mb-4 bg-gray-200">
                <SimpleLink url={`${ROUTE_CORESTOCK}/${id}`}>
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