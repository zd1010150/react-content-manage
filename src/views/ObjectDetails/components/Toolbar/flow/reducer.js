import { DELETE_SUCCESS, RESET, SET_TOOLS } from './actionTypes';

const initialState = {
  tools: [],
  deleted: false,
};

const toolbar = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOOLS:
      const { tools } = action.payload;
      return {
        ...state,
        tools: _.sortBy(tools, ['sequence']),
      };


    case DELETE_SUCCESS:
      return {
        ...state,
        deleted: true,
      };


    case RESET:
      return initialState;

      
    default:
      return state;
  }
};

export default toolbar;
