import Enums from 'utils/EnumsManager';
import { toTimezone } from 'utils/dateTimeUtils';

const { FieldTypes } = Enums;
const {
  DateOnly,
  DateTime,
  Email,
  LongText,
  Lookup,
  NumberInput,
  PickList,
  TextInput,
} = FieldTypes;

/**
 *
 * @param {string} type: one of the value in FieldTypes
 * @param {any} value
 * @param {string} lookupKey
 * @param {array} mappedValues
 */
export const getValueByType = (type, value = '') => {
  switch (type) {
    case DateOnly:
      // TODO: modify function in order to omit offset and format
      // need to pass undefined in order to make DatePicker works with empty value
      // because moment will convert undefined to 'today' date/time
      return !value || value === '' ?
              undefined :
              toTimezone(value, '+1100', 'YYYY-MM-DD');
    case DateTime:
      // TODO: modify function in order to omit offset and format
      return !value || value === '' ?
              undefined :
              toTimezone(value, '+1100', 'YYYY-MM-DD HH:mm:ss');
    case Lookup:
      return value && value.id ? value.id : null;
    case Email:
    case LongText:
    case NumberInput:
    case TextInput:
    case PickList:
    default:
      return value;
  }
};

export const getOptionsByType = (type, value, meta) => {
  const { picklists } = meta;
  if (type === Lookup) {
    return value && value.id ? [value] : [];
  } else if (type === PickList) {
    return picklists;
  }
  return null;
};
