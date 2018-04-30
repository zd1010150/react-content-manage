import { get, httpDelete } from 'store/http/httpAction';
import Enums from 'utils/EnumsManager';
import { SET_ACCOUNT_OPPORTUNITIES } from './actionTypes';

const { DefaultPageConfigs } = Enums;
const { PageSizeSmall } = DefaultPageConfigs;
//
const setData = (columns, data, meta, tableParams) => ({
  type: SET_ACCOUNT_OPPORTUNITIES,
  payload: { columns, data, meta, tableParams },
});

export const tryFetchData = (objectId, params = { per_page: PageSizeSmall }) => dispatch =>
  get(`/admin/opportunities/object/account/${objectId}`, params, dispatch).then((data) => {
    if (data
        && !_.isEmpty(data.index)
        && data.index.data
        && data.index.meta
        && !_.isEmpty(data.selector_meta)
        && data.selector_meta.data) {
      debugger;
      dispatch(setData(data.selector_meta.data, data.index.data, data.index.meta, params));
    }
  });


//
export const tryDeleteById = (id, objectId) => dispatch =>
  httpDelete(`/admin/opportunities/${id}`, {}, dispatch).then((data) => {
    if (data && data.deleted) {
      dispatch(tryFetchData(objectId));
    }
  });
