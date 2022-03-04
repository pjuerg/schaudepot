// utils/useCheckRoute.js

import { useRouter } from "next/router";

import test from "ramda/src/test";
import equals from "ramda/src/equals";

/*
 *  *** useCheckRoute ***
 * -----------------------
 */

const regExImagePage = /\/\w+\/\d+\/\d+/g;
const testIsImageZoomPage = test(regExImagePage);
const testIsFrontPage = equals("/")

export const useCheckRoute = () => {
  const { asPath } = useRouter();
  return {
    isImageZoomPage: testIsImageZoomPage(asPath),
    isFrontPage: testIsFrontPage(asPath)
  };
};
