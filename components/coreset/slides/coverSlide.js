// components/coreset/slides/cover.js

// import { ATTRIBUTED_BY, LINK_PERSON_PAGE } from "../../../values/constants";
import path  from "ramda/src/path";
import prop from "ramda/src/prop";

import { useContext } from "react";
import { CoresetStateContext } from "../../../store/CoresetContext";
import { absoluteLinkPerson } from "../../../utils/routes";
import { useSWRCoresetPerson } from "../../../utils/useSWRCoresetPerson";
import { REFERRED_TO_BY, VALUE } from "../../../values/constants";

import { TextContainer, TwoClmsImgTextContainer } from "../Container";
import { RepresentationPortraitImage } from "../RepresentationPortraitImage";

/*
 * *** Cover Slide  ***
 * ---------------------
 * @remember all loading in central page [...slides].js
 */

/**
 * System to generate fields from linkedart-api
 */
// const coverFields = [
//   { key: LINK_PERSON_PAGE, label: "in der Werkdatenbank" },
//   { key: ATTRIBUTED_BY, textOnly: true },
// ];
// const fieldStructure = [{ fields: coverFields }];

const formatTimespan = (obj) => {
  const born = prop("born.timespan", obj);
  const died = prop("died.timespan", obj);
  if (born && died) return `${born} – ${died}`;
  else if (born) return `*${born}`;
  else if (died) return `${died}`;
};

export const CoverSlide = (props) => {
  // already loaded in @see [...slides].js
  // @remember all loadind in central page [...slides].js
  // return (<div>cover slides</div>)
  const dataPerson = useSWRCoresetPerson();
  const { event } = useContext(CoresetStateContext);
  const descriptionHtml = path([REFERRED_TO_BY, 0, VALUE], event);

  return (
    <TwoClmsImgTextContainer {...props}>
      <RepresentationPortraitImage {...event} />

      <TextContainer className="px-2 md:px-4 lg:lg:8px ">
        <h1 className="pb-8 text-3xl font-semibold lg:text-4xl">
          {dataPerson.label}
          <br />
          <span className="font-light">{formatTimespan(dataPerson)}</span>
        </h1>

        {/* optionaler text  */}
        {descriptionHtml && (
          <div
            className="text-2xl font-light"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        )}

        <a
          className="block mt-8 text-2xl font-light underline "
          href={absoluteLinkPerson(dataPerson.id)}
        >
          Biografie in der Werkdatenbank
        </a>

        <div className="hidden p-4 mt-24 text-gray-100 bg-gray-600 rounded-sm md:visible md:inline-block">
          <h2 className="pb-2 font-semibold">
            <span className="px-2 text-gray-700 bg-gray-100">
              Navigations-Tipps:
            </span>
          </h2>

          <p className="font-light">
            für schnelle Navigation die Tastatur verwenden.
            <br />
            <span className="italic">Pfeiltasten</span> - Nutzen Sie
            rechts/links zum Blättern
            <br />
            <span className="italic">W-Taste</span> - Vollbild/reguläre Ansicht
            wechseln
            <br />
          </p>
        </div>
      </TextContainer>
    </TwoClmsImgTextContainer>
  );
};
