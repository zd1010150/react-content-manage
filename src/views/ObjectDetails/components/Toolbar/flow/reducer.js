import { SET_TOOLS } from './actionTypes';

const initialState = {
  tools: [],
};

const toolbar = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOOLS:
      const { tools } = action.payload;
      return {
        ...state,
        tools,
      };


    default:
      return state;
  }
};

export default toolbar;