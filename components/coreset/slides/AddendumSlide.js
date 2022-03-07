// components/coreset/slides/addendum.js

import PropTypes from "prop-types";

import { ATTRIBUTED_BY, LINK_PERSON_PAGE } from "../../../values/constants";
import { useSWRCoresetPersonAndStructure } from "../../../utils/useSWRCoresetPerson";
import { ROUTE_CORESET } from "../../../utils/routes";


import { FieldsFactory } from "../FieldsFactory";
import { TextContainer, TwoColumnsContainer } from "../Container";
import { classNameFieldConfigs } from "./coverSlide";
import Link from "next/link";

/*
 * *** Addendum Slide  ***
 * ------------------------
 * @remember all loadind in central page [...slides].js
 */


const LinkButton = ({ className, label, url }) => (
  <Link href={url}>
    <a
      className={`${className} inline-flex rounded-sm items-center transition-colors duration-200 ease-in  font-semibold border border-teal hover:bg-yellow-300 hover:border-yellow-300`}
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

const PrimaryButtonXL = ({ className = "", ...props }) => (
  <LinkButton className={`${className} px-4 py-2 bg-teal text-gray-100 hover:bg-yellow-400 hover:text-teal `} {...props} />
);

const SecondaryButtonXL = ({ className = "", ...props }) => (
  <LinkButton
    className={`${className} px-4 py-2 text-teal hover:bg-yellow-400`}
    {...props}
  />
);


/**
 * System to generate fields from linkedart-api 
 */
const coverFields = [
  { key: LINK_PERSON_PAGE, label: "in der Werkdatenbank" },
  { key: ATTRIBUTED_BY, textOnly:true },
];
const fieldStructure = [{ fields: coverFields }];

export const AddendumSlide = () => {
  // already loaded in @see [...slides].js
  // @remember all loadind in central page [...slides].js
  const { personData, cleandFieldStructure } =
    useSWRCoresetPersonAndStructure(fieldStructure);
 
  return (
    <>
      <TwoColumnsContainer>
        <div></div>
        <TextContainer>
          <h1 className="text-xl font-bold">
            Weitere Informationen zu
            <br />
            {personData.label}
          </h1>
          <br />
          <br />
          <br />
          {/* <FieldsFactory
            data={personData}
            {...head(cleandFieldStructure)}
            {...classNameDesriptionConfigs}
          /> */}
          <h3 className="pb-3 text-sm text-gray-600">Weiter mit</h3>
 
          <PrimaryButtonXL
            label={`Alle Kernbestände`}
            url={`${ROUTE_CORESET}`}
          />{" "}
          <SecondaryButtonXL
            label={`Zurück ${personData.label}`}
            url={`${ROUTE_CORESET}/${personData.id}`}
          />
        </TextContainer>
      </TwoColumnsContainer>
      {/* <CoresetCards className="mt-12" coresets={DEPOTS} /> */}
    </>
  );
};
