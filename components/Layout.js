// components/Layout.js

import PropTypes from "prop-types";
import Head from "next/head";

import LayoutTransition from "./LayoutTransition";
import { Navigation as CoresetNavigation } from "./coreset";
import { Fixedbar as CoresetFixedbar } from "./coreset";
import { pageSectionTitle, pageTitle } from "../depotConfigs";
// import { DevInfoCoreset } from "./DevInfoCoreset";

/*
 *  *** Layout  ***
 * -----------------
 */

export default function Layout({
  children,
  title = "This is the default title",

}) {
  return (
    <>
      <Head>
        <title>{pageTitle} / {pageSectionTitle}
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/manifest.webmanifest" />
      </Head>

      <CoresetFixedbar />
      <CoresetNavigation />
      <LayoutTransition>{children}</LayoutTransition>
      {/* <DevInfoCoreset /> */}
    </>
  );
}
Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any.isRequired,
};
