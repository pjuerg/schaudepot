// pages/[depot]/person/index.js

import Head from "next/head";
import isNil from "ramda/src/isNil";

import { useSWRPersonWithRouter } from "../../../utils/useSWRPersonWithRouter";
import { H1 } from "../../../components/designSystem";
import {
  BigLoading,
  TextContainer,
  TwoColumnsContainer,
  RepresentationImage,
  Textbar,
} from "../../../components/depot/DepotSystem";

/*
 * *** Depot-Person-Page ***
 * - - - - - - - - - - - - - - - -
 */

// TOOD dynamic with structure table
const ArtistInfo = ({ label, id }) => {
  return (
    <TextContainer>
      <H1>{label}</H1>
      <div>id: {id}</div>
      Geburt <br />
      Tod <br />
      Wirkungsorte <br />
    </TextContainer>
  );
};

export default function DepotPersonPage() {
  const transformedPersonData = useSWRPersonWithRouter();

  return (
    <div className="h-screen">
      <Head>
        <title>TODO Künstler</title>
        <meta name="description" content="TODO" />
      </Head>

        {isNil(transformedPersonData) ? (
          <BigLoading />
        ) : (
          <TwoColumnsContainer className="flexCenteredFullScreen">
            <RepresentationImage {...transformedPersonData} className="ml-16" />
            <div>
              <Textbar>Biography Page</Textbar>
              <ArtistInfo {...transformedPersonData} />
            </div>
          </TwoColumnsContainer>
        )}
    </div>
  );
}
