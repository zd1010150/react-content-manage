import Enums from 'utils/EnumsManager';
import { RESET, SET_DUPLICATES, SET_FIELD, SET_FIELDS, SET_ROW_SELECTION, TOGGLE_CHECKBOX } from './actionTypes';
const { FindDupConfigs } = Enums;
const { BaseFields } = FindDupConfigs;

const mapToStore = data => {
  const {
    name,
    last_name,
    company_name,
    email,
    phone,
  } = data;
  return {
    firstName: name,
    lastName: last_name,
    email,
    company: company_name,
    phone,
  };
};
const updateCollection = (key, isAdd, collection) => {
  let newCollection;
  if (isAdd) {
    newCollection = [ ...collection, key ];
    newCollection = _.uniq(newCollection);
  } else {
    newCollection = collection.filter(item => item !== key);
  }
  return newCollection;
};

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  phone: '',
  leads: [],
  accounts: [],
  hasSearched: false,
  selectedRowKeys: [],
  checkedFields: [],
};

const duplicates = (state = initialState, action) => {
  switch (action.type) {    
    case SET_FIELDS:
      const { data } = action.payload;
      const mappedData = mapToStore(data);
      const checkedFields = BaseFields.filter(field => !_.isEmpty(mappedData[field]));
      return {
        ...state,
        ...mappedData,
        checkedFields,
      };


    case SET_DUPLICATES:
      const { leads, accounts } = action.payload;
      return {
        ...state,
        accounts,
        leads,
        hasSearched: true,
      }

    
    case TOGGLE_CHECKBOX:
      const { checkedKey, checked } = action.payload;
      return {
        ...state,
        checkedFields: updateCollection(checkedKey, checked, state.checkedFields),
      };

  
    case SET_FIELD:
      const { fieldKey, value } = action.payload;
      return {
        ...state,
        [fieldKey]: value,
        checkedFields: updateCollection(fieldKey, !_.isEmpty(value), state.checkedFields),
      };


    case SET_ROW_SELECTION:
      const { selectedRowKeys } = action.payload;
      return {
        ...state,
        selectedRowKeys,
      };

    
    case RESET:
      return initialState;


    default:
      return state;
  }
};

export default duplicates;