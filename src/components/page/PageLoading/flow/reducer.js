import { HTTP_ACTION_DOING, HTTP_ACTION_DONE, HTTP_ACTION_ERROR } from 'store/loading/constants';
import { PAGE_UI_PAGE_LOADING_TOGGLE, PAGE_UI_PAGE_LOADING_SETTING } from './actionType';


export const pageLoading = (state = {
  isShow: false, pageLoadingClass: '', spinConfig: {},
}, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case HTTP_ACTION_DOING:
      return Object.assign({}, state, { isShow: true });
    case HTTP_ACTION_DONE:
    case HTTP_ACTION_ERROR:
      return Object.assign({}, state, { isShow: false });
    case PAGE_UI_PAGE_LOADING_TOGGLE:
      return Object.assign({}, state, { isShow: payload.isShow });
    case PAGE_UI_PAGE_LOADING_SETTING:
      return Object.assign({}, state, { ...payload });
    default:
      return state;
  }
};

