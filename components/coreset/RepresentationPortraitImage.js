import { getPreviewImage, getRepresentationCopyright, getRepresentationCreator, getRepresentationLegend, hasAnyRepresentationInfo } from "../../utils/utilsImage";
import { LinkedArtImage } from "../linkedartimage";

export const RepresentationPortraitImage = ({ representation }) => {
  const imgData = representation[0];
  return (
    <div className="flex flex-col h-full">
      {/* <div className="relative flex flex-col items-center justify-center h-full font-light"> */}
      <LinkedArtImage
        {...getPreviewImage(representation)}
        className="linkedArtImg--slidePortrait pt-10 h-[80%] grow px-8"
        showLoading={true}
      />
      {/* <div> */}
      <div className="h-[20%] text-sm font-light py-4 px-2 md:px-4 lg:p-8">
        {hasAnyRepresentationInfo(imgData) && (
          <div className="pt-4">
            <div >Bildnachweis</div>
            <div>{getRepresentationLegend(imgData)}</div>
            <div >{getRepresentationCreator(imgData)}</div>
            <div >{getRepresentationCopyright(imgData)}</div>
          </div>
        )}
      </div>
    </div>
  );
};
