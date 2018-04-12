import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, Input, Row, Col } from 'antd';

import Enums from 'utils/EnumsManager';


const propTypes = {
  checked: PropTypes.bool,
  fieldKey: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onCheckChange: PropTypes.func,
  onValueChange: PropTypes.func,
  theme: PropTypes.oneOf(Enums.ThemeTypesInArray).isRequired,
  value: PropTypes.string,
};


const FilterField = ({
  checked,
  fieldKey,
  label,
  onCheckChange,
  onValueChange,
  theme,
  value,
}) => {

  const _onCheckChange = e => {
    if (_.isFunction(onCheckChange)) {
      // Attention: Antd Checkbox returns a converted Event target which is not a conventional Event object
      const { checked, field } = e.target;
      onCheckChange(field, checked);
    }
  }

  const _onValueChange = e => {
    if (_.isFunction(onValueChange)) {
      const { value, dataset } = e.target;
      onValueChange(dataset.field, value);
    }
  }

  return (
    <Row className="mb-sm">
      <Col xs={24} sm={8}>
        <Checkbox
          checked={checked}
          className={`${theme}-theme-checkbox`}
          field={fieldKey}
          onChange={_onCheckChange}
        >
          {label}
        </Checkbox>
      </Col>
      <Col xs={24} sm={16}>
        <Input
          data-field={fieldKey}
          placeholder="input here"
          size="small"
          value={value}
          onChange={_onValueChange}
        />
      </Col>
    </Row>
  );
}


FilterField.propTypes = propTypes;
export default FilterField;