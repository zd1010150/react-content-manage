import { get } from 'store/http/httpAction';
import { SET_DATA, SET_MERGED_DATA } from './actionTypes';

export const setData = (originalKeys, data) => ({
      type: SET_DATA,
      payload: { originalKeys, data },
    });

export const tryFetchLeads = ids => dispatch =>
    get(`/admin/leads/merge/index?${ids}`, {}, dispatch).then((data) => {
      if (data
          && !_.isEmpty(data.index)
          && !_.isEmpty(data.index.data)
          && !_.isEmpty(data.selector_meta)
          && !_.isEmpty(data.selector_meta.data)) {
        dispatch(setData(data.selector_meta.data, data.index.data));
      }
    });


//
export const setMergedData = (key, value) => ({
      type: SET_MERGED_DATA,
      payload: { key, value },
    });