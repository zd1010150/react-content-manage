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
  onAdditionChange: null,
  onOperatorChange: null,
};
const propTypes = {
  addition: PropTypes.string.isRequired,
  operator: PropTypes.string.isRequired,
  operators: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    display_value: PropTypes.string.isRequired,
  })).isRequired,
  onAdditionChange: PropTypes.func,
  onOperatorChange: PropTypes.func,
};

const AdditionSelector = ({
  addition,
  operator,
  operators,
  onAdditionChange,
  onOperatorChange,
}) => (
  <div>
    <Input
      value={addition}
      onChange={onAdditionChange}
    />
    <Select
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
