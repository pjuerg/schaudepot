// pages/depot/index.js

import Head from "next/head";

import isNil from "ramda/src/isNil";

import { useSWRDepotPerson } from "../../utils/useSWRDepotPerson";
import { H1 } from "../../components/designSystem";
import {
  TextContainer,
  TwoColumnsContainer,
  BigLoading,
  RepresentationImage,
  Textbar,
} from "../../components/depot/DepotSystem";

/*
 * *** Depot-Cover-Page ***
 * - - - - - - - - - - - - - - - -
 */

export default function DepotCoverPage() {

  const transformedPersonData = useSWRDepotPerson();

  // console.log(`transformed person`);
  // console.log(transformedPersonData);

  return (
    <div>
      <Head>
        <title>front</title>
        <meta name="description" content="Todo" />
      </Head>

      {isNil(transformedPersonData) ? (
        <BigLoading />
      ) : (
        <TwoColumnsContainer className="flexCenteredFullScreen">
          <TextContainer>
            <Textbar>Schaudepot Cover Page</Textbar>
            <H1>{transformedPersonData.label}</H1>
            <H1>Kerndepot</H1>
          </TextContainer>
          <RepresentationImage {...transformedPersonData} />
        </TwoColumnsContainer>
      )}
    </div>
  );
}
