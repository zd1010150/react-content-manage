import { combineReducers } from 'redux';
import moment from 'moment';
import EnumsManager from 'utils/EnumsManager';
import { TASK_LIST_PAGENATIONS, TASK_LIST_DATA, TASK_LIST_PERIOD, TASK_STATUS } from './actionType';
import { ALL_STATUS } from './config';

const tasks = (state = [], action) => {
  const { type, ...payload } = action;
  switch (type) {
    case TASK_LIST_DATA:
      return payload.data;
    default:
      return state;
  }
};
const taskDataTablePagination = (state = { perPage: EnumsManager.DefaultPageConfigs.PageSize, currentPage: 1, total: 0 }, action) => {
  switch (action.type) {
    case TASK_LIST_PAGENATIONS:
      return {
        perPage: action.perPage,
        currentPage: action.currentPage,
        total: action.total,
      };
    default:
      return state;
  }
};
const period = (state = { start: moment().format('YYYY-MM-DD'), end: moment().format('YYYY-MM-DD'), overDue: true }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case TASK_LIST_PERIOD:
      return Object.assign({}, state, { ...payload });
    default:
      return state;
  }
};

const selectedStatus = (state = ALL_STATUS.OVERDUE_TODAY, action) => {
  const { type, status } = action;
  switch (type) {
    case TASK_STATUS:
      return status;
    default:
      return state;
  }
};


export default combineReducers({
  period,
  taskDataTablePagination,
  tasks,
  selectedStatus,
});

