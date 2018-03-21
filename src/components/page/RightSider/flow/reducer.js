import { PAGE_UI_RIGHTSIDER_TOGGLE, PAGE_UI_RIGHTSIDER_SETTING } from './actionType';

export const rightSider = (state = {
  collapsed: true, children: '', width: 300, onCollapse: () => {},
}, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case PAGE_UI_RIGHTSIDER_TOGGLE:
      return Object.assign({}, state, { collapsed: payload.collapsed });
    case PAGE_UI_RIGHTSIDER_SETTING:
      return Object.assign({}, state, { ...payload });
    default:
      return state;
  }
};
