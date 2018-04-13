import {
  SET_DUPLICATES,
  SET_FIELDS,
  SET_ROW_SELECTION,
  RESET,
} from './actionTypes';

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
};

const duplicates = (state = initialState, action) => {
  switch (action.type) {
    case SET_DUPLICATES:
      const { leads, accounts } = action.payload;
      return {
        ...state,
        accounts,
        leads,
        hasSearched: true,
      }

    
    case SET_FIELDS:
      const { data } = action.payload;
      const {
        name,
        last_name,
        email,
        company_name,
        phone,
      } = data;
      return {
        ...state,
        firstName: name,
        lastName: last_name,
        email: email,
        company: company_name,
        phone,
      };


    case SET_ROW_SELECTION:
      const { selectedRowKeys } = action.payload;
      return {
        ...state,
        selectedRowKeys,
      };

    
    case RESET:
      console.log('reseting');
      return initialState;


    default:
      return state;
  }
};

export default duplicates;