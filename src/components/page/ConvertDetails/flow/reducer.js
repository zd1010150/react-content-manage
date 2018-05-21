import { RESET, SET_DETAILS, SET_SIMILAR_DATA } from './actionTypes';
import { mapToStore } from './utils';

const initialState = {
  ownerId: '',
  owners: [],
  opportunityName: '',
  withNewOpportunity: false,
  accountStatus: '',
  createAccountName: '',
  similarAccounts: [],
  similarNum: 0,
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


    case SET_SIMILAR_DATA:
      const { similarData } = action.payload;
      return {
        ...state,
        similarNum: similarData.length,
      };


    case RESET:
      return initialState;


    default:
      return state;
  }
};

export default convertDetails;
