// libs/hooks/useResponsiveShortcut.js

import { useWindowSize } from "./useWindowSize";

/*
 *  *** useResponsiveShortcut ***
 * -------------------------------
 */

// ** responsive shortcuts **
export const XXL = "2xl"
export const XL = "xl"
export const LG = "lg"
export const MD = "md"
export const SM = "sm" 
// @remember not the same like in @see https://tailwindcss.com/docs/breakpoints

export const useResponsiveShortcut = () => {
  const { width } = useWindowSize();

  if (width > 1535) return XXL;
  else if (width > 1279 && width < 1535) return XL;
  else if (width > 1023 && width < 1278) return LG;
  else if (width > 767 && width < 1024) return MD;
  else if (width < 768) return SM;
  else return undefined;
};
