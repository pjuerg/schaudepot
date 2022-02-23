// pages/[depot]/item/[item].js
import PropTypes from "prop-types";
import Head from "next/head";
import { useContext } from "react";
import { useRouter } from "next/router";
import isNil from "ramda/src/isNil";
import compose from "ramda/src/compose";
import prop from "ramda/src/prop";

import { maybe } from "../../../libs/rmd-lib/maybe";
import { findAtId } from "../../../libs/rmd-lib/findAtId";
import { splitAtLastSlash } from "../../../libs/rmd-lib/splitAtLastSlash";
import { DepotStateContext } from "../../../store/DepotContext";
import {
  BigLoading,
  CenteredContainer,
  RepresentationImage,
  Textbar,
} from "../../../components/depot";
import { getAsPath } from "../../../utils/getter";

/*
 * *** Depot-Item-Page ***
 * - - - - - - - - - - - - - - - -
 */

export default function DepotItemPage() {
  const { items } = useContext(DepotStateContext);
  const itemId = compose(splitAtLastSlash, getAsPath)(useRouter());
  const item = maybe(findAtId(itemId))(items);

  return (
    <div>
      <Head>
        <title>TODO Item Page</title>
        <meta name="description" content="TODO" />
      </Head>

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
}
