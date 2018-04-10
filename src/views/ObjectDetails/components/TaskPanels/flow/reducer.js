import Enums from 'utils/EnumsManager';
const {
  opportunities,
  taskOpen,
  taskHistory,
  emailSent,
  attachments,
  logs,
} = Enums.DetailModules;
import {
  SET_TASK_DATA,
} from './actionTypes';

const getInitialState = () => {
  const initialState = {};
  Enums.DetailModulesInArray.forEach(module => {
    initialState[module] = {
      data: [],
      current: 1,
    };
  });
  return initialState;
};
const initialState = getInitialState();

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASK_DATA:
      const { data, meta, taskType } = action.payload;
      return {
        ...state,
        [taskType]: {
          data,
          // current,
        }
      };


    default:
      return state;
  }
};

export default tasks;