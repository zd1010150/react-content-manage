import React from 'react';
import { Link } from 'react-router-dom';
import Enums from 'utils/EnumsManager';

const {
  Opportunities,
} = Enums.ObjectTypes;

const {
  Lookup,
} = Enums.FieldTypes;

const getDisplayValue = (selectedId, options, displayKey) => {
  if (!selectedId) return null;
  const target = options.find(option => option.id === selectedId);
  if (!target) return null;
  return target[displayKey];
};

const displayValue = (fieldName, objectType, value, options, lookupDisplayKey, fieldType) => {
  if (fieldName === 'target_account_id' && objectType === Opportunities) {
    return (
      <Link
        className="account-theme-text"
        to={`/accounts/${value}`}
      >
        {getDisplayValue(value, options, lookupDisplayKey)}
      </Link>
    );
  }
  return fieldType === Lookup ? getDisplayValue(value, options, lookupDisplayKey) : value;
};

export {
  displayValue,
};
