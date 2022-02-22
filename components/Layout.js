// components/Layout.js

import PropTypes from "prop-types";
import { useContext } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

import { animations } from "../utils/animations";
import { DepotStateContext } from "../store/DepotContext";
import { TopBar, GlobalNavigation } from "./depot";
import { DevInfo } from "./DevInfo";


/*
 *  *** Layout  ***
 * -----------------
 */

export default function Layout({
  children,
  title = "This is the default title",
}) {
  const { asPath } = useRouter();
  const { direction } = useContext(DepotStateContext);
  let animation = null;
  if( direction === 1) animation = animations[0];
  else if (direction === -1)  animation = animations[1];
  
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopBar />
      <GlobalNavigation />

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
      {/* TODO show only in dev with env-var */}
      <DevInfo />
    </div>
  );
}
Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any.isRequired,
};
