import { PAGE_UI_RIGHTSIDER_TOGGLE, PAGE_UI_RIGHTSIDER_SETTING } from './actionType';

export const toggleRightSider = collapsed => ({
  type: PAGE_UI_RIGHTSIDER_TOGGLE,
  collapsed,
});
export const settingRightSider = args => ({
  type: PAGE_UI_RIGHTSIDER_SETTING,
  ...args,
});
