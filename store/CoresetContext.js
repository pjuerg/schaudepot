// store/CoresetContext.js

import React, { useReducer } from "react";

import compose from "ramda/src/compose";
import always from "ramda/src/always";
import evolve from "ramda/src/evolve";
import insertAll from "ramda/src/insertAll";
import map from "ramda/src/map";
import thunkify from "ramda/src/thunkify";
import assoc from "ramda/src/assoc";
import prop from "ramda/src/prop";

import { transformPhysicalObjectListing } from "../values/physicalObject";

import { ROUTE_ADDENDUM, ROUTE_CORESET, ROUTE_INTRO, ROUTE_ITEM } from "../utils/routes";

/*
 *  *** CoresetContext  ***
 * ------------------------
 */

export const SET_CORESET_PERSON_ID_ACTION = "SET_CORESET_PERSON_ID_ACTION";
export const LOAD_CORESET_ACTION = "LOAD_CORESET_ACTION";
export const SUCCESS_LOAD_CORESET_ACTION = "SUCCESS_LOAD_CORESET_ACTION";
export const SET_CORESET_ANIMATION_DIRECTION_ACTION =
  "SET_CORESET_ANIMATION_DIRECTION_ACTION";
export const SET_CORESET_KEY_NAVIGATION_ACTION = "SET_CORESET_KEY_NAVIGATION_ACTION";
export const IS_SLIDEGALLERY_OPEN_ACTION = "IS_SLIDEGALLERY_OPEN_ACTION";

/* Create the Context
 */
export const CoresetDispatchContext = React.createContext(null);
export const CoresetStateContext = React.createContext(null);

// getSlides :: [{*}], n -> [s]
const getSlides = thunkify((items, personId) => {
  const coresetRoute = `${ROUTE_CORESET}/${personId}`;
  const personSlides = [
    coresetRoute,
    `${coresetRoute}${ROUTE_INTRO}`,
    `${coresetRoute}${ROUTE_ADDENDUM}`,
  ];
  const itemSlides = map(({ id }) => `${coresetRoute}${ROUTE_ITEM}/${id}`, items);
  return insertAll(2, itemSlides, personSlides);
});

// getSlides :: [{*}] -> {*}
const getItems = compose(prop("member"), transformPhysicalObjectListing);

/**
 *
 * @param {*} draft
 * @param {*} action
 * @returns
 */
function coresetReducer(draft, action) {
  // console.log("::Coreset-Reducer", action.type);

  switch (action.type) {
    case IS_SLIDEGALLERY_OPEN_ACTION:
      return assoc("isSlidegalleryOpen", action.payload, draft);

    case SET_CORESET_PERSON_ID_ACTION:
      return evolve(
        {
          personId: always(action.payload),
          slides: always(null),
          items: always(null),
        },
        draft
      );

    case LOAD_CORESET_ACTION:
      return evolve(
        {
          loading: always(true),
          items: always(null),
          slides: always(null),
        },
        draft
      );
    case SUCCESS_LOAD_CORESET_ACTION:
      const items = getItems(action.payload.data);

      return evolve(
        {
          loading: always(false),
          items: always(items),
          slides: getSlides(items, draft.personId),
        },
        draft
      );

    case SET_CORESET_ANIMATION_DIRECTION_ACTION:
      return assoc("direction", action.payload, draft);

    case SET_CORESET_KEY_NAVIGATION_ACTION:
      return assoc("keyNavigation", action.payload, draft);

    default:
      throw new Error(`reducer action.type ${action.type} did not match`);
  }
}

/**
 * First state of the provider
 */
const initialState = {
  loading: false,
  isSlidegalleryOpen: false,
  keyNavigation: undefined,
  direction: undefined,
  personId: undefined,
  items: undefined,
  slides: undefined,
};

/**
 * The provider
 */
export const CoresetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(coresetReducer, initialState);

  return (
    <CoresetDispatchContext.Provider value={dispatch}>
      <CoresetStateContext.Provider value={state}>
        {children}
      </CoresetStateContext.Provider>
    </CoresetDispatchContext.Provider>
  )};