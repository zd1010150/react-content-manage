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
 * @param {string/number} value
 * @param {string} lookupKey
 * @param {array} mappedValues
 */
export default (type, value = '') => {
  switch (type) {
    case DateOnly:
      // TODO: modify function in order to omit offset and format
      return toTimezone(value, '+1100', 'YYYY-MM-DD');
    case DateTime:
      // TODO: modify function in order to omit offset and format
      return toTimezone(value, '+1100', 'YYYY-MM-DD HH:mm:ss');
    case Email:
    case LongText:
    case NumberInput:
    case TextInput:
    case PickList:
    case Lookup:
    default:
      return value;
  }
};
