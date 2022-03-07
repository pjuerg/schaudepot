// components/coreset/slides/item.js

import { useContext } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import compose from "ramda/src/compose";
import head from "ramda/src/head";
import prop from "ramda/src/prop";

import { splitAtLastSlash } from "../../../libs/rmd-lib/splitAtLastSlash";
import { findAtId } from "../../../libs/rmd-lib/findAtId";
import { fetcher } from "../../../libs/fetcher";

import { getPreviewImage, getRepresentationCopyright, getRepresentationCreator, getRepresentationLegend, hasAnyRepresentationInfo } from "../../../utils/utilsImage";
import {
  CLASSIFIED_AS,
  IDENTIFIED_BY,

  TIMESPAN,
} from "../../../values/constants";
import { apiSite } from "../../../utils/api";
import { CoresetStateContext } from "../../../store/CoresetContext";
import { removeEmptySectionsAndAddMissingLabels } from "../../../values/structureHelper";
import { FieldsFactory } from "../FieldsFactory";
import { LinkedArtImage } from "../../linkedartimage";
import { ThreeColumnsContainer } from "../Container";
import { maybe } from "../../../libs/rmd-lib/maybe";
import { classNameFieldConfigs } from "./coverSlide";
import Head from "next/head";
import { pageSectionTitle } from "../../../depotConfigs";

/*
 * *** Item Slide  ***
 * --------------------
 * @remember all loadind in central page [...slides].js
 */

const titleFields = [
  { key: TIMESPAN },
  { key: IDENTIFIED_BY, idData: "300404620" },
  { key: CLASSIFIED_AS, idData: "300435443", textOnly:true },
];

const fieldStructure = [
  { fields: titleFields },
];

const useItemDataWithRouter = () => {
  const { items } = useContext(CoresetStateContext);
  const itemId = compose(splitAtLastSlash, prop("asPath"))(useRouter());
  return findAtId(itemId, items);
};

export const ItemSlide = () => {
  const itemData = useItemDataWithRouter();
  const { data: dataSite } = useSWR(apiSite(), fetcher);
  const {representation} = itemData;
  const cleandFieldStructure = removeEmptySectionsAndAddMissingLabels(
    "item",
    dataSite,
    fieldStructure,
    itemData
  );
  const imgData= maybe(head)(representation)
  return (

      
      <div className="flex flex-col h-full">
        <div className="grow h-[80%] ">
          <LinkedArtImage
            {...getPreviewImage(representation)}
            className="linkedArtImg--slide"
            showLoading={true}
          />
        </div>

        <ThreeColumnsContainer className="px-12  h-[20%]">
          <div>
            <h1 className="pt-4 pb-2 font-bold leading-tight">
              {itemData.label}
            </h1>
            <FieldsFactory
              data={itemData}
              {...head(cleandFieldStructure)}
              {...classNameFieldConfigs}
            />
          </div>
          <div></div>
          {imgData && hasAnyRepresentationInfo(imgData) && (
            <div>
              <div>{getRepresentationLegend(imgData)}</div>
              <div className="text-sm">{getRepresentationCreator(imgData)}</div>
              <div className="text-sm">
                {getRepresentationCopyright(imgData)}
              </div>
            </div>
          )}
        </ThreeColumnsContainer>
      </div>
    
  );
};
