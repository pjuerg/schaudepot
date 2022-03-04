// components/coreset/slides/addendum.js

import useSWR from "swr";
import head from "ramda/src/head";

import { fetcher } from "../../../libs/fetcher";

import { ATTRIBUTED_BY, LINK_PERSON_PAGE } from "../../../utils/constants";
import { useSWRCoresetPerson } from "../../../utils/useSWRCoresetPerson";
import { ROUTE_CORESET } from "../../../utils/routes";
import { apiSite } from "../../../utils/api";
import { removeEmptySectionsAndAddMissingLabels } from "../../../values/structureHelper";
import { H2, PrimaryButtonXL, SecondaryButtonXL } from "../../designSystem";
import { FieldsFactory } from "../FieldsFactory";
import { TextContainer, TwoColumnsContainer } from "../CoresetDesignSystem";

/*
 * *** Addendum Slide  ***
 * ------------------------
 * @remember all loadind in central page [...slides].js
 */

const coverFields = [
  { key: LINK_PERSON_PAGE, label: "in der Werkdatenbank" },
  { key: ATTRIBUTED_BY },
];

const fieldStructure = [{ fields: coverFields }];

export const AddendumSlide = () => {
    const personData = useSWRCoresetPerson();

      const { data: dataSite } = useSWR(apiSite(), fetcher);

      const cleandFieldStructure = removeEmptySectionsAndAddMissingLabels(
        "person",
        dataSite,
        fieldStructure,
        personData
      );

  return (
    <>
      <TwoColumnsContainer>
        <div></div>
        <TextContainer>
          <H2>
            Weitere Informationen zu
            <br />
            {personData.label}
          </H2>
          <FieldsFactory data={personData} {...head(cleandFieldStructure)} />
          {/* TODO Button in Fieldstructure */}
          <h3 className="pb-3 text-sm text-gray-600">
            Weitere mit
          </h3>
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
