// pages/index.js
import Head from 'next/head'
import Link from "next/link";

import {H1} from '../components/designSystem'


/*
 * *** Depot index page   ***
 * --------------------------
 */


export const ROUTE_PETER = "/peter-Schmidt-23";
export const ROUTE_HOME = "/";



export const CenteredContainer = ({ className, children }) => (
  <div className={`${className} flex justify-center items-center`}>
    {children}
  </div>
);

export const SimpleLink = ({ className = "mt-4", url, children }) => (
  <Link href={url}>
    <a className={`${className} inline-block text-3xl text-red hover:underline`}>
      {children}
    </a>
  </Link>
);
export default function Frontpage() {
  return (
    <div>
      <Head>
        <title>Alle Schaudepots</title>
        <meta name="description" content="DO" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <CenteredContainer className="h-screen">
          <div>
            <H1>Alle Schaudepots</H1>
            <ul>
              <li>Nice Grid with Thumbnails alle Schaudepots</li>
              <li>
                routing use zones with rewrite rules
                https://nextjs.org/docs/advanced-features/multi-zones
              </li>
              <li>
                <SimpleLink url={ROUTE_PETER}>
                  Schaudepot Peter Schmidt
                </SimpleLink>
              </li>
            </ul>
          </div>
        </CenteredContainer>
      </main>
    </div>
  );
}
