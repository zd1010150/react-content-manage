import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import { CriteriaHeader, Criterion } from 'components/ui/index';
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

const Filters = ({ filters, fields, conditions, handleFilterRemove }) => {
  return (
    <Fragment>
      <CriteriaHeader />
      {filters.map(filter => {
        const { id, display_num, type } = filter;
        return (
          <Criterion
            key={display_num}
            displayNum={display_num}
            onRemoveFilter={handleFilterRemove}
            fieldType={type}
            allFields={fields}
            conditions={conditions}
            handleFieldChange={this.handleFieldChange}
            handleConditionChange={this.handleConditionChange}
            options={getOptionsByType(type, id, fields)}
          />
        );
      })}
    </Fragment>
  );
};

export default injectIntl(Filters);