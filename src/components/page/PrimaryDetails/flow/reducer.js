/* eslint-disable no-case-declarations */
import { SET_SECTIONS } from './actionTypes';
import mapSections from './utils/mapSections';

const initialState = {
  sections: [],
};

const details = (state = initialState, action) => {
  switch (action.type) {
    case SET_SECTIONS:
      const { mappedValues, sections } = action.payload;
      return {
        ...state,
        sections: mapSections(sections, mappedValues),
      };


    default:
      return state;
  }
};

export default details;
