// components/coreset/slides/addendum.js

import PropTypes from "prop-types";

import Link from "next/link";
import path from "ramda/src/path";

import { ATTRIBUTED_BY, LINK_PERSON_PAGE, REFERRED_TO_BY, VALUE } from "../../../values/constants";
import { useSWRCoresetPersonAndStructure } from "../../../utils/useSWRCoresetPerson";
import { ROUTE_CORESET } from "../../../utils/routes";

import { TextContainer, TwoColumnsContainer } from "../Container";
import { CoresetStateContext } from "../../../store/CoresetContext";
import { useContext } from "react";
import { linkDepot } from "../../../coresetConfigs";

/*
 * *** Addendum Slide  ***
 * ------------------------
 * @remember all loadind in central page [...slides].js
 */

const LinkButton = ({ className, label, url }) => (
  <Link href={url}>
    <a
      className={`${className} inline-flex rounded-sm items-center transition-colors duration-200 ease-in  font-semibold border border-gray-500 hover:bg-yellow-300 hover:border-yellow-300`}
    >
      {label}
    </a>
  </Link>
);
LinkButton.propTypes = {
  className: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  wrapperClassName: PropTypes.string,
};

const PrimaryButtonExternalXL = ({ className = "", ...props }) => (
  <a href={linkDepot}
    className={`${className} px-4 py-2 bg-gray-500 text-gray-100 hover:bg-yellow-400 hover:text-gray-800 cursor-pointer`}
    {...props}>{props.label}</a>
);

// const SecondaryButtonXL = ({ className = "", ...props }) => (
//   <LinkButton
//     className={`${className} px-4 py-2 text-gray-800 hover:bg-yellow-400`}
//     {...props}
//   />
// );

/**
 * System to generate fields from linkedart-api
 */
const coverFields = [
  { key: LINK_PERSON_PAGE, label: "in der Werkdatenbank" },
  { key: ATTRIBUTED_BY, textOnly: true },
];
const fieldStructure = [{ fields: coverFields }];

export const AddendumSlide = (props) => {
  // already loaded in @see [...slides].js
  // @remember all loadind in central page [...slides].js
  const { personData, cleandFieldStructure } =
    useSWRCoresetPersonAndStructure(fieldStructure);
  const { event } = useContext(CoresetStateContext);
  const descriptionHtml = path([REFERRED_TO_BY, 1, VALUE], event);

  return (
    <>
      <TwoColumnsContainer {...props}>
        <div></div>

        <TextContainer className="px-2 pb-10 md:pt-20 md:px-4 lg:8px">
        {/*
          <h1 className="pb-8 text-xl font-bold leading-tight">
            Weitere Informationen zu
            <br />
            {personData.label}
          </h1> */}

          {/* optionaler text */}
          {descriptionHtml && (
            <div
              className="pb-8 space-y-4 font-light"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          )}

          <PrimaryButtonExternalXL
            label={`Alle Präsentationen`}
            url={`${ROUTE_CORESET}`}
          />
        </TextContainer>
      </TwoColumnsContainer>
      {/* <CoresetCards className="mt-12" coresets={DEPOTS} /> */}
    </>
  );
};
