import { SAVE_FAILED, SAVE_SUCCESS, RESET_VIEW } from './actionTypes';

const initialState = {
  hasSuccessfullySaved: false,
};

const actions = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_SUCCESS:
      return {
        hasSuccessfullySaved: true,
      };
    
    case RESET_VIEW:
      return initialState;
      
    default:
      return state;
  }
};

export default actions;