// pages/kernbestand/[cover].js

import Head from "next/head";

import isNil from "ramda/src/isNil";

import { useSWRCoreStockPerson } from "../../utils/useSWRCoreStockPerson";
import { H1 } from "../../components/designSystem";
import {
  TextContainer,
  TwoColumnsContainer,
  BigLoading,
  RepresentationImage,
  Textbar,
} from "../../components/corestock/CoreStockSystem";

/*
 * *** CoreStocl-Cover-Page ***
 * - - - - - - - - - - - - - - - -
 */

export default function CoreStockCoverPage() {
  const transformedPersonData = useSWRCoreStockPerson();

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
