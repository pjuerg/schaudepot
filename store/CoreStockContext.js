// store/CoreContextContext.js

import React, { useReducer } from "react";

import compose from "ramda/src/compose";
import always from "ramda/src/always";
import evolve from "ramda/src/evolve";
import insertAll from "ramda/src/insertAll";
import map from "ramda/src/map";
import thunkify from "ramda/src/thunkify";
import assoc from "ramda/src/assoc";

import { transformPhysicalObjectListing } from "../values/physicalObject";
import { getMember } from "../utils/getter";
import { ROUTE_ADDENDUM, ROUTE_CORESTOCK, ROUTE_INTRO, ROUTE_ITEM } from "../utils/routes";

/*
 *  *** CoreStockContext  ***
 * ------------------------
 */

export const SET_CORESTOCK_PERSON_ID_ACTION = "SET_CORESTOCK_PERSON_ID_ACTION";
export const LOAD_CORESTOCK_ACTION = "LOAD_CORESTOCK_ACTION";
export const SUCCESS_LOAD_CORESTOCK_ACTION = "SUCCESS_LOAD_CORESTOCK_ACTION";
export const SET_CORESTOCK_ANIMATION_DIRECTION = "SET_CORSTOCK_ANIMATION_DIRECTION";
export const SET_CORESTOCK_KEY_NAVIGATION = "SET_CORESTOCK_KEY_NAVIGATION";

/* Create the Context
 */
export const CoreStockDispatchContext = React.createContext(null);
export const CoreStockStateContext = React.createContext(null);

// getSlides :: [{*}], n -> [s]
const getSlides = thunkify((items, personId) => {
  const coreStockRoute = `${ROUTE_CORESTOCK}/${personId}`;
  const personSlides = [
    coreStockRoute,
    `${coreStockRoute}${ROUTE_INTRO}`,
    `${coreStockRoute}${ROUTE_ADDENDUM}`,
  ];
  const itemSlides = map(({ id }) => `${coreStockRoute}${ROUTE_ITEM}/${id}`, items);
  return insertAll(2, itemSlides, personSlides);
});

// getSlides :: [{*}] -> {*}
const getItems = compose(getMember, transformPhysicalObjectListing);

/**
 *
 * @param {*} draft
 * @param {*} action
 * @returns
 */
function coreStockReducer(draft, action) {
  // console.log("::CoreStock-Reducer", action.type);

  switch (action.type) {
    case SET_CORESTOCK_PERSON_ID_ACTION:
      return evolve(
        {
          personId: always(action.payload),
          slides: always(null),
          items: always(null),
        },
        draft
      );

    case LOAD_CORESTOCK_ACTION:
      return evolve(
        {
          loading: always(true),
          items: always(null),
          slides: always(null),
        },
        draft
      );
    case SUCCESS_LOAD_CORESTOCK_ACTION:
      const items = getItems(action.payload.data);

      return evolve(
        {
          loading: always(false),
          items: always(items),
          slides: getSlides(items, draft.personId),
        },
        draft
      );

    case SET_CORESTOCK_ANIMATION_DIRECTION:
      return assoc("direction", action.payload, draft);

    case SET_CORESTOCK_KEY_NAVIGATION:
      return assoc("keyNavigation", action.payload, draft);

    default:
      throw new Error(`reducer action.type ${action.type} did not match`);
  }
}

/**
 * First state of the provider
 */
const initialState = {
  keyNavigation: null,
  personId: null,
  items: null,
  slides: null,
  loading: false,
  direction: null,
};

/**
 * The provider
 */
export const CoreStockProvider = ({ children }) => {
  const [state, dispatch] = useReducer(coreStockReducer, initialState);

  return (
    <CoreStockDispatchContext.Provider value={dispatch}>
      <CoreStockStateContext.Provider value={state}>
        {children}
      </CoreStockStateContext.Provider>
    </CoreStockDispatchContext.Provider>
  )};