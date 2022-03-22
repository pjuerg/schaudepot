// components/coreset/slides/item.js

import { useContext } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import compose from "ramda/src/compose";
import head from "ramda/src/head";
import prop from "ramda/src/prop";
import identity from "ramda/src/identity";
import find from "ramda/src/find";
import propEq from "ramda/src/propEq";

import { splitAtLastSlash } from "../../../libs/rmd-lib/splitAtLastSlash";
import { findAtId } from "../../../libs/rmd-lib/findAtId";
import { commaIfNotLast } from "../../../libs/rmd-lib/commaIfNotLast";
import { fetcher } from "../../../libs/fetcher";
import { maybe } from "../../../libs/rmd-lib/maybe";

import { BsInfoSquare } from "react-icons/bs";

import {
  getPreviewImage,
  getRepresentationCopyright,
  getRepresentationCreator,
  getRepresentationLegend,
  hasAnyRepresentationInfo,
} from "../../../utils/utilsImage";
import { useIsMobil } from "../../../libs/hooks/useResponsiveShortcut";
import { checkDistractionMode } from "../../../utils/utilsCoreset";
import { getFieldsData } from "../../../utils/utilsFields";
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

import { switchDistractionModeDispatcher } from "../menus/NavigationMenu";

/*
 * *** Item Slide  ***
 * --------------------
 * @remember all loadind in central page [...slides].js
 */

const idDataArchiveNumber = "300404620";
const titleFields = [
  { key: TIMESPAN },
  { key: CLASSIFIED_AS, idData: "300435443" },
  { key: IDENTIFIED_BY, idData: idDataArchiveNumber },
];

const fieldStructure = [{ fields: titleFields }];

const useItemDataWithRouter = () => {
  const { items } = useContext(CoresetStateContext);
  const itemId = compose(splitAtLastSlash, prop("asPath"))(useRouter());
  return findAtId(itemId, items);
};

const ImageInfo = ({ imgData }) => {
  const creator = getRepresentationCreator(imgData);
  const copyright = getRepresentationCopyright(imgData);
  return (
    <div className="flex pt-2 text-xs font-light">
      {/* <div className="pr-1">BildInformationen:</div> */}
      {/* <div>{getRepresentationLegend(imgData)}</div> */}
      {creator && <div className="pr-2">{creator}</div>}
      {copyright && <div>{copyright}</div>}
    </div>
  );
};

// const ImageInfo = ({ imgData, isItemInfoVisible, clickHandler}) => {
//   return (
//     <div className="px-0 pb-4 text-sm font-light md:px-4 lg:px-0">
//       {isItemInfoVisible ? (
//         <>
//           <div
//             className="flex font-normal text-gray-500 cursor-pointer hover:underline"
//             onClick={clickHandler}
//           >
//             Bildinformationen
//             <MdExpandLess className="relative top-1"  />
//           </div>
//           <div>{getRepresentationLegend(imgData)}</div>
//           <div>{getRepresentationCreator(imgData)}</div>
//           <div>{getRepresentationCopyright(imgData)}</div>
//         </>
//       ) : (
//         <div
//           className="flex font-normal text-gray-500 cursor-pointer hover:underline"
//           onClick={clickHandler}
//         >
//           Bildinformationen <MdExpandMore className="relative top-1" />
//         </div>
//       )}
//     </div>
//   );
// };

export const ItemSlide = () => {
  // const [isItemInfoVisible, showItemInfo] = useState(false)
  // const switchItemInfo = () => showItemInfo(!isItemInfoVisible)
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
  const fields = compose(prop("fields"), head)(cleandFieldStructure);
  const fieldData = getFieldsData(fields, itemData);
  const imgData = maybe(head)(representation);
  const isMobil = useIsMobil();
  const isDistractionMode = checkDistractionMode(distractionMode, isMobil);
  const isNotDistractionMode = !isDistractionMode;
  const switchDistractionModeHandler = !isMobil
    ? switchDistractionModeDispatcher(dispatch, distractionMode)
    : identity;

  const classNameImage = isDistractionMode ? "h-[93%]" : "h-[80%] ";
  const classNameText = isDistractionMode ? "h-[7%]" : "h-[20%] ";
  const classNameDescription = isDistractionMode
    ? "pt-0 font-light"
    : "pt-4 pb-2";

  const date = compose(
    prop("value"),
    find(propEq("key", "timespan"))
  )(fieldData);
 
  return (
    <div className="flex flex-col h-full ">
      <div className={`${classNameImage} grow py-8`}>
        <LinkedArtImage
          // onClickHandler={switchDistractionModeHandler}
          {...getPreviewImage(representation)}
          className=" linkedArtImg--slide"
          showLoading={true}
        />
      </div>

      <div
        className={`${classNameText} flex-col px-4 md:pl-6 lg:px-20 -ml-2 leading-none`}
      >
        <div>
          {isNotDistractionMode ? (
            <>
              <h1 className={`${classNameDescription} pt-4 pb-1`}>
                {itemData.label}
              </h1>
              <div className="flex text-sm font-light">
                {fieldData.map(({ value, label, id }, index) => (
                  <div key={index} className="pr-1">
                    {id === idDataArchiveNumber ? (
                      <span>
                        {label} {value}
                      </span>
                    ) : (
                      <span>{value}</span>
                    )}
                    {commaIfNotLast(fieldData, index)}
                  </div>
                ))}
                <a
                  className="text-sm font-light underline"
                  href={absoluteLinkItem(itemData.id)}
                >
                  zur Beschreibung in der Werkdatenbank
                </a>
              </div>
            </>
          ) : (
            <>
              <h1 className={`${classNameDescription} inline-block pt-4 pb-1`}>
                {itemData.label}
              </h1>
              {date && <span className="font-light">, {date}</span>}
              <a
                className="relative px-3 inline-block text-lg font-light hover:text-yellow-500 top-0.5"
                href={absoluteLinkItem(itemData.id)}
              >
                <BsInfoSquare />
              </a>
            </>
          )}
        </div>

        {isNotDistractionMode && hasAnyRepresentationInfo(imgData) && (
          <ImageInfo imgData={imgData} />
        )}
      </div>
    </div>
  );
};
