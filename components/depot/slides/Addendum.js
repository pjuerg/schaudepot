// components/depot/slides/addendum.js

import { DEPOTS } from "../../../utils/constants";
import { ROUTE_HOME } from "../../../utils/routes";
import {
  CenteredContainer,
  DepotCards,
  SimpleLink,
  Textbar,
} from "../../../components/depot";

/*
 * *** Addendum Slide  ***
 * --------------------------
 */

export const AddendumSlide = () => {
  return (
    <CenteredContainer className="mt-48">
      <div>
        <div>
          <Textbar>Last Page</Textbar>
          <ul>
            <li className="font-bold">Abschlussinformation, ....?</li>
            <li>Webseite</li>
            <li>Kontakt</li>
            <li>Link in die DB</li>
            <li>
              <SimpleLink className="my-16" url={`${ROUTE_HOME}`}>
                Startseite
              </SimpleLink>
            </li>
          </ul>
        </div>
        <DepotCards depots={DEPOTS} />
      </div>
    </CenteredContainer>
  );
};
