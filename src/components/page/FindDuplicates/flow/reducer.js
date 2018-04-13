import {
  SET_DUPLICATES,
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

    default:
      return state;
  }
};

export default duplicates;