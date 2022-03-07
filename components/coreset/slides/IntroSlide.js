// components/coreset/slides/intro.js

import compose from "ramda/src/compose";

import curry from "ramda/src/curry";
import head from "ramda/src/head";
import join from "ramda/src/join";
import prepend from "ramda/src/prepend";
import prop from "ramda/src/prop";
import flip from "ramda/src/flip";
import reduce from "ramda/src/reduce";

import { filterAtId } from "../../../libs/rmd-lib/filterAtId";
import { second } from "../../../libs/rmd-lib/second";
import { isArray } from "../../../libs/rmd-lib/isArray";

import { IDENTIFIED_BY, REFERRED_TO_BY } from "../../../values/constants";
import { useSWRCoresetPersonAndStructure } from "../../../utils/useSWRCoresetPerson";

import { FORMAT_TEXT_HTML } from "../../../utils/utilsFields";
import { FieldsFactory } from "../FieldsFactory";
import { TextContainer, TwoColumnsContainer } from "../Container";
import { classNameFieldConfigs } from "./coverSlide";
import { RepresentationPortraitImage } from "../RepresentationPortraitImage";

/*
 * *** Intro Slide  ***
 * ---------------------
 * @remember all loadind in central page [...slides].js
 */

/**
 * System to generate fields from linkedart-api
 */
const introFields = [
  { key: IDENTIFIED_BY, idData: "300264273" },
  { key: "born.timespan" },
  { key: "born.took_place_at" },
  { key: "died.timespan" },
  { key: "died.tookplace_at" },
];
const biografyFields = [{ key: REFERRED_TO_BY, idData: "300435422" }];
const fieldStructure = [{ fields: introFields }, { fields: biografyFields }];

/**
 * Helper for toScrollbarString
 */
const fieldsToHtml = curry((data) => {
  return reduce((acc, obj) => {
    const { key, idData } = obj; // the structure object
    const entries = prop(key, data); // the data at the structure object

    // break: only prozess array with id
    if (!isArray(entries) || !idData) return acc;

    // else tinker html
    const entry = compose(head, filterAtId)(idData, entries);
    const body =
      entry.format === FORMAT_TEXT_HTML ? entry.value : `<p>${entry.value}</p>`;
    // and return long string
    return [acc, `<h3 >${entry.label}</h3>`, body].join("");
  }, "");
});

/**
 * Used object from fieldStructure to make
 * long html string
 */
const joinFieldsToHtml = (personData) =>
  compose(
    join(""),
    flip(prepend)(["<br/>", "<br/>"]),
    fieldsToHtml(personData),
    prop("fields")
  );

export const IntroSlide = () => {
  // already loaded in @see [...slides].js
  // @remember all loadind in central page [...slides].js
  const { personData, cleandFieldStructure } =
    useSWRCoresetPersonAndStructure(fieldStructure);

  const scrollbarHtml = joinFieldsToHtml(personData)(
    second(cleandFieldStructure)
  );

  return (
    <TwoColumnsContainer className="h-full pb-10">
      <RepresentationPortraitImage {...personData} />

      <TextContainer className="relative flex flex-col h-full px-8 pt-20 pb-10">
        <h1 className="pb-4 text-3xl font-bold lg:text-4xl">
          {personData.label}
        </h1>
        <FieldsFactory
          data={personData}
          {...head(cleandFieldStructure)}
          {...classNameFieldConfigs}
        />

        {/* html scrollbar */}
        <div
          className={`field-markdown-styles h-full grow overflow-y-auto `}
          dangerouslySetInnerHTML={{ __html: scrollbarHtml }}
        />
        {/* gradientfor the scrollbar */}
        <div className="w-full h-24 z-10 absolute left-0 bottom-10 bg-[url('/css/bottom-fade-white.png')] " />
      </TextContainer>
    </TwoColumnsContainer>
  );
};
