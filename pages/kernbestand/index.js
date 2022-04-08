// pages/kernbestand/index.js

import Link from "next/link";
import useSWR from "swr";
import { Loading } from "../../components/Loading";
import { fetcher } from "../../libs/fetcher";
import { apiEvents } from "../../utils/api";

import { ROUTE_CORESET } from "../../utils/routes";
import { transformEventListing } from "../../values/event";

/*
 * *** All Coreset-Front-Page ***
 * ------------------------------
 */

const Listing = ({ data:{member} }) => {
  return (
    <ul>
      {member.map(({ id, label }, index) => (
        <li key={index} className="p-4 mb-4 bg-gray-300">
          <Link href={`${ROUTE_CORESET}/${id}`}>
            <a className="hover:underline">{label}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default function Frontpage() {
  const { data } = useSWR(apiEvents(), fetcher);
  const transformedData = transformEventListing(data);
  // console.log(data);
  // console.log(transformedData);

  return (
    <>
      {!data ? (
        <Loading className="items-center justify-center h-[80%]" />
      ) : (
        <div className="w-64 mx-auto text-xl mt-44">
          <div>
            <h1 className="pb-8 font-bold">Alle Schaudepots</h1>
            <h1 className="pb-8 font-bold">Diese Page serverseitig mit Banner und Menübar!</h1>
            <Listing data={transformedData} />
          </div>
        </div>
      )}
    </>
  );
}
