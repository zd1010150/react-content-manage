import { SET_VIEWS, SET_ACTIVE_ID } from './actionTypes';
import { get } from 'store/http/httpAction';

const url = '/admin/tasks-count';
// TODO: testing purpose, should be removed after link with crm auth
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2FwaS5zdGFnaW5nLmJyZWFrYWJsZS5jb20vdjEvYWRtaW4vbG9naW4iLCJpYXQiOjE1MTk4ODQ0NTEsImV4cCI6MTUxOTg5MTY1MSwibmJmIjoxNTE5ODg0NDUxLCJqdGkiOiJqMm00M2VnTjhwM1hDdVZNIiwic3ViIjoxLCJwcnYiOiJmNmI3MTU0OWRiOGMyYzQyYjc1ODI3YWE0NGYwMmI3ZWU1MjlkMjRkIn0.869qkG2Z_JYt97_L-FHDISe8TB0XSyd9bjQU8kSvNes';
const auth = {
  Authorization: `Bearer ${token}`
}
// ends

const setViews = json => ({
  type: SET_VIEWS,
  payload: json,
});

export const fetchViews = (
  perPage = 2,
  currentPage = 1
) => dispatch => get(url, {}, dispatch, '', auth)
                  .then(json => {
                    debugger;
                    if (json && (!_.isEmpty(json.data))) {
                      dispatch(setViews(json))
                    }
                  });

export const setActiveId = id => ({
  type: SET_ACTIVE_ID,
  payload: { id },
});