/* eslint-disable no-case-declarations */
import { SET_SECTIONS } from './actionTypes';

const initialState = {
  sections: [],
  mappedValues: [],
};

const details = (state = initialState, action) => {
  switch (action.type) {
    case SET_SECTIONS:
      const { mappedValues, sections } = action.payload;
      return {
        ...state,
        sections: _.sortBy(sections, ['sequence']),
        mappedValues,
      };


    default:
      return state;
  }
};

export default details;
