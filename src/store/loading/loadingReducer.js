import { HTTP_ACTION_DOING, HTTP_ACTION_DONE, HTTP_ACTION_ERROR } from './constants';

const initialState = {
  isLoading: false,
};
export default function loadingReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case HTTP_ACTION_DOING:
      return { ...state, isLoading: true };
    case HTTP_ACTION_DONE:
    case HTTP_ACTION_ERROR:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}
