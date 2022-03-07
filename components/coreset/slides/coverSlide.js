// components/coreset/slides/cover.js

import head from "ramda/src/head";

import { ATTRIBUTED_BY, LINK_PERSON_PAGE } from "../../../values/constants";
import { useSWRCoresetPersonAndStructure } from "../../../utils/useSWRCoresetPerson";
import { FieldsFactory } from "../FieldsFactory";
import {
  TextContainer,
  TwoColumnsContainer,
} from "../Container";
import { RepresentationPortraitImage } from "../RepresentationPortraitImage";
import { pageSectionTitle } from "../../../coresetConfigs";
import Head from "next/head";
/*
 * *** Cover Slide  ***
 * ---------------------
 * @remember all loadind in central page [...slides].js
 */


/**
 * Overwrite default classNames in description label and field itself.
 * smaller font, margin, etc. 
 * 
 * @see GenericDescriptionFields.DescriptionLabel
 * @see GenericDescriptionFields.Fields
 */
export const classNameFieldConfigs = {
  classNameDesriptionLabelConfigs: { py: 0 },
  classNameFieldConfigs: {textSize: 'text-sm'}
};


/**
 * System to generate fields from linkedart-api 
 */
const coverFields = [
  { key: LINK_PERSON_PAGE, label: "in der Werkdatenbank" },
  { key: ATTRIBUTED_BY, textOnly:true},
];
const fieldStructure = [{ fields: coverFields }];


export const CoverSlide = () => {
  // already loaded in @see [...slides].js
  // @remember all loadind in central page [...slides].js
  const { personData, cleandFieldStructure } =
    useSWRCoresetPersonAndStructure(fieldStructure);

  return (
    <TwoColumnsContainer className="h-full">
      <RepresentationPortraitImage {...personData} />

      <TextContainer>
        <h1 className="pb-8 text-3xl font-semibold lg:text-4xl">
          {personData.label}
          <br />
          <span className="font-light">Kernbestand</span>
        </h1>
        <p className="pb-4 text-2xl font-light">
          14 Grafiken, 13 Collagen und 4 Zeichnungen stellen den Kernbestand im
          Nachlas ....
        </p>
        <p className="pb-4 text-2xl font-light">
          In diesen Schaudepo ... kurzer Text zur Idee dieses Schaudepots, kann
          generisch sein Lorem ipsum dolor sit amet, consetetur sadipscing.
        </p>
        {/* <h3 className="pb-3 text-sm text-gray-600">
          Weitere Information finden Sie
        </h3>

        <FieldsFactory
          data={personData}
          {...head(cleandFieldStructure)}
          {...classNameFieldConfigs}
        /> */}
      </TextContainer>
    </TwoColumnsContainer>
  );
};
