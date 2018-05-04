import moment from 'moment';
import { MINIMUM_YEAR } from 'config/app.config.js';
import { getStore } from './localStorage';

// possible utc offset list pls refer to https://en.wikipedia.org/wiki/List_of_UTC_time_offsets

/**
 *
 * @param {string} timeStr normal time string, e.g. '2018-03-06 20:00:00'
 * @param {string} offset compared to UTC, e.g. AUS will be '+1100'
 * @param {string} format datetime format based on user company setting
 * offset and formats should be found in global settings
 *
 * Convert UTC time to specific timezone time
 */
export const toTimezone = (timeStr, offset, format) => moment.utc(timeStr).utcOffset(offset).format(format);

/**
 *
 * @param {string} timeStr normal time string, e.g. '2018-03-06 20:00:00'
 * @param {string} offset compared to UTC, e.g. AUS will be '+1100'
 * @param {string} format datetime format based on user company setting
 * offset and formats should be found in global settings
 *
 * Convert specific timezone time to UTC time
 */
export const toUtc = (timeStr, offset, format) => moment.utc(`${timeStr}${offset}`).format(format);

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

