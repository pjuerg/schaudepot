// pages/[depot]/index.js

import Head from "next/head";
import { useRouter } from "next/router";
import { is, isNil, prop } from "ramda";
import useSWR from "swr";
import { compose, last, split } from "ramda";
import { H1 } from "../../components/designSystem";
import {
  ArtistImageContainer,
  ROUTE_PETER,
  SimpleLink,
  TextContainer,
  TwoColumnsContainer,
} from "../index";
import { castToInt } from "../../utils/utilsRamda";
import { ROUTE_DEPOT } from "../../utils/constants";
import { fetcher } from "../../utils/fetcher";

/*
 * *** Cover index page ***
 * - - - - - - - - - - - - - - - -
 */

const DepotInfo = () => {
  return (
    <TextContainer>
      <H1>Peter Schmidt</H1>
      <H1>Kerndepot</H1>
      <SimpleLink url={`${ROUTE_PETER}/person`}>Page Biographie</SimpleLink>
    </TextContainer>
  );
};

const BigLoading = () => <div className="text-3xl">Loading ...</div>;
export const splitId = compose(last, split("-"));

export default function Coverpage() {
  const personId = compose(castToInt, splitId, prop("asPath"))(useRouter());

  const { data } = useSWR(
    is(Number, personId) ? `${ROUTE_DEPOT}${personId}` : null,
    fetcher
  );

  console.log(personId);
  console.log(data);

  return (
    <div>
      <Head>
        <title>front</title>
        <meta name="description" content="Todo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <TwoColumnsContainer>
          {isNil(data) ? (
            <BigLoading />
          ) : (
            <>
              <DepotInfo />
              <ArtistImageContainer />
            </>
          )}
        </TwoColumnsContainer>
      </main>
    </div>
  );
}
