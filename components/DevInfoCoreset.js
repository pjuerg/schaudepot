// components/DevInfoCoreset.js

import { useContext } from "react";

import prop from "ramda/src/prop";
import compose from "ramda/src/compose";

import { toString } from "../libs/rmd-lib/toString";
import { sortObject } from "../libs/rmd-lib/sortObject";

import {  CoresetStateContext } from "../store/CoresetContext";

/*
 * *** DevWindow Coreset***
 *  - - - - - - -
 *
 * Show global states
 */


const toStringProp = (prp) => compose(toString, prop(prp));

// *** components ***

const TableInfo = ({ data, title }) => (
  <table className="text-xs leading-relaxed">
    <tbody>
      <tr className="table-row">
        <td className="font-bold">{title}</td>
        <td></td>
      </tr>
      {Object.entries(data).map(([key, value]) => (
        <tr className="table-row " key={key}>
          <td className="pr-2 italic">{key}</td>
          <td className="">
            <div className="w-56 overflow-hidden truncate">
              {toStringProp(key)(data)};
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);


const CoresetContextInfo = () => {
  const state = sortObject(useContext(CoresetStateContext));
  return (
    <>
      <TableInfo data={state} title="Person Context" />
    </>
  );
};

// *** export ***

export const DevInfoCoreset = () => (
  // <div className="fixed bottom-8 right-8 px-4 py-2 mb-4 min-h-[12] bg-gray-800 text-white border">
  <div className="fixed bottom-8 right-8 px-4 py-2 mb-4 min-h-[12] bg-gray-800 text-white border">
    <div className="flex items-start justify-start">
      <CoresetContextInfo />
    </div>
  </div>
);
