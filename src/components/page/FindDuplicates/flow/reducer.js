import {
  SET_DUPLICATES,
  SET_ROW_SELECTION,
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


    case SET_ROW_SELECTION:
      const { selectedRowKeys } = action.payload;
      return {
        ...state,
        selectedRowKeys,
      };

      
    default:
      return state;
  }
};

export default duplicates;