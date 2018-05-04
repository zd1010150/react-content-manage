import { SET_MODULES, SET_MODULE_DATA } from './actionTypes';

const initialState = {
  modules: [],
};

const subpanels = (state = initialState, action) => {
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

      
    default:
      return state;
  }
};

export default subpanels;
