// store/searchContext.js

import React, { useReducer } from "react";

import compose from "ramda/src/compose";
import always from "ramda/src/always";
import evolve from "ramda/src/evolve";
import insertAll from "ramda/src/insertAll";
import map from "ramda/src/map";
import prop from "ramda/src/prop";
import thunkify from "ramda/src/thunkify";

import { MEMBER } from "../utils/constants";
import { transformPhysicalObjectListing } from "../values/physicalObject";

/*
 *  *** DepotContext  ***
 * ------------------------
 *
 */


export const SET_DEPOT_PERSON_ID_ACTION = "SET_DEPOT_PERSON_ID_ACTION";
export const LOAD_DEPOT_ACTION = "LOAD_DEPOT_ACTION";
export const SUCCESS_LOAD_DEPOT_ACTION = "SUCCESS_LOAD_DEPOT_ACTION";

/* Create the Context
 */
export const DepotDispatchContext = React.createContext(null);
export const DepotStateContext = React.createContext(null);


// getSlides :: [{*}], n -> [s]
const getSlides = thunkify((items, personId) => {
  const depot = `/depot-${personId}`;
  const personSlides = [depot, `${depot}/person`, `${depot}/info`];
  const itemSlides = map(({ id }) => `${depot}/item/${id}`, items);
  return insertAll(2, itemSlides, personSlides);
});

// getSlides :: [{*}] -> {*}
const getItems = compose(prop(MEMBER), transformPhysicalObjectListing);

/**
 * 
 * @param {*} draft 
 * @param {*} action 
 * @returns 
 */
function depotReducer(draft, action) {

  console.log("::Depot Reducer", action.type);

  switch (action.type) {
    case SET_DEPOT_PERSON_ID_ACTION:
      return evolve(
        {
          personId: always(action.payload),
          slides: always(null),
          items: always(null),
        },
        draft
      );

    case LOAD_DEPOT_ACTION:
      return evolve(
        {
          loading: always(true),
          items: always(null),
          slides: always(null),
        },
        draft
      );
    case SUCCESS_LOAD_DEPOT_ACTION:
      const items = getItems(action.payload.data);
      console.log("path", action.payload.path);

      return evolve(
        {
          loading: always(false),
          items: always(items),
          slides: getSlides(items, draft.personId),
        },
        draft
      );

    default:
      throw new Error(`reducer action.type ${action.type} did not match`);
  }
}

/**
 * First state of the provider
 */
const initialState = {
  personId: null,
  items: null,
  slides: null,
  loading: false,
};

/**
 * The provider
 */
export const DepotProvider = ({ children }) => {
  const [state, dispatch] = useReducer(depotReducer, initialState);

  return (
    <DepotDispatchContext.Provider value={dispatch}>
      <DepotStateContext.Provider value={state}>
        {children}
      </DepotStateContext.Provider>
    </DepotDispatchContext.Provider>
  );
};
