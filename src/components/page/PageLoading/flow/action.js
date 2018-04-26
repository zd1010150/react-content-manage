import { PAGE_UI_PAGE_LOADING_TOGGLE, PAGE_UI_PAGE_LOADING_SETTING } from './actionType';

export const togglePageloading = isShow => ({
  type: PAGE_UI_PAGE_LOADING_TOGGLE,
  isShow,
});
export const settingPageloading = args => ({
  type: PAGE_UI_PAGE_LOADING_SETTING,
  ...args,
});
