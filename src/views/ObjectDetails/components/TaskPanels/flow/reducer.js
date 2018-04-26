import { SET_MODULES, SET_MODULE_DATA, RESET } from './actionTypes';

const initialState = {
  modules: [],
};

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODULE_DATA:
      const { code, data, meta } = action.payload;
      return {
        ...state,
        [code]: {
          data,
          meta,
        },
      };


    case SET_MODULES:
      const { modules } = action.payload;
      return {
        ...state,
        modules: _.sortBy(modules, ['sequence']),
      };


    case RESET:
      return initialState;

      
    default:
      return state;
  }
};

export default tasks;
