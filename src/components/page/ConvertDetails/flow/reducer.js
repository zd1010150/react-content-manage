import { RESET, SET_DETAILS, SET_SIMILAR_DATA, SET_OWNERS, SET_FIELD_VALUE } from './actionTypes';
import { mapToStore } from './utils';

const initialState = {
  ownerId: '',
  owners: [],
  opportunityName: '',
  withoutNewOpportunity: false,
  accountStatusId: '',
  createAccountName: {},
  similarAccounts: [],
};

const convertDetails = (state = initialState, action) => {
  switch (action.type) {
    case SET_DETAILS:
      const { details } = action.payload;
      const mappedData = mapToStore(details);
      return {
        ...state,
        ...mappedData,
      };


    case SET_OWNERS:
      const { owners } = action.payload;
      return {
        ...state,
        owners,
      };


    case SET_SIMILAR_DATA:
      const { similarAccounts } = action.payload;
      return {
        ...state,
        similarAccounts,
      };


    case SET_FIELD_VALUE:
      const { name, value } = action.payload;
      return {
        ...state,
        [name]: value,
      };


    case RESET:
      return initialState;


    default:
      return state;
  }
};

export default convertDetails;
