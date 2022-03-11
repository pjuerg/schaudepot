// pages/kernbestand/index.js

import Link from "next/link";
import { coresetExamples } from "../../coresetConfigs";

import { ROUTE_CORESET } from "../../utils/routes";

/*
 * *** All Coreset-Front-Page ***
 * ------------------------------
 */

export default function Frontpage() {
  return (
    <>
      <div className="w-64 mx-auto text-xl mt-44">
        <div>
          <h1 className="pb-8 font-bold">Alle Schaudepots</h1>
          <ul>
            {coresetExamples.map(({ id }, index) => (
              <li key={index} className="p-4 mb-4 bg-gray-300">
                <Link href={`${ROUTE_CORESET}/${id}`}>
                  <a className="hover:underline">Schaudepot Person {id}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
