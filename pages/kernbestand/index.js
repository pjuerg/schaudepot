// pages/kernbestand/index.js

import Link from "next/link";
import { depotExamples } from "../../depotConfigs";

import { ROUTE_CORESET } from "../../utils/routes";

/*
 * *** All Coreset-Front-Page ***
 * ------------------------------
 */

export default function Frontpage() {
  return (
    <>
      <div className="w-64 mx-auto mt-20 text-xl">
        <div>
          <h1 className="font-bold">Alle Schaudepots</h1>
          <p className="p-2 my-8 text-lg text-yellow-700">
            Vorwärts und rückwärts
            <br />
            mit Pfeiltasten
          </p>
          <ul>
            {depotExamples.map(({ id }, index) => (
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
