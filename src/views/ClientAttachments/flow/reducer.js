/* eslint-disable no-case-declarations */
import { SET_ATTACHMENT_INFO, SET_FIELD_VALUE, RESET } from './actionTypes';

const attachment = (state = {}, action) => {
  switch (action.type) {
    case SET_ATTACHMENT_INFO:
      const { data } = action.payload;
      return {
        ...data,
      };

    case SET_FIELD_VALUE:
      const { key, value } = action.payload;
      return {
        ...state,
        [key]: value,
      };

    case RESET:
      return {};

    default:
      return state;
  }
};

export default attachment;
