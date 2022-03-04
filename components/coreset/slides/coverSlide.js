// components/coreset/slides/cover.js

import useSWR from "swr";

import  head  from "ramda/src/head";
import { fetcher } from "../../../libs/fetcher";

import { apiSite } from "../../../utils/api";
import { ATTRIBUTED_BY, LINK_PERSON_PAGE } from "../../../utils/constants";
import { useSWRCoresetPerson } from "../../../utils/useSWRCoresetPerson";
import { removeEmptySectionsAndAddMissingLabels } from "../../../values/structureHelper";
import { FieldsFactory } from "../FieldsFactory";
import {
  TextContainer,
  TwoColumnsContainer,
  RepresentationPortraitImage,
} from "../CoresetDesignSystem";
/*
 * *** Cover Slide  ***
 * ---------------------
 * @remember all loadind in central page [...slides].js
 */

const coverFields = [
  { key: LINK_PERSON_PAGE, label: "in der Werkdatenbank" },
  { key: ATTRIBUTED_BY },
];

const fieldStructure = [{ fields: coverFields }];



export const CoverSlide = () => {
  const personData = useSWRCoresetPerson();
  const { data: dataSite } = useSWR(apiSite(), fetcher);

  const cleandFieldStructure = removeEmptySectionsAndAddMissingLabels(
    "person",
    dataSite,
    fieldStructure,
    personData
  );

  return (
    <TwoColumnsContainer className="h-full">
      
      <RepresentationPortraitImage {...personData} />

      <TextContainer>
        <h1 className="pb-8 text-3xl font-bold lg:text-4xl">
          {personData.label}
          <br />
          <span className="font-normal">Kernbestand</span>
        </h1>
        <p className="pb-4 text-2xl">
          14 Grafiken, 13 Collagen und 4 Zeichnungen stellen den Kernbestand im
          Nachlas ....
        </p>
        <p className="pb-16 text-2xl">
          In diesen Schaudepo ... kurzer Text zur Idee dieses Schaudepots, kann
          generisch sein Lorem ipsum dolor sit amet, consetetur sadipscing.
        </p>
        <h3 className="pb-3 text-sm text-gray-600">
          Weitere Information finden Sie
        </h3>
        <FieldsFactory data={personData} {...head(cleandFieldStructure)} />
      </TextContainer>
    </TwoColumnsContainer>
  );
};
