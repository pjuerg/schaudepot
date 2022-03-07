// components/coreset/FieldsFactory.js

import PropTypes from "prop-types";

import prop from "ramda/src/prop";

// import {
//   BUTTON_COMPONENT_ITEMS_FROM_ARTIST,
//   EQUIVALENT,
//   SUBJECT_OF,

// } from "../../utils/constants";
import {
  isArrayAndhasIdDataAtDataAtKey,
  isArrayOnlyAtDataAtKey,
  isStringAtDataAtKey,
  // isTruthyAtDataAtKey,
  // rowKeyEquals,
} from "../../utils/utilsFields";

// import { EquivalentOffers, AdditionalMedia } from "../descriptionfields/AdditionalMedia";
import {
  BasicDescriptionFieldFactory,
  BasicDescriptionFieldsByArrayWithDataId,
  BasicDescriptionFieldsByArrayWithoutDataId,
} from "../descriptionfields/GenericDescriptionFields";


/*
 * *** FieldsFactory  ***
 * ----------------------------------
 * @remember extended but the same as @seee SectionsFields
 * TODO merge with SectionsFields, problem is design
 */

export const FieldsFactory = ({ data, fields, className = "", ...props }) => {

  return (
    <div className={`${className}`}>
      {fields.map((rowStructure, index) => {
        const { key } = rowStructure;
        const dataAtKey = prop(key, data);

        // if (rowKeyEquals(EQUIVALENT, rowStructure)) {
        //   return <EquivalentOffers key={index} {...data} />;
        // } else if (rowKeyEquals(SUBJECT_OF, rowStructure)) {
        //   return <PDFLink key={index} {...data} />;
        // } else if (
        //   rowKeyEquals(BUTTON_COMPONENT_ITEMS_FROM_ARTIST, rowStructure)
        // ) {
        //   return (
        //     <ItemsToPersonButton key={index} {...data} {...rowStructure} />
        //   );
        // } else 
        if (isStringAtDataAtKey(dataAtKey)) {
          // Change data for api DescriptionFieldFactory
          const objFromString = { value: dataAtKey, label: rowStructure.label };
          return (
            <BasicDescriptionFieldFactory
              key={index}
              dataAtKey={objFromString}
              rowStructure={rowStructure}
              {...props}
            />
          );
        }
        // representation images: checked if they exsist and add
        // additional media: true, media itself is in represetation
        // else if (isTruthyAtDataAtKey(dataAtKey)) {
        //   return <AdditionalMedia key={index} {...data} />;
        // }
        // field is part of arr with id, maybe multiply values
        else if (isArrayAndhasIdDataAtDataAtKey(dataAtKey, rowStructure)) {
          return (
            <BasicDescriptionFieldsByArrayWithDataId
              key={index}
              dataAtKey={dataAtKey}
              rowStructure={rowStructure}
              {...props}
            />
          );
        }
        // field is part of arr, show all
        else if (isArrayOnlyAtDataAtKey(dataAtKey, rowStructure)) {
          return (
            <BasicDescriptionFieldsByArrayWithoutDataId
              key={index}
              dataAtKey={dataAtKey}
              rowStructure={rowStructure}
              {...props}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
};
FieldsFactory.propTypes = {
  fields: PropTypes.array, // generated and cleaned fieldstructure form item or person
  data: PropTypes.object, // transforme data like person or item
};
