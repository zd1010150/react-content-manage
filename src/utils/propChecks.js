import Enums from 'utils/EnumsManager';

const { ObjectTypes, ObjectTypesInArray } = Enums;
const { Leads, Accounts, Opportunities } = ObjectTypes;

export const isValidClientTypes = (props, propName, componentName) => {
  const clientTypes = [Leads, Accounts, Opportunities];
  if (clientTypes.indexOf(props[propName]) === -1) {
    return new Error(`Cannot find client type in ${propName} of ${componentName}.`);
  }
};

export const isValidObjectTypes = (props, propName, componentName) => {
  if (ObjectTypesInArray.indexOf(props[propName]) === -1) {
    return new Error(`No supported Object Types can be found in ${componentName}.`);
  }
};
