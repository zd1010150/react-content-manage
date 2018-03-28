import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Select, Checkbox, Button, Icon } from 'antd';
const Option = Select.Option;

import Enums from 'utils/EnumsManager';
import { Buttons, ConditionLogic, Filters } from './components/index';
import { RightSider } from 'components/page/index';

const ClientTypes = [
  Enums.ObjectTypes.Leads,
  Enums.ObjectTypes.Accounts,
  Enums.ObjectTypes.Opportunities,  
];

const defaultProps = {
  conditions: [],
  fields: [],
  filters: [],
  enableTopSelection: false,
  enableCheckbox: false,
};
const propTypes = {
  theme: PropTypes.oneOf(Enums.ThemeTypesInArray).isRequired,
  logicText: PropTypes.string,
  conditions: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  // TODO: add function props checking to verify that each filter follow the same shape
  filters: PropTypes.array.isRequired,  
  handleAddNewClick: PropTypes.func,
  handleLogicChange: PropTypes.func,
  handleFilterRemove: PropTypes.func,
  enableTopSelection: PropTypes.bool.isRequired,
  enableCheckbox: PropTypes.bool.isRequired,
};

class FilterCriteria extends Component {
  _handleAddNewClick = $ => {
    const { handleAddNewClick } = this.props;
    if (_.isFunction(handleAddNewClick)) {
      return handleAddNewClick();
    }
  }

  _handleLogicChange = value => {
    const { handleLogicChange } = this.props;
    if (_.isFunction(handleLogicChange)) {
      return handleLogicChange(value);
    }
  }

  _onUserTypeChange = value => {
    const { onUserTypeChange } = this.props;
    if (_.isFunction(onUserTypeChange)) {
      return onUserTypeChange(value);
    }
  }

  _handleCheckboxChange = e => {
    const { handleCheckboxChange } = this.props;
    if (_.isFunction(handleCheckboxChange)) {
      return handleCheckboxChange(e.target.checked);
    }
  }

  _handleFieldChange = (fieldId, displayNum) => {
    const { handleFieldChange } = this.props;
    if (_.isFunction(handleFieldChange)) {
      return handleFieldChange(fieldId, displayNum);
    }
  }

  _handleConditionChange = (fieldId, displayNum) => {
    const { handleConditionChange } = this.props;
    if (_.isFunction(handleConditionChange)) {
      return handleConditionChange(fieldId, displayNum);
    }
  }

  _handleValueChange = (value, displayNum) => {
    const { handleValueChange } = this.props;
    if (_.isFunction(handleValueChange)) {
      return handleValueChange(value, displayNum);
    }
  }

  _handleAddonClick = displayNum => {
    const { handleAddonClick } = this.props;
    if (_.isFunction(handleAddonClick)) {
      return handleAddonClick(displayNum);
    }
  }
  
  _handleSiderClose = e => {
    const { handleSiderClose } = this.props;
    if (_.isFunction(handleSiderClose)) {
      return handleSiderClose();
    }
  }

  _handleFilterRemove = displayNum => {
    const { handleFilterRemove } = this.props;
    if (_.isFunction(handleFilterRemove)) {
      return handleFilterRemove(displayNum);
    }
  }

  render() {
    const {
      theme,
      logicText,
      fields,
      filters,
      conditions,
      enableTopSelection,
      enableCheckbox,
      collapsed,
    } = this.props;
    
    return (
      <Fragment>
        {enableTopSelection && <Row>
          <div>From</div>
          <Select size="small" style={{ width: '100%', marginBottom: 30 }} onChange={this._onUserTypeChange}>
            {ClientTypes.map(type => <Option key={type} value={type}>{type}</Option>)}
          </Select>
        </Row>}
        <Row>
          <Filters
            filters={filters}
            fields={fields}
            conditions={conditions}
            handleFieldChange={this._handleFieldChange}
            handleConditionChange={this._handleConditionChange}
            handleValueChange={this._handleValueChange}
            handleAddonClick={this._handleAddonClick}
            handleFilterRemove={this._handleFilterRemove}
          />
        </Row>
        <Row style={{ textAlign: 'center', margin: '10px 0' }}>
          <Buttons theme={theme} handleAddClick={this._handleAddNewClick} />
        </Row>
        <Row>
          <ConditionLogic value={logicText} handleChange={this._handleLogicChange} />
        </Row>
        {enableCheckbox && <Row>
          <Checkbox
            style={{ marginTop: 30 }}
            className={`${theme}-theme-checkbox`}
            onChange={this._handleCheckboxChange}>Opt-out Unsubscribers</Checkbox>
        </Row>}
        <RightSider collapsed={collapsed}>
          <Button>Add</Button>
          <Button onClick={this._handleSiderClose}>
            <Icon size="small" type="close" />
            Cancel
          </Button>
        </RightSider>
      </Fragment>
    );
  }
}

FilterCriteria.defaultProps = defaultProps;
FilterCriteria.propTypes = propTypes;
export default FilterCriteria;