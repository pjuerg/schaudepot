import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useContext } from "react";
import test from "ramda/src/test";

import { animations } from "../utils/animations";
import { CoresetStateContext } from "../store/CoresetContext";

const regExCoresetPage = /\/kernbestand\/(\d+)/g;

export default function LayoutTransition({ children }) {
  const { asPath } = useRouter();
  const { direction } = useContext(CoresetStateContext);
  const isCoresetPage = test(regExCoresetPage, asPath);

  let animation = null;
  if (isCoresetPage && direction === 1) animation = animations[0];
  else if (isCoresetPage && direction === -1) animation = animations[1];

  return (
    <AnimatePresence
      exitBeforeEnter={true}
      initial={false}
      onExitComplete={() => window.scrollTo(0, 0)}
  >
      <motion.div
        key={asPath}
        initial="initial"
        animate={animation !== null && "animate"}
        // exit="exit"
        variants={animation && animation.variants}
        transition={animation && animation.transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
