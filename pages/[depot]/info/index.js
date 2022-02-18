// pages/[depot]/info/index.js

import Head from "next/head";
import { H1 } from "../../../components/designSystem";
import {
  DepotCard,
  ROUTE_HOME,
  SimpleLink,
  TwoColumnsContainer,
} from "../../index";

/*
 * *** Info page ***
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
          <SimpleLink url={`${ROUTE_HOME}`}>Zurück alle Werke</SimpleLink>
        </li>
      </ul>
    </div>
  );
};

const RandomDepots = () => {
  return (
    <div className="flex">
      <DepotCard className="mx-2" />
      <DepotCard className="mx-2" />
      <DepotCard className="mx-2" />
      <DepotCard className="mx-2" />
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
        <TwoColumnsContainer className="px-4 my-16">
          <FinalInfo />
          <div></div>
        </TwoColumnsContainer>

        <RandomDepots />
      </main>
    </div>
  );
}
