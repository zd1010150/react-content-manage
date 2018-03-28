/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import { Checkbox, Button } from 'antd';

const CheckboxGroup = Checkbox.Group;

const RightFields = ({
  fieldName, targetType, fieldsValue, toggleRightSider,
}) => (
  <div>
    <h2>map {fieldName} to {targetType} </h2>
    <CheckboxGroup options={fieldsValue} />
    <Button onClick={() => toggleRightSider(true)}>submit</Button>
  </div>
);


export default RightFields;

