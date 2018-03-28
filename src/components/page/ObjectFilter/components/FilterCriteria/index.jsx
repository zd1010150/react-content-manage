import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { FilterCriteria } from 'components/page/index';
import { getThemeByType } from 'utils/common';
import Enums from 'utils/EnumsManager';
import {
  setConditionLogic,
  addFilter,
  changeFilterByColumn,
  removeFilter,
} from './flow/actions';
import { toggleRightSider, settingRightSider } from 'components/page/RightSider/flow/action';

const defaultProps = {};
const propTypes = {};

class FilterCriteriaWrapper extends Component {
  onFieldChange = (fieldId, displayNum) => {
    const { fields, changeFilterByColumn } = this.props;
    const field = fields.find(field => field.id === fieldId);
    if (field) {
      return changeFilterByColumn(displayNum, 'type', field.crm_data_type, fieldId);
    }
  }

  onConditionChange = (conditionId, displayNum) => this.props.changeFilterByColumn(displayNum, 'conditionId', conditionId)

  onFilterValueChange = (displayNum, value) => this.props.changeFilterByColumn(displayNum, 'value', value)

  onRemoveFilter = displayNum => this.props.removeFilter(displayNum)

  addFilter = $ => this.props.addFilter()

  handleLogicChange = value => this.props.setConditionLogic(value)

  handleAddonClick = () => {
    console.log('toggle right sider');
    this.props.toggleRightSider(false);
  }

  handleSiderClose = () => {
    this.props.toggleRightSider(true);
  }

  render() {
    const {
      match,
      logicText,
      filters,
      fields,
      conditions,
      collapsed,
    } = this.props;

    const { object } = match.params;
    const theme = getThemeByType(object);

    return (
      <FilterCriteria
        theme={theme}
        fields={fields}
        conditions={conditions}
        filters={filters}
        handleFieldChange={this.onFieldChange}
        handleConditionChange={this.onConditionChange}
        handleValueChange={this.onFilterValueChange}
        handleFilterRemove={this.onRemoveFilter}
        handleAddonClick={this.handleAddonClick}
        handleSiderClose={this.handleSiderClose}
        handleAddNewClick={this.addFilter}
        collapsed={collapsed}
        logicText={logicText}
        handleLogicChange={this.handleLogicChange}
      />
    );
  }
}

FilterCriteriaWrapper.defaultProps = defaultProps;
FilterCriteriaWrapper.propTypes = propTypes;
const mapStateToProps = ({ global, objectView, ui }) => ({
  conditions: global.settings.conditions,
  logicText: objectView.filterCriteria.condition_logic,
  filters: objectView.filterCriteria.filters,
  fields: objectView.fields.allFields,
  collapsed: ui.rightSider.collapsed,
});
const mapDispatchToProps = {
  setConditionLogic,
  addFilter,
  changeFilterByColumn,
  removeFilter,
  toggleRightSider,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(FilterCriteriaWrapper));