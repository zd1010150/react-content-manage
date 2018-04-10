import {
  SETUP_LAYOUT_EDIT_SET_CURRENT_LAYOUT,
} from '../actionType';

const layout = (state = {
  id: '',
}, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_LAYOUT_EDIT_SET_CURRENT_LAYOUT:
      return Object.assign({}, state, { ...payload });
    default:
      return state;
  }
};

export default layout;
