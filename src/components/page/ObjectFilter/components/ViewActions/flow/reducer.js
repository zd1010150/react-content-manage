import { DONE, RESET_VIEW } from './actionTypes';

const actions = (state = false, action) => {
  switch (action.type) {
    case DONE:
      return true;


    case RESET_VIEW:
      return false;


    default:
      return state;
  }
};

export default actions;
