import { toUtc } from 'utils/dateTimeUtils';
import Enums from 'utils/EnumsManager';

const { FieldTypes, MasterKey } = Enums;
const { DateOnly, DateTime } = FieldTypes;
const toApi = (data, keys) => {
  const dataCopy = _.cloneDeep(data);
  // First, need to remove master record id, due to request format, see more on our POSTMAN doc
  delete dataCopy[MasterKey];
  // Second, convert all data to utc format
  keys.forEach((key) => {
    if (key.type === DateOnly || key.type === DateTime) {
      if (dataCopy[key.key] !== undefined) {
        const value = dataCopy[key.key];
        dataCopy[key.key] = toUtc(value, key.type === DateTime);
      }
    }
  });

  return dataCopy;
};

const compareFieldValue = (key, data) => {
  for (let i = 1; i < data.length; i++) {
    if (data[i][key] !== data[0][key]) {
      return false;
    }
  }
  return true;
};

const setDefaultCheckedData = (keys, data) => {
  const obj = {};
  keys.forEach((key) => {
    const property = key.key;
    const shouldChecked = compareFieldValue(property, data);
    if (shouldChecked) {
      obj[property] = data[0][property];
    }
  });
  return obj;
};

export {
  toApi,
  setDefaultCheckedData,
};