import { SET_MODULES, SET_TASK_DATA } from './actionTypes';


const initialState = {
  modules: [],
};

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case SET_TASK_DATA:
      const { data, meta, taskType } = action.payload;
      return {
        ...state,
      };


      case SET_MODULES:
        const { modules } = action.payload;
        return {
          ...state,
          modules,
        };


    default:
      return state;
  }
};

export default tasks;
