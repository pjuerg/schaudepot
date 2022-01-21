// pages/[depot]/item/[item].js

import Head from "next/head";
import { H1 } from "../../../components/designSystem";
import { CenteredContainer, ROUTE_PETER, SimpleLink } from "../../index";

/*
 * *** Item page ***
 * - - - - - - - - - - - - - - - -
 */

export default function Itempage() {
  return (
    <div>
      <Head>
        <title>Werke Page</title>
        <meta name="description" content="TODO" />
      </Head>

      <main >
        <CenteredContainer className="h-screen">
          <div>
            <H1>Werk Page</H1>
            <ul>
              <li>Item page </li>
              <li>title etc</li>
              <li>
                <SimpleLink url={`${ROUTE_PETER}/info/`}>
                  Page More Info / Ende
                </SimpleLink>
              </li>
            </ul>
          </div>
        </CenteredContainer>
      </main>
    </div>
  );
}
