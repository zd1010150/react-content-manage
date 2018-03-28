import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { Button, Row, Col } from 'antd';

import { getThemeByType } from 'utils/common';
import Enums from 'utils/EnumsManager';
import { FilterCriteria } from 'components/page/index';
import { FloatingLabelInput, Criterion } from 'components/ui/index';
import {
  addFilter,
  removeFilter,
  setConditionLogic,
  changeFilter,
} from './flow/actions';

const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
};

class FilterCriteriaWrapper extends Component {
  handleLogicChange = value => this.props.setConditionLogic(value)

  addFilter = e => this.props.addFilter()

  onRemoveFilter = displayNum => this.props.removeFilter(displayNum)

  handleConditionChange = (conditionId, display_num) => this.props.changeFilter(display_num, 'condition', conditionId)

  handleFieldChange = (fieldId, display_num) => {
    const { fields, changeFilter } = this.props;
    const field = fields.find(field => field.id === fieldId);
    if (field) {
      changeFilter(display_num, 'type', field.crm_data_type, fieldId);
    }
  }

  handleFilterValueChange = () => {
    console.log('changing the value');
  }

  render() {
    const {
      intl,
      match,
      logicText,
      filters,
      fields,
      conditions,
    } = this.props;

    const { formatMessage } = intl;
    const i18nPrefix = 'page.objectFilter.criteria';

    const { object } = match.params;
    const theme = getThemeByType(object);

    return (
      <FilterCriteria
        theme={theme}
        fields={fields}
        conditions={conditions}
        filters={filters}
        handleFilterRemove={this.onRemoveFilter}

        handleAddNewClick={this.addFilter}
        logicText={logicText}
        handleLogicChange={this.handleLogicChange}
      />
    );
  }
}

FilterCriteriaWrapper.defaultProps = defaultProps;
FilterCriteriaWrapper.propTypes = propTypes;
const mapStateToProps = ({ global, objectView }) => ({
  conditions: global.settings.conditions,
  logicText: objectView.filterCriteria.condition_logic,
  filters: objectView.filterCriteria.filters,
  fields: objectView.fields.allFields,
});
const mapDispatchToProps = {
  addFilter,
  removeFilter,
  setConditionLogic,
  changeFilter,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(withRouter(FilterCriteriaWrapper)));