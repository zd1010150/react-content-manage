import { RESET, SET_ACCOUNT_ID } from './actionTypes';

const convertStatus = (state = '', action) => {
  switch (action.type) {
    case SET_ACCOUNT_ID:
      const { accountId } = action.payload;
      return accountId;

    case RESET:
      return '';

    default:
      return state;
  }
};

export default convertStatus;
