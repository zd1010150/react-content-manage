/* eslint-disable no-underscore-dangle */
import { Button, Checkbox, Col, Icon, Row, Select } from 'antd';
import classNames from 'classnames/bind';
import { RightSider } from 'components/page/index';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Enums from 'utils/EnumsManager';
import { intlShape, injectIntl } from 'react-intl';
import { Buttons, ConditionLogic, Filters } from './components/index';
import styles from './index.less';

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const cx = classNames.bind(styles);


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
  siderOptions: [],
};
const propTypes = {
  intl: intlShape.isRequired,
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
  siderOptions: PropTypes.array,
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
      return handleValueChange(displayNum, value);
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

  _handleSiderValuesChange = checkedValues => {
    const { handleSiderValuesChange } = this.props;
    if (_.isFunction(handleSiderValuesChange)) {
      return handleSiderValuesChange(checkedValues);
    }
  }

  _handleInsertSelection = $ => {
    const { handleInsertSelection } = this.props;
    if (_.isFunction(handleInsertSelection)) {
      return handleInsertSelection();
    }
  }

  render() {
    const {
      intl,
      theme,
      logicText,
      fields,
      filters,
      conditions,
      enableTopSelection,
      enableCheckbox,
      collapsed,
      siderFieldId,
      siderOptions,
      siderSelection,
    } = this.props;
    
    const { formatMessage } = intl;
    const i18n = 'global.ui.button';

    return (
      <Fragment>
        {enableTopSelection && (
          <Row>
            <div>From</div>
            <Select size="small" style={{ width: '100%', marginBottom: 30 }} onChange={this._onUserTypeChange}>
              {ClientTypes.map(type => <Option key={type} value={type}>{type}</Option>)}
            </Select>
          </Row>
        )}
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
          <ConditionLogic
            value={logicText}
            handleChange={this._handleLogicChange}
            hasError={logicText === '' && filters.length > 0}
          />
        </Row>
        {enableCheckbox && (
          <Row>
            <Checkbox
              style={{ marginTop: 30 }}
              className={`${theme}-theme-checkbox`}
              onChange={this._handleCheckboxChange}
            >
              Opt-out Unsubscribers
            </Checkbox>
          </Row>
        )}
        <RightSider collapsed={collapsed}>
          <CheckboxGroup
            value={siderSelection.map(select => select.id)}
            className={cx('siderCheckboxGroup')}
            onChange={this._handleSiderValuesChange}
          >
            <Row>
            {siderOptions.map(option => (
              <Col key={option.id}>
                <Checkbox
                  value={option.id}
                  className={`${theme}-theme-checkbox`}
                >
                  {option.name ? option.name : option.option_value}
                </Checkbox>
              </Col>
            ))}
            </Row>
          </CheckboxGroup>
          <div className={cx('buttonsWrapper')}>
            <Button
              size="small"
              className={`${theme}-theme-btn mr-sm`}
              onClick={this._handleInsertSelection}
            >
              <Icon className="font-sm" type="plus" />
              {formatMessage({ id: `${i18n}.add` })}
            </Button>
            <Button
              className={`${theme}-theme-btn`}
              size="small"
              onClick={this._handleSiderClose}
            >
              <Icon className="font-sm" type="check" />
              {formatMessage({ id: `${i18n}.done` })}
            </Button>
          </div>
        </RightSider>
      </Fragment>
    );
  }
}

FilterCriteria.defaultProps = defaultProps;
FilterCriteria.propTypes = propTypes;
export default injectIntl(FilterCriteria);
