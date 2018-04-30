/* eslint-disable no-case-declarations */
import { SET_ACCOUNT_OPPORTUNITIES } from './actionTypes';

const initialState = {
  columns: [],
  data: [],
  meta: {},
};

const accountOpportunities = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCOUNT_OPPORTUNITIES:
      const { columns, data, meta } = action.payload;
      return {
        ...state,
        columns,
        data,
        meta,
      };


    default:
      return state;
  }
};

export default accountOpportunities;
