import {
  SET_VISIBILITY_OPTION,
  RESET_VIEW,
} from './actionTypes';
import Enums from 'utils/EnumsManager';

const initialState = {
  selectedOption: Enums.ViewVisibilityIds.Me,
};

const visibilities = (state = initialState, action) => {
  switch (action.type) {
    case SET_VISIBILITY_OPTION:
      const { selectedOption } = action.payload;
      return {
        ...state,
        selectedOption,
      };

    case RESET_VIEW:
      return initialState;

    default:
      return state;
  }
};

export default visibilities;