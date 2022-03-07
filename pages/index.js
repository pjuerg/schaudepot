// pages/index.js

import Link from "next/link";

import { ROUTE_CORESET } from "../utils/routes";

/*
 * ** Coreset-Front-Page ***
 * --------------------------
 */

export default function Frontpage() {
  return (
    <>
      <div className="mx-auto text-xl mt-60 w-60 ">
        <h1 className="font-bold">Frontpage werkdatenbank</h1>
        <Link href={`${ROUTE_CORESET}`}>
          <a className="underline">Menüeintrag Schaudepots</a>
        </Link>
      </div>
    </>
  );
}
