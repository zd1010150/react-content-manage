import moment from 'moment';
import { get } from 'store/http/httpAction';
import { TASK_LIST_PAGENATIONS, TASK_LIST_DATA, TASK_LIST_PERIOD, TASK_STATUS } from './actionType';

export const setTaskStatus = status => ({
  type: TASK_STATUS,
  status,
});
const setPaginations = (perPage, currentPage, total) => ({
  type: TASK_LIST_PAGENATIONS,
  perPage,
  currentPage,
  total,
});
export const setPeriod = (start, end, overDue) => ({
  type: TASK_LIST_PERIOD,
  start,
  end,
  overDue,
});
export const setListData = data => ({
  type: TASK_LIST_DATA,
  data,
});
export const fetchData = ({
  per_page,
  page,
  start_day,
  end_day,
  has_overdue,
}, dispatch) => get('/admin/tasks/me/index', {
  per_page,
  page,
  start_day,
  end_day,
  current_day: has_overdue ? moment().format('YYYY-MM-DD') : '',
  has_overdue: has_overdue ? 'YES' : 'NO',
}, dispatch).then((data) => {
  dispatch(setListData(data.data || []));
  const { pagination } = data.meta;
  dispatch(setPaginations(pagination.per_page, pagination.current_page, pagination.total));
});

export const queryByPaging = (perPage, currentPage) => (dispatch, getState) => {
  const { start, end, overDue } = getState().task.period;
  return fetchData({
    per_page: perPage,
    page: currentPage,
    start_day: start,
    end_day: end,
    has_overdue: overDue,
  }, dispatch);
};
export const queryByPeriod = (start, end, overDue) => (dispatch, getState) => {
  const { perPage } = getState().task.taskDataTablePagination;
  dispatch(setPeriod(start, end, overDue));
  return fetchData({
    per_page: perPage,
    page: 1,
    start_day: start,
    end_day: end,
    has_overdue: overDue,
  }, dispatch);
};
