import moment from 'moment';
import Enums from 'utils/EnumsManager';
import { getStore } from './localStorage';

const { LocalStorageKeys } = Enums;
const { Timezone } = LocalStorageKeys;
// possible utc offset list pls refer to https://en.wikipedia.org/wiki/List_of_UTC_time_offsets

const getTimeSetting = (isTime) => {
  const timezone = getStore(Timezone);
  const parsedTimezone = JSON.parse(timezone);

  const formatKey = isTime ? 'timeFormat' : 'dateFormat';
  const format = parsedTimezone[formatKey] ? parsedTimezone[formatKey] : 'YYYY-MM-DD';
  const offset = parsedTimezone.offset ? parsedTimezone.offset : '0000';
  return {
    format,
    offset: offset.indexOf('-') < 0 ? `+${offset}` : offset,
  };
};
/**
 *
 * @param {string} str: could be a date string or datetime string, e.g. '2018-03-06 20:00:00'
 * @param {boolean} isConvertingTime: whether the result should be converted to a date or datetime string
 *
 * Convert UTC time to specific timezone time
 */
export const toTimezone = (str, isConvertingTime = false) => {
  const timeSetting = getTimeSetting(isConvertingTime);
  return moment.utc(str).utcOffset(timeSetting.offset).format(timeSetting.format);
};

/**
 *
 * @param {string} str: could be a date string or datetime string, e.g. '2018-03-06 20:00:00'
 * @param {boolean} isConvertingTime: whether the result should be converted to a date or datetime string
 *
 * Convert specific timezone time to UTC time
 */
export const toUtc = (str, isConvertingTime = false) => {
  const timeSetting = getTimeSetting(isConvertingTime);
  if (isConvertingTime) {
    return moment.utc(`${str}${timeSetting.offset}`).format(timeSetting.format);
  }
  return str;
};
// TODO:
// add format and offset to localstorage to avoid extra params to function after confirm the json format of global setting response

export const moments = (() => {
  const startTime = Date.UTC(1970, 0, 2, 0, 0);
  const endTime = Date.UTC(1970, 0, 3, 0, 0);
  const moments = [];

  for (let t = startTime; t < endTime; t += 30 * 60 * 1000) {
    const tt = new Date(t);
    const hour = tt.getUTCHours();
    const minus = tt.getUTCMinutes();
    const moment = `${hour < 10 ? `0${hour}` : hour}:${minus < 10 ? `0${minus}` : minus}`;
    moments.push(moment);
  }
  return moments;
})();

export const years = (() => {
  const thisYear = new Date().getUTCFullYear();
  const result = [];
  for (let i = thisYear; i >= 1990; i--) {
    result.push(i);
  }
  return result;
})();

