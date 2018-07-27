import { Button, Checkbox, Icon } from 'antd';
import { RightSider } from 'components/page/index';
import { toggleRightSider } from 'components/page/RightSider/flow/action';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import Enums from 'utils/EnumsManager';
import { setCriterionByColumn } from '../flow/actions';

const { FieldTypes } = Enums;
const { Lookup, PickList } = FieldTypes;
const CheckboxGroup = Checkbox.Group;


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
};

class Sider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedValues: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        checkedValues: this.valueToArray(nextProps.value),
      });
    }
  }

  componentWillUnmount() {
    this.props.toggleRightSider(true);
  }

  onOptionChange = checkedValues => this.setState({ checkedValues })

  onDoneClick = () => this.props.toggleRightSider(true)

  onAddClick = () => {
    if (this.props.record !== null) {
      const { record, setCriterionByColumn } = this.props;
      const newValue = this.valueToString(this.state.checkedValues);
      setCriterionByColumn('value', record.displayNum, newValue, null);
    }
  }

  valueToArray = (value) => {
    if (_.isEmpty(value) || !_.isString(value)) return [];

    return value
            .trim()
            .split(',')
            .filter(s => s !== '')
            .map(str => str.trim());
  }

  valueToString = value => value.join(',').trim()

  formatOptions = (data) => {
    if (_.isEmpty(data)
        || _.isEmpty(data.field)
        || !_.isArray(data.field.options)) {
      return [];
    }

    const { type, lookupKey, options } = data.field;
    if (type === PickList) {
      return options.map(record => ({
        label: record.option_value,
        value: record.option_value,
      }));
    } else if (type === Lookup) {
      return options.map(record => ({
        label: record[lookupKey],
        value: record[lookupKey],
      }));
    }
    return [];
  }

  render() {
    console.log('testing');
    const { intl, collapsed, record } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.ui';

    return (
      <RightSider collapsed={collapsed}>
        <div className="pt-xlg pr-lg pb-xlg pl-lg">
          {record && record.displayNum ? (
            <div className="mb-md">
              Options for display number {record.displayNum}
            </div>
          ) : null}
          <CheckboxGroup
            className="block"
            options={this.formatOptions(record)}
            value={this.state.checkedValues}
            onChange={this.onOptionChange}
          />
          <div className="mt-lg">
            <Button onClick={this.onAddClick} size="small" className="mr-sm">
              <Icon className="font-sm" type="plus" />
              {formatMessage({ id: `${i18n}.button.add` })}
            </Button>
            <Button onClick={this.onDoneClick} size="small">
              <Icon className="font-sm" type="check" />
              {formatMessage({ id: `${i18n}.button.done` })}
            </Button>
          </div>
        </div>
      </RightSider>
    );
  }
}

Sider.defaultProps = defaultProps;
Sider.propTypes = propTypes;
const mapStateToProps = ({ ui, FilterCriteria__REFACTORED }) => ({
  collapsed: ui.rightSider.collapsed,
  record: FilterCriteria__REFACTORED.sider.record,
  // NOTES: connect value here is used enable sync input value to checked boxes.
  //        record is connected but it won't trigger the re-render bacause we continue use same instance.
  value: FilterCriteria__REFACTORED.sider.record ? FilterCriteria__REFACTORED.sider.record.value : '',
});
const mapDispatchToProps = {
  toggleRightSider,
  setCriterionByColumn,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(Sider));
