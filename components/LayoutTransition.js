import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { useContext } from "react";

import { animations } from "../utils/animations";
import { DepotStateContext } from "../store/DepotContext";

export default function LayoutTransition({children}){
  const { asPath } = useRouter();
  const { direction } = useContext(DepotStateContext);
  let animation = null;
  if (direction === 1) animation = animations[0];
  else if (direction === -1) animation = animations[1];
  return (
    <AnimatePresence exitBeforeEnter={true}>
      <motion.div
        key={asPath}
        initial="initial"
        animate={animation !== null && "animate"}
        exit="exit"
        variants={animation && animation.variants}
        transition={animation && animation.transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}