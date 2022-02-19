// pages/[depot]/person/index.js

import Head from "next/head";
import { head, prop } from "ramda";
import compose from "ramda/src/compose";
import isNil from "ramda/src/isNil";
import { maybe } from "rmd-lib-pp/src/maybe";

import { ROUTE_DEPOT } from "../../../utils/constants";
import { userSWRDepotWithRouter } from "../../../utils/useSWRDepotWithRouter";
import { useSWRPersonWithRouter } from "../../../utils/useSWRPersonWithRouter";
import { transformPhysicalObject } from "../../../values/physicalObject";
import { H1 } from "../../../components/designSystem";
import {
  BigLoading, 
  ArtistImageContainer,
  SimpleLink,
  TextContainer,
  TwoColumnsContainer,

} from "../../../components/depotSystem";

/*
 * *** Person index page ***
 * - - - - - - - - - - - - - - - -
 */

const ArtistInfo = ({ label, id }) => {
  return (
    <TextContainer>
      <H1>{label}</H1>
      Geburt <br />
      Tod <br />
      Wirkungsorte <br />
    </TextContainer>
  );
};

const firstIdFromDepot = compose(prop('id'),transformPhysicalObject, head);

export default function PersonPage() {
  const transformedPersonData = useSWRPersonWithRouter();
  const depotData = userSWRDepotWithRouter()
  const itemId = maybe(firstIdFromDepot)(depotData);

  return (
    <div>
      <Head>
        <title>Über den Künstler</title>
        <meta name="description" content="DO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen">
        {isNil(transformedPersonData) ? (
          <BigLoading />
        ) : (
          <TwoColumnsContainer>
            <ArtistImageContainer {...transformedPersonData} />
            <div>
              <ArtistInfo {...transformedPersonData} />
            </div>
          </TwoColumnsContainer>
        )}
      </main>
    </div>
  );
}
