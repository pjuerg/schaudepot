// pages/[depot]/index.js

import Head from "next/head";

import isNil from "ramda/src/isNil";

import { useSWRPersonWithRouter } from "../../utils/useSWRPersonWithRouter";
import {  ROUTE_DEPOT } from "../../utils/constants";
import { H1 } from "../../components/designSystem";
import {
  ArtistImageContainer,
  SimpleLink,
  TextContainer,
  TwoColumnsContainer,
  BigLoading,
} from "../../components/depotSystem";


/*
 * *** Cover index page ***
 * - - - - - - - - - - - - - - - -
 */

const DepotInfo = ({label}) => {
  return (
    <TextContainer className="mt-48">
      <H1>{label}</H1>
      <H1>Kerndepot</H1>
    </TextContainer>
  );
};


export default function Coverpage() {
  const transformedPersonData = useSWRPersonWithRouter()

  // console.log(`transformed person`);
  // console.log(transformedPersonData);

  return (
    <div>
      <Head>
        <title>front</title>
        <meta name="description" content="Todo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {isNil(transformedPersonData) ? (
          <BigLoading />
        ) : (
          <TwoColumnsContainer>
            <DepotInfo {...transformedPersonData} />
            <ArtistImageContainer />
          </TwoColumnsContainer>
        )}
      </main>
    </div>
  );
}
