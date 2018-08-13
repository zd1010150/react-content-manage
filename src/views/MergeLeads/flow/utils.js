import { toUtc } from 'utils/dateTimeUtils';
import _ from 'lodash';
import Enums from 'utils/EnumsManager';

const { FieldTypes, MasterKey } = Enums;
const { DateOnly, DateTime, Lookup } = FieldTypes;
const toApi = (mergedData, keys, sourceData) => {
  const dataCopy = _.cloneDeep(mergedData);
  // First, need to remove master record id, due to request format, see more on our POSTMAN doc
  delete dataCopy[MasterKey];
  // Second, convert all data to utc format

  keys.forEach((key) => {
    for (let i = 0; i < sourceData.length; i++) {
      if (_.isObject(sourceData[i][key.key]) && dataCopy[key.key] === sourceData[i][key.key].id) {
        dataCopy[key.key] = sourceData[i].id;
      }
      if (!_.isObject(sourceData[i][key.key]) && dataCopy[key.key] === sourceData[i][key.key]) {
        dataCopy[key.key] = sourceData[i].id;
      }
    }
  });
  return dataCopy;
};

const compareFieldValue = (key, data, type) => {
  for (let i = 1; i < data.length; i++) {
    // Notes: for Lookup field, we need to compare id instead of raw value itself
    const target = type === Lookup ? (_.isPlainObject(data[0][key]) ? data[0][key].id : null) : data[0][key];
    const source = type === Lookup ? (_.isPlainObject(data[i][key]) ? data[i][key].id : null) : data[i][key];
    if (target !== source) {
      return false;
    }
  }
  return true;
};

const setDefaultCheckedData = (keys, data) => {
  const obj = {};
  keys.forEach((key) => {
    const property = key.key;
    const shouldChecked = compareFieldValue(property, data, key.type);
    if (shouldChecked) {
      obj[property] = key.type === Lookup ? (_.isPlainObject(data[0][property]) ? data[0][property].id : null) : data[0][property];
    }
  });
  return obj;
};

export {
  toApi,
  setDefaultCheckedData,
};