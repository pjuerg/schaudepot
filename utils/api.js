//  utils/api.js

/*
 * *** Entry points rest api  ***
 * --------------------------
 * 
 */


export const GATEWAY = "https://private-kuenstlernachlaesse-brandenburg.de";
const API_PATH = "/linked-art.php";
export const GATEWAY_API_PATH = `${GATEWAY}${API_PATH}`;

export const apiPerson = (personId) => `${GATEWAY_API_PATH}/person/${personId}`;
export const apiDepot = (personId) =>
  `${GATEWAY_API_PATH}/physical_object?filter[coreset]=1&filter[person]=${personId}`;
