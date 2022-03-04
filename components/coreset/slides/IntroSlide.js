// components/coreset/slides/intro.js

import compose from "ramda/src/compose";
import useSWR from "swr";

import  curry from "ramda/src/curry";
import  head from "ramda/src/head";
import  join from "ramda/src/join";
import  prepend from "ramda/src/prepend";
import  prop from "ramda/src/prop";
import  flip from "ramda/src/flip";
import  reduce from "ramda/src/reduce";

import { fetcher } from "../../../libs/fetcher";
import { filterAtId } from "../../../libs/rmd-lib/filterAtId";
import { second } from "../../../libs/rmd-lib/second";
import { isArray } from "../../../libs/rmd-lib/isArray";

import { apiSite } from "../../../utils/api";
import {  IDENTIFIED_BY,REFERRED_TO_BY } from "../../../utils/constants";
import { useSWRCoresetPerson } from "../../../utils/useSWRCoresetPerson";
import { removeEmptySectionsAndAddMissingLabels } from "../../../values/structureHelper";
import { HtmlTextWithScrollbar } from "../../designSystem";
import {  FORMAT_TEXT_HTML } from "../../../utils/utilsFields";
import { FieldsFactory } from "../FieldsFactory";
import {
  TextContainer,
  TwoColumnsContainer,
  RepresentationPortraitImage,
} from "../CoresetDesignSystem";

/*
 * *** Intro Slide  ***
 * ---------------------
 * @remember all loadind in central page [...slides].js
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

const fieldsToHtml = curry((data) => {
  return reduce(
    (acc, obj) => {
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
    },
    "",
  );
});

const  toScrollbarString = personData => compose(
    join(""),
    flip(prepend)(["<br/>", "<br/>"]),
    fieldsToHtml(personData),
    prop("fields"),
    second
  )

export const IntroSlide = () => {
  // already loaded in @see [...slides].js
  // @remember all loadind in central page [...slides].js
  const personData = useSWRCoresetPerson();
  const { data: dataSite } = useSWR(apiSite(), fetcher);
  const cleandFieldStructure = removeEmptySectionsAndAddMissingLabels(
    "person",
    dataSite,
    fieldStructure,
    personData
  );
  const scrollbarHtml = toScrollbarString(personData)(cleandFieldStructure);

  return (
    <TwoColumnsContainer className="h-full">

      <RepresentationPortraitImage {...personData}/>

      <TextContainer className="relative flex flex-col h-full ">
        <h1 className="pb-8 text-3xl font-bold lg:text-4xl">
          {personData.label}
          <br />
        </h1>
        <FieldsFactory data={personData} {...head(cleandFieldStructure)} />
        <HtmlTextWithScrollbar>{scrollbarHtml}</HtmlTextWithScrollbar>
        <div className="bottom_fade" />
      </TextContainer>
    </TwoColumnsContainer>
  );
};
