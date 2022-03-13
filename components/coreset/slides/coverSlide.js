// components/coreset/slides/cover.js

import head from "ramda/src/head";

import { ATTRIBUTED_BY, LINK_PERSON_PAGE } from "../../../values/constants";
import { useSWRCoresetPersonAndStructure } from "../../../utils/useSWRCoresetPerson";
import { FieldsFactory } from "../FieldsFactory";
import { TextContainer, TwoClmsImgTextContainer } from "../Container";
import { RepresentationPortraitImage } from "../RepresentationPortraitImage";
import { pageSectionTitle } from "../../../coresetConfigs";

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
  classNameDesriptionLabelConfigs: {
    py: 0,
    font: "font-light",
    minW: "min-w-[6rem] ",
    flexDl: "flex",
  },
  classNameFieldConfigs: { textSize: "text-sm font-base" },
};


/**
 * System to generate fields from linkedart-api
 */
const coverFields = [
  { key: LINK_PERSON_PAGE, label: "in der Werkdatenbank" },
  { key: ATTRIBUTED_BY, textOnly: true },
];
const fieldStructure = [{ fields: coverFields }];

export const CoverSlide = () => {
  // already loaded in @see [...slides].js
  // @remember all loadind in central page [...slides].js
  const { personData, cleandFieldStructure } =
    useSWRCoresetPersonAndStructure(fieldStructure);

  return (
    <TwoClmsImgTextContainer>
      <RepresentationPortraitImage {...personData} />

      <TextContainer className="px-2 md:px-4 lg:lg:8px ">
        <h1 className="pb-8 text-3xl font-semibold lg:text-4xl">
          {personData.label}
          <br />
          <span className="font-light">Kernbestand</span>
        </h1>
        <p className="pb-4 text-2xl font-light">
          14 Grafiken, 13 Collagen und 4 Zeichnungen stellen den Kernbestand im
          Nachlas ....
        </p>
        <p className="pb-8 text-2xl font-light">
          In diesen Schaudepo ... kurzer Text zur Idee dieses Schaudepots, kann
          generisch sein Lorem ipsum dolor sit amet, consetetur sadipscing.
        </p>

        <div className="hidden p-4 text-gray-100 bg-gray-600 rounded-sm md:visible md:inline-block">
          <h2 className="pb-2 font-semibold">
            <span className="px-2 text-gray-700 bg-gray-100">
              Navigations-Tipp
            </span>
          </h2>

          <p className="font-light">
            Zum schnellen hin und her Blättern
            <br />
            einfach die Pfeiltasten auf der Tastatur verwenden.
          </p>
        </div>
        {/* <h3 className="pb-3 text-sm text-gray-600">
          Weitere Information finden Sie
        </h3>

        <FieldsFactory
          data={personData}
          {...head(cleandFieldStructure)}
          {...classNameFieldConfigs}
        /> */}
      </TextContainer>
    </TwoClmsImgTextContainer>
  );
};