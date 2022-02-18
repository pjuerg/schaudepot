// pages/[depot]/person/index.js

import Head from "next/head";
import { H1 } from "../../../components/designSystem";
import { ArtistImageContainer, ROUTE_PETER, SimpleLink, TextContainer, TwoColumnsContainer } from "../../index";

/*
 * *** Person page ***
 * - - - - - - - - - - - - - - - -
 */


const ArtistInfo = () => {
  return (
    <TextContainer>
      <H1>Peter Schmidt</H1>
      Geburt <br />
      Tod <br />
      Wirkungsorte < br/>
      
      <SimpleLink url={`${ROUTE_PETER}/item/some-work-123`}>Page Work</SimpleLink>
    </TextContainer>
  );
};

export default function PersonPage() {
  return (
    <div>
      <Head>
        <title>Über den Künstler</title>
        <meta name="description" content="DO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen">
        <TwoColumnsContainer>
          <ArtistImageContainer />
          <ArtistInfo />
        </TwoColumnsContainer>
      </main>
    </div>
  );
}
