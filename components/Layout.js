// components/Layout.js

import PropTypes from "prop-types";

import Head from "next/head";

import { DevInfo } from "./DevInfo";
import { TopBar, GlobalNavigation } from "./depot";

/*
 *  *** Layout  ***
 * -----------------
 *
 */

// *** default export ***

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

      {children}

      {/* TODO show only in dev with env-var */}
      <DevInfo />
    </div>
  );
}
Layout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any.isRequired
};
