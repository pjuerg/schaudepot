// pages/[depot]/item/[item].js
import PropTypes from "prop-types";
import Head from "next/head";
import { ROUTE_PETER, SimpleLink } from "../../index";

/*
 * *** Item page ***
 * - - - - - - - - - - - - - - - -
 */


const BasicItemInfo = () => {
  return (
    <div className="">
      Ruderboot <br />
      <SimpleLink url={`${ROUTE_PETER}/info/`}>
        Page More Info / Ende
      </SimpleLink>
    </div>
  );
};

const MoreItemInfo = () => {
  return (
    <div className="">
      Weiere Metadata <br />
    </div>
  );
};

const ItemCaption = () => {
  return (
    <div className="">
      Caption
    </div>
  );
};

const  ItemContainer = () => {
  return (
    <div className="flex items-center justify-center mb-8 ">
      <div className="flex items-center justify-center w-64 bg-yellow-200 h-96">
        hello image
      </div>
    </div>
  );
}

const ThreeColumnsContainer = ({className, children}) => {
  return (
    <div className={`${className} flex px-4`}>
      <div className="w-1/3">{children[0]}</div>
      <div className="w-1/3">{children[1]}</div>
      <div className="w-1/3">{children[2]}</div>
    </div>
  );
};
ThreeColumnsContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.array.isRequired,
};


export default function Itempage() {
  return (
    <div>
      <Head>
        <title>Werke Page</title>
        <meta name="description" content="TODO" />
      </Head>

      <main>
        <ItemContainer />
        <ThreeColumnsContainer>
          <BasicItemInfo />
          <MoreItemInfo />
          <ItemCaption />
        </ThreeColumnsContainer>
      </main>
    </div>
  );
}
