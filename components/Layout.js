// components/Layout.js

import PropTypes from "prop-types";
import Head from "next/head";

import LayoutTransition from "./LayoutTransition";
import { TopBar, GlobalNavigation } from "./depot";
import { DevInfoDepot } from "./DevInfoDepot";

/*
 *  *** Layout  ***
 * -----------------
 */

export default function Layout({
  children,
  title = "This is the default title",
}) {
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
      <LayoutTransition>{children}</LayoutTransition>
      <DevInfoDepot />
    </div>
  );
}
Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any.isRequired,
};
