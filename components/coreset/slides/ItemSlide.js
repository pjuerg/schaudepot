// components/coreset/slides/item.js

import { useContext } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import compose from "ramda/src/compose";
import head from "ramda/src/head";
import prop from "ramda/src/prop";
import identity from "ramda/src/identity";

import { splitAtLastSlash } from "../../../libs/rmd-lib/splitAtLastSlash";
import { findAtId } from "../../../libs/rmd-lib/findAtId";
import { fetcher } from "../../../libs/fetcher";
import { maybe } from "../../../libs/rmd-lib/maybe";

import {
  getPreviewImage,
  getRepresentationCopyright,
  getRepresentationCreator,
  getRepresentationLegend,
  hasAnyRepresentationInfo,
} from "../../../utils/utilsImage";
import { useIsMobil } from "../../../libs/hooks/useResponsiveShortcut";
import { checkDistractionMode } from "../../../utils/utilsCoreset";
import {
  CLASSIFIED_AS,
  IDENTIFIED_BY,
  TIMESPAN,
} from "../../../values/constants";
import { absoluteLinkItem } from "../../../utils/routes";
import { apiSite } from "../../../utils/api";
import {
  CoresetDispatchContext,
  CoresetStateContext,
} from "../../../store/CoresetContext";
import { removeEmptySectionsAndAddMissingLabels } from "../../../values/structureHelper";
import { LinkedArtImage } from "../../linkedartimage";
import { FieldsFactory } from "../FieldsFactory";
import { TwoColumnsContainer } from "../Container";
import { switchDistractionModeDispatcher } from "../menus/NavigationMenu";
import { classNameFieldConfigs } from "./coverSlide";

/*
 * *** Item Slide  ***
 * --------------------
 * @remember all loadind in central page [...slides].js
 */

const titleFields = [
  { key: TIMESPAN },
  { key: IDENTIFIED_BY, idData: "300404620" },
  { key: CLASSIFIED_AS, idData: "300435443", textOnly: true },
];

const fieldStructure = [{ fields: titleFields }];

const useItemDataWithRouter = () => {
  const { items } = useContext(CoresetStateContext);
  const itemId = compose(splitAtLastSlash, prop("asPath"))(useRouter());
  return findAtId(itemId, items);
};

export const ItemSlide = () => {
  const { distractionMode } = useContext(CoresetStateContext);
  const dispatch = useContext(CoresetDispatchContext);
  const itemData = useItemDataWithRouter();
  const { data: dataSite } = useSWR(apiSite(), fetcher);
  const { representation } = itemData;
  const cleandFieldStructure = removeEmptySectionsAndAddMissingLabels(
    "item",
    dataSite,
    fieldStructure,
    itemData
  );
  const imgData = maybe(head)(representation);
  const isMobil = useIsMobil();
  const isDistractionMode = checkDistractionMode(distractionMode, isMobil);
  const isNotDistractionMode = !isDistractionMode;
  const switchDistractionModeHandler = !isMobil
    ? switchDistractionModeDispatcher(dispatch, distractionMode)
    : identity;

  const classNameImage = isDistractionMode ? "h-[92%]" : "h-[80%] ";
  const classNameText = isDistractionMode ? "h-[8%]" : "h-[20%] ";
  const classNameDescription = isDistractionMode
    ? "pt-0 font-light"
    : "pt-4 pb-2";

  return (
    <div className="flex flex-col h-full ">
      <div className={`${classNameImage} grow py-8`}>
        <LinkedArtImage
          onClickHandler={switchDistractionModeHandler}
          {...getPreviewImage(representation)}
          className=" linkedArtImg--slide"
          showLoading={true}
        />
      </div>

      <TwoColumnsContainer
        className={`${classNameText} flex-col  md:flex-row px-4 md:pl-6 lg:px-20 -ml-2 leading-none`}
      >
        <div>
          <h1 className={`${classNameDescription} pt-4 pb-1`}>
            {itemData.label}
          </h1>
          {isNotDistractionMode && (
            <FieldsFactory
              data={itemData}
              {...head(cleandFieldStructure)}
              {...classNameFieldConfigs}
            />
          )}
          <a
            className="text-sm font-light underline"
            href={absoluteLinkItem(itemData.id)}
          >
            zur Beschreibung in der Werkdatenbank
          </a>
        </div>

        {isNotDistractionMode && hasAnyRepresentationInfo(imgData) && (
          <div className="px-0 pt-2 pb-4 text-sm font-light md:pt-12 md:pb-0 md:px-4 lg:px-0">
            <div>Bildnachweis</div>
            <div>{getRepresentationLegend(imgData)}</div>
            <div>{getRepresentationCreator(imgData)}</div>
            <div>{getRepresentationCopyright(imgData)}</div>
          </div>
        )}
      </TwoColumnsContainer>
    </div>
  );
};
