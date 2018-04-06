import { SET_TOOLS } from './actionTypes';

const initialState = {
  tools: [],
};

const toolbar = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOOLS:
      const { tools } = action.payload;
      // TODO: to be removed, only for test purpose
      const newTools = [
        {
          code: 'convert',
          sequence: 0,
        },
        {
          code: 'delete',
          sequence: 4,
        },
        {
          code: 'sharing',
          sequence: 3,
        },
        {
          code: 'findDuplicates',
          sequence: 1,
        },
      ];
      // test ends
      return {
        ...state,
        tools: _.sortBy(newTools, ['sequence']),
      };


    default:
      return state;
  }
};

export default toolbar;