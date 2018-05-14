/* eslint arrow-parens: ["error", "as-needed"] */
/* eslint no-case-declarations: [0] */
import Enums from 'utils/EnumsManager';
import { toTimezone } from 'utils/dateTimeUtils';
import { MERGE_SUCCESS, RESET, SET_DATA, SET_MASTER_RECORD, SET_MERGED_DATA } from './actionTypes';

const { FieldTypes, MasterKey } = Enums;
const {
  DateOnly,
  DateTime,
  Display,
  Lookup,
} = FieldTypes;

const parseKeys = keys => {
  // const masterKey = keys.find(key => key.field_name === MasterKey);
  const masterKey = {
    is_merge_master: false,
    field_name: MasterKey, // this is the field we use as a key to sync with backend for changes
    field_label: '',
    crm_data_type: Display,
    lookupKey: '',
  };
  const restKeys = keys.filter(key => key.field_name !== MasterKey);
  // return [...restKeys].map(key => ({
  return [masterKey, ...restKeys].map(key => ({
    isFollowMaster: !!key.is_merge_master,
    key: key.field_name, // this is the field we use as a key to sync with backend for changes
    label: key.field_label,
    type: key.crm_data_type,
    lookupKey: key.lookup_own_field_name,
  }));
};

const convertToTimeZone = (data, keys) => {
  data.forEach(record => {
    keys.forEach(key => {
      if (key.type === DateOnly || key.type === DateTime) {
        record[key.key] = record[key.key] === null ? null : toTimezone(record[key.key], key.type === DateTime);
      }
    });
  });
};

const initialState = {
  data: [],
  keys: [],
  mergedData: {},
  mergeSuccess: false,
};

const mergence = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      const { originalKeys, data } = action.payload;
      // parse original keys
      const parsedKeys = parseKeys(originalKeys);
      // process data of Date, Datetime
      convertToTimeZone(data, parsedKeys);
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
        },
      };

    
    case SET_MASTER_RECORD:
      const { masterId } = action.payload;
      const masterRecord = state.data.find(record => record.id === masterId);
      const masteredFields = {};
      state.keys.forEach(key => {
        if (key.isFollowMaster) {
          masteredFields[key.key] = masterRecord[key.key];
          if (key.type === Lookup) {
            masteredFields[key.key] = masterRecord[key.key]
                                        ? masterRecord[key.key].id
                                        : null;
          }
        }
      });
      
      return {
        ...state,
        mergedData: {
          ...state.mergedData,
          ...masteredFields,
          id: masterId,
          master_record_id: masterId,
        },
      };


    case MERGE_SUCCESS:
      return {
        ...state,
        mergeSuccess: true,
      };


    case RESET:
      return initialState;


    default:
      return state;
  }
};

export default mergence;
