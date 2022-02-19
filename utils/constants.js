// utils/constants.js

/*
 *  *** Constants  ***
 * -------------------
 * 
 */

// ** Api **

export const DEPOTS = [
  {
    id: 15,
  },
  {
    id: 16,
  },
  {
    id: 10,
  },
];


// export const ROUTE_DEPOT = "https://private-kuenstlernachlaesse-brandenburg.de/linked-art.php/physical_object?filter[coreset]=1&filter[person]";

// export const GATEWAY = "https://private-kuenstlernachlaesse-brandenburg.de";
// entry points rest-api
export const GATEWAY = "https://private-kuenstlernachlaesse-brandenburg.de";
const API_PATH = "/linked-art.php";
export const GATEWAY_API_PATH = `${GATEWAY}${API_PATH}`;
export const ROUTE_HOME = "/";
export const ROUTE_PERSON = "/person";
export const ROUTE_PHYSICAL_OBJECT = "/physical_object";
export const ROUTE_SITE = "/site";
export const ROUTE_ITEM = "/item";
export const ROUTE_ABOUT = "/ueber";
export const ROUTE_DEPOT = "/depot";
export const ROUTE_IMPRINT = "https://www.bbk-sachsenanhalt.de/impressum";
export const ROUTE_PRIVACY = "https://www.bbk-sachsenanhalt.de/datenschutz";
export const API_PERSON = `${GATEWAY_API_PATH}${ROUTE_PERSON}`;
export const API_PHYSICAL_OBJECT = `${GATEWAY_API_PATH}${ROUTE_PHYSICAL_OBJECT}`;
export const API_SITE = `${GATEWAY_API_PATH}${ROUTE_SITE}`;
export const API_DEPOT = `${GATEWAY_API_PATH}${ROUTE_PHYSICAL_OBJECT}?filter[coreset]=1&filter[person]=`;

export const IMAGE_SIZE_MD = "640";
export const IMAGE_SIZE_XS = "320";

// ** global site **
export const TITLE = "BBK, Bildende Kunst Sachsen-Anhalt";

// export const BUTTON_COMPONENT = "button_component";
export const BUTTON_COMPONENT_ITEMS_FROM_ARTIST = "Button_component_items_from_artist";

// ** linked.art and fields **

export const IDENTIFIED_BY = "identified_by";
export const CLASSIFIED_AS = "classified_as";
export const REFERRED_TO_BY = "referred_to_by";
export const ATTRIBUTED_BY = "attributed_by";
export const MEMBER_OF = "member_of";
export const ADDITONAL_MEDIA = "additonial_media";
export const TIMESPAN = "timespan";
export const CREATED_BY = "created_by";
export const CREATED_BY_CARRIED_OUT_BY = "created_by.carried_out_by";
export const CREATED_BY_TIMESPAN = "created_by.timespan";
export const ACCESS_POINT = "access_point";

export const HYDRA_MEMBER = "hydra:member";
export const HYDRA_TOTAL_ITEMS = "hydra:totalItems";

export const CONTENT = "content";
export const _LABEL = "_label";
export const LABEL = "label"
export const VALUE = "value"
export const FILTER = "filter"
export const BORN = "born";
export const DIED = "died";
export const MEMBER = "member";
export const ITEMS = "items";

export const STANDART_OMITS = ["id", "@context", "type"];


// ** responsive shortcuts **
export const XXL = "2xl"
export const XL = "xl"
export const LG = "lg"
export const MD = "md"
export const SM = "sm" // @remember not the same like in @see https://tailwindcss.com/docs/breakpoints