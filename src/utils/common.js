import Enums from './EnumsManager';
import { getStore } from 'utils/localStorage';

const { FieldTypes } = Enums;
const { DateOnly, DateTime } = FieldTypes;


export const mapToAPIOrderStr = (order = 'ascend') => {
  return Enums.SortOrders[order];
};

export const getUrlByViewId = (id, object) => {
  return id === Enums.PhantomId ? `/admin/${object}` : `/admin/${object}/by_list_view/${id}`;
};

/**
 * Get min and max number based on precision and scale, and return an object with min and max values
 * @param {number} precision 
 * @param {number} scale 
 */
export const getRange = (precision, scale = 0) => {
  if (!precision || precision <= scale) {
    return {
      min: Number.NEGATIVE_INFINITY,
      max: Number.POSITIVE_INFINITY,
    }
  }

  const maxNum = 9;
  let min = '';
  let max = '';

  for (let i = 0; i < precision - scale; i++) {
    max += maxNum;
  }
  if (scale > 0) {
    max += '.';
    for (let j = 0; j < scale; j++) {
      max += maxNum;
    }
  }
  return {
    min: Number(`-${max}`),
    max: Number(max),
  };
};

/**
 * Find matched theme by object type, otherwise return empty string
 * @param {string} type 
 */
export const getThemeByType = type => {
  const typeInLowerCase = type ? type.toLowerCase() : '';
  return Enums.ObjectTypesThemesMapping[typeInLowerCase]
          ? Enums.ObjectTypesThemesMapping[typeInLowerCase]
          : '';
};


export const concatArrayParams = params => {
  if (!_.isArray(params)) return '';
  return params.reduce((accumulator, currentValue) => `${accumulator}&ids[]=${currentValue}`, '');
};


/**
 * getAuthorization
 */
export const getAuthorization = () => {
  const loginUser = getStore(Enums.LocalStorageKey);
  if (_.isEmpty(loginUser)) {
    return '';
  }
  const userData = JSON.parse(loginUser).token_info;
  if (_.isEmpty(userData)) {
    return '';
  }
  const { token_type, access_token } = userData;
  return `${token_type} ${access_token}`;
};


const getFlatTree = (tree, newTree, key = 'child_team_rec') => {
  tree.forEach((node) => {
    if (_.isEmpty(node[key])) {
      return newTree.push(node);
    }
    newTree.push(node);
    return getFlatTree(node[key], newTree);
  });
};

/**
 * 
 * @param {*} tree
 */
export const flattenTree = (tree, key) => {
  const flatTree = [];
  getFlatTree(tree, flatTree, key);
  return flatTree;
};

/**
 * Check if field type is a data or date time type
 * @param {string} type
 */
export const isDateRelatedType = (type) => {
  if (_.isEmpty(type) || !_.isString(type)) return false;
  return type === DateOnly || type === DateTime;
};
