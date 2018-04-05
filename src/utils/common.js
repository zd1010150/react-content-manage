import Enums from './EnumsManager';

export const mapToAPIOrderStr = (order = 'ascend') => {
  return Enums.SortOrders[order];
};

export const getUrlByViewId = (id, object) => {
  return id === Enums.PhantomID ? `/admin/${object}` : `/admin/${object}/by_list_view/${id}`;
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
  return Enums.ObjectTypesThemesMapping[type]
          ? Enums.ObjectTypesThemesMapping[type]
          : '';
};
