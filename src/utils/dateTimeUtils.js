import moment from 'moment';
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


const getTimeSetting = (isTime) => {
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
    offset: offset.indexOf('-') < 0 ? `+${offset}` : offset,
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
