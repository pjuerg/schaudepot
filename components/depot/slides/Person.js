// components/depot/slides/person.js


import isNil from "ramda/src/isNil";
import { useSWRDepotPerson } from "../../../utils/useSWRDepotPerson";
import { H1 } from "../../designSystem";
import {
  BigLoading,
  RepresentationImage,
  Textbar,
  TextContainer,
  TwoColumnsContainer,
} from "../DepotSystem";

/*
 * *** Person Slide  ***
 * --------------------------
 */

// TOOD dynamic with structure table
const ArtistInfo = ({ label, id }) => {
  return (
    <TextContainer>
      <H1>{label}</H1>
      <div>id: {id}</div>
      Geburt <br />
      Tod <br />
      Wirkungsorte <br />
    </TextContainer>
  );
};

export const PersonSlide = () => {
  
  const transformedPersonData = useSWRDepotPerson();

  return (
    <>

      {isNil(transformedPersonData) ? (
        <BigLoading />
      ) : (
        <TwoColumnsContainer className="flexCenteredFullScreen">
          <RepresentationImage {...transformedPersonData} className="ml-16" />
          <div>
            <Textbar>Biography Page</Textbar>
            <ArtistInfo {...transformedPersonData} />
          </div>
        </TwoColumnsContainer>
      )}
    </>
  );
};
