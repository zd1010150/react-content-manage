import Enums from 'utils/EnumsManager';
import { toTimezone } from 'utils/dateTimeUtils';
import { SET_DATA, SET_MERGED_DATA } from './actionTypes';
const { FieldTypes, MasterKey } = Enums;
const {
  DateOnly,
  DateTime,
} = FieldTypes;


const parseKeys = keys => {
  keys.unshift({
    field_name: MasterKey,
  });
  return keys.map(key => ({
    isFollowMaster: !!key.is_merge_master,
    key: key.field_name,  // this is the field we use as a key to sync with backend for changes
    label: key.field_label,
    // options: key.picklists,
    type: key.crm_data_type,
  }));
};
const convertToTimeZone = (data, keys) => {
  data.forEach(record => {
    keys.forEach(key => {
      if (key.type === DateOnly || key.type === DateTime) {
        const format = key.type === DateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss';
        record[key.key] = toTimezone(record[key.key], '+1100', format);
      }
    });
  });
};

const initialState = {
  data: [],
  keys: [],  
  mergedData: [],
};

const mergence = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      const { originalKeys, data } = action.payload;
      // parse original keys
      const parsedKeys = parseKeys(originalKeys);
      // process data of Date, Datetime
      const transferredData = convertToTimeZone(data, parsedKeys);

      return {
        ...state,
        keys: parsedKeys,
        data,
      };


    case SET_MERGED_DATA:
      const { key, value } = action.payload;
      if (!key) return state;
      return {
        ...state,
        mergedData: {
          ...state.mergedData,
          [key]: value,
        }
      };


    default:
      return state;
  }
};

export default mergence;