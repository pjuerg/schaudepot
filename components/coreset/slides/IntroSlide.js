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
import { absoluteLinkPerson } from "../../../utils/routes";

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
    <TwoColumnsContainer
      className="flex-col pb-10 md:flex-row md:h-full"
      classNameFirstClm="hidden md:block pb-8 md:pb-10  md:w-1/2 md:h-full md:px-8"
      classNameSecondClm=" pb-8 md:pb-0  md:w-1/2 md:h-full md:px-0"
    >
      <RepresentationPortraitImage {...personData} />
      <TextContainer className="relative flex flex-col h-full px-4 pb-10">
        <h1 className="pb-4 text-3xl font-semibold lg:text-4xl">
          Über {personData.label}
        </h1>
        <FieldsFactory
          data={personData}
          {...head(cleandFieldStructure)}
          {...classNameFieldConfigs}
        />
        <a
          className="pb-8 text-sm font-light underline"
          href={absoluteLinkPerson(personData.id)}
        >
          zur Beschreibung in der Werkdatenbank
        </a>
        {/* html scrollbar */}
        <div
          className={`slide-markdown-styles h-full grow overflow-y-auto `}
          dangerouslySetInnerHTML={{ __html: scrollbarHtml }}
        />
        {/* gradientfor the scrollbar */}
        <div className="w-full h-24 z-10 absolute left-0 bottom-10 bg-[url('/css/bottom-fade-gray-100.png')] " />
      </TextContainer>
    </TwoColumnsContainer>
  );
};
