// components/coreset/navigation/gallery.js

import { useContext } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import thunkify from "ramda/src/thunkify";

import useScrollBlock from "../../../libs/hooks/useScrollBlock";
import { splitAtLastSlash } from "../../../libs/rmd-lib/splitAtLastSlash";
import { findAtId } from "../../../libs/rmd-lib/findAtId";

import { animations } from "../../../utils/animations";

import { getPreviewImage } from "../../../utils/utilsImage";
import { SlideFactory } from "../SlideFactory";
import { CoresetStateContext } from "../../../store/CoresetContext";
import { LinkedArtImage } from "../../linkedartimage";
import { IMAGE_SIZE_MD } from "../../linkedartimage/LinkedArtImage";

/*
 * *** SlidesGallery ***
 * ---------------------
 */

const typoThumbClassname = "border-2 border-white p-4";

const Thumb = ({ className = "", children }) => (
  <div
    className={`${className} h-28  bg-white font-semibold leading-none drop-shadow-md`}
  >
    {children}
  </div>
);
const ItemThumb = ({ path, ...props }) => {
  const { items } = useContext(CoresetStateContext);
  const itemId = splitAtLastSlash(path);
  const { representation } = findAtId(itemId, items);
  return (
    <Thumb {...props}>
      <LinkedArtImage
        {...getPreviewImage(representation, IMAGE_SIZE_MD)}
        className="linkedArtImg--coresetMenu"
      />
    </Thumb>
  );
};

// const CoverThumb = (props) => {
//   return <Thumb {...props}>Start</Thumb>;
// };
// const AddendumThumb = (props) => {
//   return <Thumb {...props}>Weitere Informationen</Thumb>;
// };
// const IntroThumb = (props) => {
//   return <Thumb {...props}>Biografisches</Thumb>;
// };

const ThumbComponents = {
  cover: <Thumb className={typoThumbClassname}>Start</Thumb>,
  intro: <Thumb className={typoThumbClassname}>Biografisches</Thumb>,
  item: <ItemThumb />,
  addendum: <Thumb className={typoThumbClassname}>Weitere Informationen</Thumb>,
};

// TODO almost identical to @see CloseButton ImageZoom
const CloseButton = ({ clickHandler }) => {
  return (
    <div
      onClick={clickHandler}
      className="absolute text-5xl leading-none cursor-pointer top-4 right-2 md:right-8 group"
    >
      <div>
        <span className="pr-2 text-xs text-teal group-hover:text-yellow-400">
          schließen
        </span>
        <span
          className="text-teal group-hover:text-yellow-400"
          dangerouslySetInnerHTML={{ __html: "&#10005;" }}
        />
      </div>
    </div>
  );
};


export const SlidesGallery = ({ isOpenItemMenu, slides, closeHandler }) => {
  const router = useRouter();
  const animation = isOpenItemMenu ? animations[0] : animations[2];
  const [blockScroll, allowScroll] = useScrollBlock();
  const thumbClickHandler = thunkify((route) => {
    closeHandler();
    allowScroll();
    router.push(route);
  });
  const closeClickHandler = () => {
    closeHandler();
    allowScroll();
  };
  // prevent background page vom scrolling
  isOpenItemMenu && blockScroll();

  return (
    <AnimatePresence exitBeforeEnter={false} initial={true}>
      <motion.div
        initial="initial"
        animate="animate"
        // exit="exit"
        variants={animation.variants}
        transition={animation.transition}
        onClick={closeClickHandler}
        className="fixed left-0 top-10 pt-28 z-40 h-[calc(100vh-40px)]  bg-gray-300 overflow-y-auto"
      >
        <CloseButton clickHandler={closeClickHandler} />
        <div className="grid grid-cols-6 gap-2 px-16 ">
          {slides &&
            slides.map((route) => (
              <div
                key={route}
                className="p-2 cursor-pointer"
                onClick={thumbClickHandler(route)}
              >
                <SlideFactory path={route} components={ThumbComponents} />
              </div>
            ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
