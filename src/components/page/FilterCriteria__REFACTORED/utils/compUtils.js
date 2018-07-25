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
