import moment from 'moment';
import momentTz from 'moment-timezone';
import Enums from './EnumsManager';
import { getStore } from './localStorage';

const { DateTimeConfigs, LocalStorageKeys } = Enums;
const {
  DefaultApiDateFormat,
  DefaultApiTimeFormat,
  DefaultOffset,
  DateFormatKey,
  TimeFormatKey,
} = DateTimeConfigs;
const { Timezone } = LocalStorageKeys;

// All possible utc offset list pls refer to https://en.wikipedia.org/wiki/List_of_UTC_time_offsets

export const getTimeSetting = (isTime) => {
  const timezone = getStore(Timezone);
  const parsedTimezone = JSON.parse(timezone);

  if (!parsedTimezone) {
    return {
      format: 'N/A',
    };
  }

  const key = isTime ? TimeFormatKey : DateFormatKey;
  let format;
  if (parsedTimezone[key]) {
    format = parsedTimezone[key];
  } else {
    format = isTime ? DefaultApiTimeFormat : DefaultApiDateFormat;
  }
  const offset = parsedTimezone.offset ? parsedTimezone.offset : DefaultOffset;
  return {
    format,
    offset,
  };
};


/**
 * Convert UTC date/time to specific timezone date/time, or null if value is invalid
 *
 * @param {string} str: could be a date string or datetime string, e.g. '2018-03-06 20:00:00'
 * @param {boolean} isConvertingTime: whether the result should be converted to a date or datetime string
 *
 */
export const toTimezone = (str, isConvertingTime = false) => {
  const targetSettings = getTimeSetting(isConvertingTime);
  const sourceFormat = isConvertingTime ? DefaultApiTimeFormat : DefaultApiDateFormat;

  if (!moment(str, sourceFormat).isValid()) {
    return null;
  }
  return moment.utc(str, sourceFormat).utcOffset(targetSettings.offset).format(targetSettings.format);
};

/**
 * Convert specific timezone date/time to UTC date/time, or null if value is invalid
 *
 * @param {string} str: could be a date string or datetime string, e.g. '2018-03-06 20:00:00'
 * @param {boolean} isConvertingTime: whether the result should be converted to a date or datetime string
 *
 */
export const toUtc = (str, isConvertingTime = false) => {
  const sourceSettings = getTimeSetting(isConvertingTime);
  const targetFormat = isConvertingTime ? DefaultApiTimeFormat : DefaultApiDateFormat;

  if (!moment(str, sourceSettings.format).isValid()) return null;
  if (isConvertingTime) {
    return moment.parseZone(`${str} ${sourceSettings.offset}`, `${sourceSettings.format} ZZ`).utc().format(targetFormat);
  }
  return moment(str, sourceSettings.format).format(targetFormat);
};

/**
 * Format offset to a valid string in '+xx00' or '-xx00'
 * @param {number} value
 */
export const stringifyOffset = (value) => {
  if (!_.isNumber(value) || value < -11 || value > 14) {
    console.warn('The offset has invalid type or value!');
    return '+0000';
  }
  const sign = value < 0 ? '-' : '+';
  const absValue = Math.abs(value);
  const offset = absValue < 10 ? `0${absValue}00` : `${absValue}00`;
  return `${sign}${offset}`;
};

export const getOffsetByTimeZone = (timezone) => {
  const a = momentTz.tz(timezone).utcOffset() / 60;
  console.log(`tz is ${a}`);
  return console.log(stringifyOffset(a));
};

getOffsetByTimeZone('America/New_York');
getOffsetByTimeZone('Australia/Sydney');
getOffsetByTimeZone('Australia/Sydn');

// !!!deprecated, please use toUtc or toTimezone to convert date/datetime
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
