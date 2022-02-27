// components/corestock/slides/item.js

import { useContext } from "react";
import { CoreStockStateContext } from "../../../store/CoreStockContext";

import { useRouter } from "next/router";
import isNil from "ramda/src/isNil";
import compose from "ramda/src/compose";

import { maybe } from "../../../libs/rmd-lib/maybe";
import { findAtId } from "../../../libs/rmd-lib/findAtId";
import { splitAtLastSlash } from "../../../libs/rmd-lib/splitAtLastSlash";
import { getAsPath } from "../../../utils/getter";
import {
  BigLoading,
  CenteredContainer,
  RepresentationImage,
  Textbar,
} from "..";

/*
 * *** Item Slide  ***
 * --------------------------
 */

export const ItemSlide = () => {
  
  const { items } = useContext(CoreStockStateContext);
  const itemId = compose(splitAtLastSlash, getAsPath)(useRouter());
  const item = maybe(findAtId(itemId))(items);

  return (
    <div>

      {isNil(item) ? (
        <BigLoading />
      ) : (
        <CenteredContainer className="mt-48">
          <RepresentationImage {...item} />
          <Textbar>Work Page, ID {itemId}</Textbar>
        </CenteredContainer>
      )}
    </div>
  );
};
