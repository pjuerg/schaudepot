// components/linkedartimage/LinkedArtImage
import { useRef, useState, useEffect, forwardRef, memo } from "react";
import PropTypes from "prop-types";

import Link from "next/link";
import { Loading } from "../Loading";

// import __ from "ramda/src/__";
// import split from "ramda/src/split";
// import compose from "ramda/src/compose";
// import last from "ramda/src/last";
// import join from "ramda/src/join";
// import init from "ramda/src/init";
// import apply from "ramda/src/apply";

/*
 * *** LinkedArtImage ***
 * ----------------------
 *
 */

// const roundTo10 = (n) => Math.ceil(n / 10) * 10;
// const isPortrait = (w, h) => roundTo10(w) > roundTo10(h);
// const isPortraitByDimension = apply(isPortrait);

export const IMAGE_SIZE_MD = "640";
export const IMAGE_SIZE_XS = "320";

export const useImageLoadingState = (imgRef, hasImage) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const current = imgRef.current;
    if (current && current.complete) {
      setLoaded(true);
    }
    if (!hasImage) {
      setLoaded(true);
    }
  }, [setLoaded, imgRef, hasImage]);

  return [loaded, setLoaded];
};

const ImageWrapper = forwardRef(
  ({ setLoaded, lazy, src, alt, icon, showLoading, loaded, children, onClickHandler=()=>null }, ref) => {
    // const suffix = compose(last, split("."))(src);
    // const path = compose(join("."), init, split("."))(src);

    // @remember srcset with media queries difficult, never load the right image format
    // problem is to understand sizes
    // @see https://www.mediaevent.de/html/srcset.html
    // @see https://ericportis.com/posts/2014/srcset-sizes/
    // const src320 = `${path}_320w.${suffix}`;
    // const src640 = `${path}_640w.${suffix}`;
    // const srcOriginal = src;
    // console.log('link', loaded, showLoading);
    return (
      <>
        {loaded === false && showLoading && (
          <Loading className="flex items-center justify-center h-full" />
        )}

        <div className="relative linkedArtImg-wrapper">
          {icon && icon}

          {/* @remember code for nextjs/image needs in configs the image server */}
          {/* <Image
          placeholder="blur".
            className="linkedArtImg-src"
            src={src}
            layout={undefined}
            width={width}
            height={height}
          />
           */}
          <img
            onClick={onClickHandler}
            // srcset={`${src320} 320w, ${src640} 640w, ${srcOriginal} 1000w`}
            // sizes="(max-width: 1024px) 320px, 640px"
            src={src}
            alt={alt}
            ref={ref}
            lazy={lazy}
            className="linkedArtImg-src"
            onLoad={() => setLoaded(true)}
          />
          {children}
        </div>
      </>
    );
  }
);
ImageWrapper.displayName = "ImageWrapper";
ImageWrapper.defaultProps = {
  lazy: "eager",
};

// @remember is lazy image @see https://hangindev.com/blog/create-a-lazy-loading-image-component-with-react-hooks
export const LinkedArtImage = ({
  href,
  className,
  hasRepresentation,
  dimension,
  enterAnchorHandler,
  ...props
}) => {
  const imgRef = useRef();
  const [loaded, setLoaded] = useImageLoadingState(imgRef, hasRepresentation);
  const stateLoaded = loaded ? "s-loaded" : "";
  const anchorEvents = {
    onMouseEnter: () => enterAnchorHandler && enterAnchorHandler(),
  };
  return (
    <>
      {href ? (
        <Link href={href}>
          <a {...anchorEvents}>
            <div className={`${stateLoaded} linkedArtImg ${className}`}>
              <ImageWrapper {...props} setLoaded={setLoaded} ref={imgRef} />
            </div>
          </a>
        </Link>
      ) : (
        <div className={`${stateLoaded} linkedArtImg ${className}`}>
          <ImageWrapper
            {...props}
            setLoaded={setLoaded}
            ref={imgRef}
            loaded={loaded}
          />
        </div>
      )}
    </>
  );
};
LinkedArtImage.defaultProps = {
  alt: "",
  className: "",
  hasRepresentation: true,
  showLoading: false,
};
LinkedArtImage.propTypes = {
  // array with width and height to get landscape or not
  // dimension: PropTypes.array.isRequired,
  href: PropTypes.string,
  hasRepresentation: PropTypes.bool,
  // with and height of the images
  dimension: PropTypes.array,
  src: PropTypes.string.isRequired,
  hasRepresentation: PropTypes.bool,
  alt: PropTypes.string,
  className: PropTypes.string,
  // mouseOver action e.g. for prefetching
  enterAnchorHandler: PropTypes.func,
};

export const MemoizedLinkArtImage = memo(LinkedArtImage);
