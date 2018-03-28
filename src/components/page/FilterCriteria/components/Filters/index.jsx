import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Header, Criterion } from '../index';
import Enums from 'utils/EnumsManager';

const getOptionsByType = (type, targetId, collection) => {
  if (type === Enums.FieldTypes.PickList) {
    const picklist = collection.find(element => element.id === targetId);
    if (picklist) {
      return picklist.picklists;
    }
  }
  return [];
};

// others includes fields, conditions, handleFieldChange, handleConditionChange, handleValueChange, handleFilterRemove
const Filters = ({
  filters,
  ...others,
}) => {

  return (
    <Fragment>
      <Header />
      {filters.map(filter => {
        // filterOthers includes fieldId, value, conditionId, type
        const { displayNum, ...filterOthers } = filter;
        return <Criterion key={displayNum} {...filter} {...others} />
      })}
    </Fragment>
  );
};

export default Filters;