// pages/[depot]/info/index.js

import Head from "next/head";

import { DEPOTS, ROUTE_DEPOT, ROUTE_HOME } from "../../../utils/constants";
import { H1 } from "../../../components/designSystem";
import {
  DepotCard,
  SimpleLink,
  TwoColumnsContainer,
} from "../../../components/depotSystem";
/*
 * *** Info index page ***
 * - - - - - - - - - - - - - - - -
 */

const FinalInfo = () => {
  return (
    <div>
      <H1>Abschluss / More Info</H1>
      <ul>
        <li>E N D E </li>
        <li>wichtigste Info Webseite, ....?</li>
        <li>
          <SimpleLink className="my-16" url={`${ROUTE_HOME}`}>
            Startseute
          </SimpleLink>
        </li>
      </ul>
    </div>
  );
};

const RandomDepots = () => {
  return (
    <div className="flex">
      {DEPOTS.map(({ id }, index) => (
        <SimpleLink key={index} url={`${ROUTE_DEPOT}-${id}`}>
          <DepotCard className="mx-2" personId={id}/>
        </SimpleLink>
      ))}
    </div>
  );
};

export default function Infopage() {
  return (
    <div>
      <Head>
        <title>More info</title>
        <meta name="description" content="TODO" />
      </Head>

      <main>
        <TwoColumnsContainer className="px-4 mt-48">
          <FinalInfo />
          <div></div>
        </TwoColumnsContainer>

        <RandomDepots />
      </main>
    </div>
  );
}
