import { SET_VIEWS, SET_ACTIVE_ID } from './actionTypes';
import { get } from 'store/http/httpAction';
const url = '/admin/list_views/object/leads';

const setViews = json => ({
  type: SET_VIEWS,
  payload: json,
});

export const fetchViews = (
  perPage = 2,
  currentPage = 1
) => dispatch => get(url, {}, dispatch)
                  .then(json => {
                    if (json && (!_.isEmpty(json.data))) {
                      dispatch(setViews(json))
                    }
                  });

export const setActiveId = id => ({
  type: SET_ACTIVE_ID,
  payload: { id },
});