import { get } from 'store/http/httpAction';
import _ from 'lodash';
import { GLOBAL_SEARCH_SET_RESULTS } from './actionType';

export const setSearchResult = args => ({
  type: GLOBAL_SEARCH_SET_RESULTS,
  ...args,
});

export const fetchResultFromRemote = search = dispatch => get('/admin/objects/search', { search }, dispatch).then((data) => {
  if (!_.isEmpty(data)) {
    setSearchResult(data);
  }
});
