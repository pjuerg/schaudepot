// utils/useSWRPersonWithRouter.js

import { useRouter } from "next/router";
import useSWR from "swr";

import { exists } from "../libs/rmd-lib/exists";

import { fetcher } from "./fetcher";
import { apiPerson } from "./api";
import { transformPerson } from "../values/person";
import { getPersonIdFromRouterPath } from "../components/depot/GlobalNavigation";


export const useSWRPersonWithRouter = () => {
  const id = getPersonIdFromRouterPath(useRouter());
  const { data } = useSWR(exists(id) ? apiPerson(id) : null, fetcher);
  return transformPerson(data);
};
