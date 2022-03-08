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
import { exists } from "../../../libs/rmd-lib/exists";

/*
 * *** SlidesGallery ***
 * ---------------------
 */

const typoThumbClassname =
  "border-2 border-white  text-xl text-center font-light flex items-center justify-center pb-6";

const Thumb = ({ className = "", index, label, children }) => (
  <div
    className={`${className} relative h-32 bg-gray-200  leading-none drop-shadow-md overflow-hidden `}
  >
    {children}
    <div className="absolute bottom-0 left-0 w-full px-2 py-0.5 overflow-hidden text-sm bg-white text-ellipsis whitespace-nowrap">
      <span className="text-xs font-light">{index}</span>
      {exists(label) && <span className="px-2 font-light">|</span>}
      <span className="font-light">{label}</span>
    </div>
  </div>
);
const ItemThumb = ({ path, ...props }) => {
  const { items } = useContext(CoresetStateContext);
  const itemId = splitAtLastSlash(path);
  const { representation, label } = findAtId(itemId, items);
  return (
    <Thumb {...props} label={label}>
      <LinkedArtImage
        {...getPreviewImage(representation, IMAGE_SIZE_MD)}
        className="transition-transform duration-500 ease-in-out linkedArtImg--coresetMenu hover:scale-110"
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
      className="absolute text-5xl leading-none cursor-pointer top-4 right-2 md:right-20 group"
    >
      <div>
        <span className="pr-2 text-xs font-light text-gray-100 group-hover:text-yellow-400">
          schließen
        </span>
        <span
          className="text-gray-100 group-hover:text-yellow-400"
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
        className="fixed left-0 top-10 pt-28 z-40 h-[calc(100vh-40px)] bg-gradient-to-b from-teal  via-gray-800 to-gray-800  overflow-y-auto"
      >
        <CloseButton clickHandler={closeClickHandler} />
        <div className="grid grid-cols-6 gap-2 px-16 ">
          {slides &&
            slides.map((route, index) => (
              <div
                key={route}
                className="p-2 cursor-pointer"
                onClick={thumbClickHandler(route)}
              >
                <SlideFactory
                  path={route}
                  index={index}
                  components={ThumbComponents}
                />
              </div>
            ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
