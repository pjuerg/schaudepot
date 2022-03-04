// components/descriptionfields/AdditionalMedia

import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";

import __ from "ramda/src/__";
import tail from "ramda/src/tail";

import { splitAtLastSlash } from "../../libs/rmd-lib/splitAtLastSlash";
import { ACCESS_POINT } from "../../utils/constants";
import { GATEWAY } from "../../utils/api";
import {
  getImageData,
  getRepresentationLegend,
  hasPreview,
  IsFormatImage,
  loadImageFromObject,
} from "../../utils/utilsImage";

/*
 * *** Addional Media ***
 * -----------------------
 */

export const AdditionalMedia = ({ representation }) => {
  const {asPath} = useRouter();
  const mediaObjs = hasPreview(representation) ? tail(representation) : representation;
  
  return (
    <>
      {mediaObjs.map((obj, index) => {

         return (
           <div key={index} className="inline-block h-48 my-4 mr-4 ">
             {IsFormatImage(obj.format) ? (
               <Link href={`${asPath}/${index + 2}`}>
                 <a onMouseEnter={() => loadImageFromObject(obj)}>
                   <img
                     //  loading="lazy"
                     alt=""
                     // TODO smaller images in server then getImageData(obj, IMAGE_SIZE_XS)
                     {...getImageData(obj)}
                     className="w-auto h-full border-2 border-white filter drop-shadow-md"
                   />
                 </a>
               </Link>
             ) : (
               <div>
                 <a
                   href={`${GATEWAY}${obj[ACCESS_POINT]}`}
                   className="underline"
                 >
                   {getRepresentationLegend(obj) || obj.label}
                 </a>
                 , Format {splitAtLastSlash(obj.format)}
               </div>
             )}
           </div>
         );
      })}
    </>
  );
};
AdditionalMedia.propTypes = {
  // transformed dataobject e.g. item person
  data: PropTypes.object, 
};
