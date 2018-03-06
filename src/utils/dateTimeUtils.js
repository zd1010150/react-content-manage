import moment from 'moment';
import { getStore } from './localStorage';

// possible utc offset list pls refer to https://en.wikipedia.org/wiki/List_of_UTC_time_offsets

/**
 * 
 * @param {string} timeStr normal time string, e.g. '2018-03-06 20:00:00'
 * @param {string} offset compared to UTC, e.g. AUS will be '+1100'
 * @param {string} format includes date and datetime formats based on user company setting
 * offset and all formats should be found in global settings
 * 
 * Convert UTC time to specific timezone time
 */
export const toTimezone = (timeStr, offset, format) => {
  return moment.utc(timeStr).utcOffset(offset).format(format);
};

/**
 * 
 * @param {string} timeStr normal time string, e.g. '2018-03-06 20:00:00'
 * @param {string} offset compared to UTC, e.g. AUS will be '+1100'
 * @param {string} format includes date and datetime formats based on user company setting
 * offset and all formats should be found in global settings
 * 
 * Convert specific timezone time to UTC time
 */
export const toUtc = (timeStr, offset, format) => {
  return moment.utc(`${timeStr}${offset}`).format(format);
};
