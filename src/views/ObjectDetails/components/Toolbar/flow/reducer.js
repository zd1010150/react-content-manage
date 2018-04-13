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
          code: 'Convert',
          sequence: 0,
        },
        {
          code: 'Delete',
          sequence: 4,
        },
        {
          code: 'Sharing',
          sequence: 3,
        },
        {
          code: 'FindDuplicates',
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