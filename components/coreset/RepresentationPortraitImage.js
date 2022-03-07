import { getPreviewImage, getRepresentationCopyright, getRepresentationCreator, getRepresentationLegend, hasAnyRepresentationInfo } from "../../utils/utilsImage";
import { LinkedArtImage } from "../linkedartimage";

export const RepresentationPortraitImage = ({ representation }) => {
  const imgData = representation[0];
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <LinkedArtImage
        {...getPreviewImage(representation)}
        className="linkedArtImg--slidePortrait"
        showLoading={true}
      />
      {hasAnyRepresentationInfo(imgData) && (
        <div className="pt-4">
          <div className="text-sm">Bildnachweis</div>
          <div>{getRepresentationLegend(imgData)}</div>
          <div className="text-sm">{getRepresentationCreator(imgData)}</div>
          <div className="text-sm">{getRepresentationCopyright(imgData)}</div>
        </div>
      )}
    </div>
  );
};
