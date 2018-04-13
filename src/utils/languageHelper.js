import _ from 'lodash';
export const deconstructionObj = (obj,rootKey) => {
  const result = {};
  const traverseObj = (rootKey, root) => {
    for (const key of Object.keys(root)) {
      if (!_.isObject(root[key])) {
        result[`${rootKey}.${key}`] = root[key];
      } else {
        traverseObj(`${rootKey}.${key}`, root[key]);
      }
    }
  };
  traverseObj(rootKey, obj);
  return result;
};
export const deconstructLanguage = (root, language,rootKey) => {
  const result = {};
  for (const key of Object.keys(root)) {
    result[key] = root[key][language];
  }
  return deconstructionObj(result,rootKey);
};
