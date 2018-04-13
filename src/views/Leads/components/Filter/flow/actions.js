import { get } from 'store/http/httpAction';
import { getUrlByViewId } from 'utils/common';
import Enums from 'utils/EnumsManager';

import { SET_VIEWS, SET_ACTIVE_ID } from './actionTypes';
import { setTableData } from '../../Table/flow/actions';

const setViews = json => ({
  type: SET_VIEWS,
  payload: json,
});

export const fetchViews = () => dispatch => get('/admin/list_views/object/leads', {}, dispatch).then(json => {
  if (json && (!_.isEmpty(json.data))) {
    dispatch(setViews(json))
    dispatch(setActiveId(Enums.PhantomId));
  }
});


const setActiveId = id => ({
  type: SET_ACTIVE_ID,
  payload: { id },
});

export const fetchTableDataByView = (
  page = 1,
  per_page = Enums.DefaultPageConfigs.PageSize,
  orderBy = '',
  sortedBy = '',
  activeId = Enums.PhantomId,
) => dispatch => get(getUrlByViewId(activeId, 'leads'), { page, per_page, orderBy, sortedBy }, dispatch).then(json => {
  if (json && (!_.isEmpty(json.index))) {
    dispatch(setTableData(json, { orderBy, sortedBy }));
    dispatch(setActiveId(activeId));
  }
});