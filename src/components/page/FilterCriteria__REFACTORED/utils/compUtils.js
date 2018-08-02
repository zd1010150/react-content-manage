import Enums from 'utils/EnumsManager';

const { FieldTypes, Conditions, DateTimeConfigs } = Enums;
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
const {
  StartsWith,
  Contains,
  Equals,
  NotEquals,
  NotContains,
  LessThan,
  GreaterThan,
  LessOrEquals,
  GreaterOrEquals,
  WithIn,
  IsNull,
  IsNotNull,
  HasRelation,
} = Conditions;
const { SubTypes } = DateTimeConfigs;
const { Range } = SubTypes;

const getConditionIdsByType = (type) => {
  // Type and Conditions mapping please refer to http://c7git.acy.svr/LogixCRM/fe_logix_crm/issues/176
  switch (type) {
    case PickList:
    case TextInput:
    case Email:
    case LongText:
      return [
        Equals,
        NotEquals,
        StartsWith,
        Contains,
        NotContains,
        IsNull,
        IsNotNull,
      ];
    case DateOnly:
    case DateTime:
    case NumberInput:
      return [
        Equals,
        NotEquals,
        LessThan,
        GreaterThan,
        LessOrEquals,
        GreaterOrEquals,
        IsNull,
        IsNotNull,
        WithIn,
      ];
    case Lookup:
      return [
        Equals,
        NotEquals,
        StartsWith,
        Contains,
        NotContains,
        HasRelation,
      ];
    default:
      return [];
  }
};

export const getConditionsByFieldType = (type, conditions) => {
  if (_.isEmpty(conditions)
      || !_.isArray(conditions)
      || _.isEmpty(type)) {
    return [];
  }

  const conditionIds = getConditionIdsByType(type);
  return conditions.filter(c => conditionIds.indexOf(c.id) > -1);
};

/**
 * Compute whether disable condition select based on field type and its subtype.
 * If field type is date/time and subtype in value select is 'Range',
 * then the condition should always be 'equals' and condition should be disabled for better ux.
 * NOTES:
 * This is just a temporary rule applied in this part.
 * We have feature that allow more conditions to work with 'Range' filter. So if changed, this functionality should be removed.
 */
export const shouldConditionDisabled = (subtype) => {
  if (subtype === Range) return true;
  return false;
};

/**
 * @param {string} logic
 * @param {array} criteria
 */
export const validateLogic = (logic, criteria) => {
  const i18n = 'page.FilterCriteria__REFACTORED.errors';
  const errors = [];
  if (!_.isString(logic) || !_.isArray(criteria)) {
    errors.push({
      location: 'logic',
      errorId: `${i18n}.incorrectType`,
    });
    return errors;
  }

  // Check if logic contains non-supported keywords
  // TODO: this is a simple version, more complex version should be split logic by words not letters.
  const keywords = ['(', ')', 'A', 'N', 'D', 'O', 'R'];
  const letters = logic.split('');
  const isContainIncorrectLetter = letters.some(l => (keywords.indexOf(l) < 0 && !/[\s\d]/.test(l)));
  if (isContainIncorrectLetter) {
    errors.push({
      location: 'logic',
      errorId: `${i18n}.incorrectLetter`,
    });
  }

  // Check if some criteria display num is not in logic
  // TODO: This is a simple version, will fail on double digits cases
  const displayNums = criteria.map(c => String(c.displayNum));
  const isDisplayNumMissingFromLogic = displayNums.some(dn => logic.indexOf(dn) < 0);
  if (isDisplayNumMissingFromLogic) {
    errors.push({
      location: 'logic',
      errorId: `${i18n}.displayNumMissing`,
    });
  }
  return errors;
};
