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
  DefaultTimezone,
  UTCTimezone,
} = DateTimeConfigs;
const { Timezone } = LocalStorageKeys;

// All possible utc offset list pls refer to https://en.wikipedia.org/wiki/List_of_UTC_time_offsets

export const getTimeSetting = (isTime) => {
  const timezone = getStore(Timezone);
  const parsedTimezone = JSON.parse(timezone);

  if (!parsedTimezone) {
    return {
      format: 'N/A',
      code: DefaultTimezone,
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
  const code = parsedTimezone.code ? parsedTimezone.code : DefaultTimezone;
  return {
    format,
    offset,
    code,
  };
};

/**
 * Convert UTC date/time to specific timezone date/time, or null if value is invalid
 * @param {string} str: must in utc timezone, could be a date string or datetime string, e.g. '2018-03-06 20:00:00'
 * @param {boolean} isConvertingTime: whether the result should be converted to a date or datetime string
 *
 */
export const toTimezone = (str, isConvertingTime = false) => {
  const utcFormat = isConvertingTime ? DefaultApiTimeFormat : DefaultApiDateFormat;
  const targetSettings = getTimeSetting(isConvertingTime);
  // Convert to utc
  const utc = momentTz.tz(str, utcFormat, UTCTimezone);
  if (!utc.isValid()) return null;
  // Parse the utc to a specific zone
  return momentTz(utc).tz(targetSettings.code).format(targetSettings.format);
};

/**
 * Convert specific timezone date/time to UTC date/time, or null if value is invalid
 * @param {string} str: could be a date string or datetime string, e.g. '2018-03-06 20:00:00'
 * @param {boolean} isConvertingTime: whether the result should be converted to a date or datetime string
 *
 */
export const toUtc = (str, isConvertingTime = false) => {
  const sourceSetting = getTimeSetting(isConvertingTime);
  const utcFormat = isConvertingTime ? DefaultApiTimeFormat : DefaultApiDateFormat;

  const date = moment(str, sourceSetting.format);
  if (!isConvertingTime && date.isValid()) {
    return date.format(utcFormat);
  }
  // Create a moment instance w/ a specific timezone
  const timezone = momentTz.tz(str, sourceSetting.format, sourceSetting.code);

  if (!timezone.isValid()) return null;
  // Convert to utc time
  return timezone.utc().format(utcFormat);
};

export const getOffsetByTimeZone = timezone => momentTz.tz(timezone).format('ZZ');

// !!!deprecated, please use toUtc or toTimezone to convert date/datetime
// By used in some views, e.g. company info in setup page. Be attention when remove.
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
