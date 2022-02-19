// utils/userSWRDepotWithRouter.js

import { useRouter } from "next/router";
import useSWR from "swr";

import is from "ramda/src/is";
import prop from "ramda/src/prop";

import { API_DEPOT, HYDRA_MEMBER} from "./constants";
import { fetcher } from "./fetcher";
import { getPersonIdFromRouterPath } from "./useSWRPersonWithRouter";

/*
 * *** userSWRDepotWithRouter ***
 * ------------------------------
 * 
 */


export const userSWRDepotWithRouter = () => {
  const id = getPersonIdFromRouterPath(useRouter());
  const depotUrl = `${API_DEPOT}${id}`;
  const { data } = useSWR(is(Number, id) ? depotUrl : null, fetcher);

  return prop(HYDRA_MEMBER, data);
};
