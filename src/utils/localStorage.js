import _ from 'lodash';
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
export const getStore = (name) => {
  if (!name) return;
  return window.localStorage.getItem(name);
};

export const getStoreByKeys = (keyStr) => {
  const keyStrArr = keyStr.split('.');
  if (!_.isEmpty(keyStrArr)) {
    if (keyStrArr.length === 1) {
      return getStore(keyStrArr[0]);
    }
    const resetKey = keyStrArr.slice(1);
    const obj = JSON.parse(getStore(keyStrArr[0]));
    return _.get(obj, resetKey, '');
  } return '';
};
/**
 * 删除localStorage
 */
export const removeStore = (name) => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

// 同步redux的状态到localstorage里面
export const syncStateAndLocalStorage = (state) => {
  for (const o in state) {
    const value = state[o];
    setStore(o, typeof value === 'object' ? JSON.stringify(value) : value);
  }
};
