
import { GLOBAL_SEARCH_SET_RESULTS } from './actionType';
import { OBJECT_TYPES } from 'config/app.config';

const { leads, accounts, opportunities } = OBJECT_TYPES;
const globalSearchResult = (state = { [leads]: [], [accounts]: [], [opportunities]: [] }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case GLOBAL_SEARCH_SET_RESULTS:
      return { ...payload };
    default:
      return state;
  }
};

export default globalSearchResult;

