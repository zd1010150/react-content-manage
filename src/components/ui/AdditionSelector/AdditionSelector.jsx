/**
 * @description: A UI compnent supports addition operator and value changes.
 * @features:
 *
 * @author: Ronan
 * @date: 2nd August 2018
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';

const { Option } = Select;


const defaultProps = {
  inputCls: '',
  selectCls: '',
  displayCls: '',
  onAdditionBlur: null,
  onAdditionChange: null,
  onOperatorChange: null,
};
const propTypes = {
  addition: PropTypes.string.isRequired,
  operator: PropTypes.string.isRequired,
  operators: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    display_value: PropTypes.string.isRequired,
  })).isRequired,
  inputCls: PropTypes.string,
  selectCls: PropTypes.string,
  displayCls: PropTypes.string,
  isActivated: PropTypes.bool.isRequired,
  onAdditionBlur: PropTypes.func,
  onAdditionChange: PropTypes.func,
  onOperatorChange: PropTypes.func,
};

const AdditionSelector = ({
  addition,
  operator,
  operators,
  inputCls,
  selectCls,
  displayCls,
  isActivated,
  onAdditionBlur,
  onAdditionChange,
  onOperatorChange,
}) => (
  <div>
    {isActivated ? (
      <Input
        className={inputCls}
        size="small"
        value={addition}
        onBlur={onAdditionBlur}
        onChange={onAdditionChange}
      />
    ) : (
      <div className={displayCls}>
        {addition}
      </div>
    )}
    <Select
      className={selectCls}
      size="small"
      value={operator}
      onChange={onOperatorChange}
    >
      {operators.map(op => <Option key={op.id} value={op.id}>{op.display_value}</Option>)}
    </Select>
  </div>
);

AdditionSelector.defaultProps = defaultProps;
AdditionSelector.propTypes = propTypes;
export default AdditionSelector;
