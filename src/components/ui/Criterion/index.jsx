import React from 'react';
import PropTypes from 'prop-types';
import { Select, Row, Col, Icon } from 'antd';
const Option = Select.Option;

import { CustomField } from 'components/ui/index';
import Enums from 'utils/EnumsManager';

const defaultProps = {
  displayNum: 1,
  label: '',
  fieldType: 'text',
};
const propTypes = {
  displayNum: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  fieldType: PropTypes.oneOf(Enums.FieldTypesInArray).isRequired,
  condition: PropTypes.string,
  value: PropTypes.string,
  conditions: PropTypes.array,
  allFields: PropTypes.array,
};

const Criterion = ({
  displayNum,
  label,
  fieldType,
  condition,
  value,
  onRemoveFilter,
  allFields,
  conditions,
  handleFieldChange,
  handleConditionChange,
}) => {

  const colLayout = {
    xs: 24,
    sm: 7,
  }
  return (
    <Row gutter={16}>
      <Col xs={24} sm={2} style={{ textAlign: 'center' }} >
        {displayNum}
      </Col>
      <Col {...colLayout}>
        <Select size="small" style={{width: '100%'}} onChange={value => handleFieldChange(value, displayNum)} >
          {allFields.map(field => <Option key={field.id} value={field.id}>{field.field_label}</Option>)}
        </Select>
      </Col>
      <Col {...colLayout}>
        <Select size="small" style={{width: '100%'}} onChange={value => handleConditionChange(value, displayNum)} >
          {conditions.map(condition => <Option key={condition.id} value={condition.id}>{condition.display_value}</Option>)}
        </Select>
      </Col>
      <Col {...colLayout}>
        <CustomField type={fieldType} />
      </Col>
      <Col xs={24} sm={1}>
        <Icon
          style={{ color: 'red', lineHeight: '30px', cursor: 'pointer' }}
          type='delete'
          data-display-num={displayNum}
          onClick={onRemoveFilter}
        />
      </Col>
    </Row>
  );
};

Criterion.defaultProps = defaultProps;
Criterion.propTypes = propTypes;
export default Criterion;