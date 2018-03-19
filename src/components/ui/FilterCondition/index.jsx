import React from 'react';
import PropTypes from 'prop-types';
import { Select, Row, Col, Icon } from 'antd';

import Enums from 'utils/EnumsManager';

const defaultProps = {
  display_num: 1,
  field_label: '',
  crm_data_type: 'text',
};
const propTypes = {
  display_num: PropTypes.number.isRequired,
  field_label: PropTypes.string.isRequired,
  crm_data_type: PropTypes.oneOf(Enums.FieldTypesInArray).isRequired,
  condition: PropTypes.string,
  value: PropTypes.string,
};

const FilterCondition = ({
  display_num,
  field_label,
  crm_data_type,
  condition,
  value
}) => {

  const colLayout = {
    xs: 24,
    sm: 7,
  }
  return (
    <Row gutter={16}>
      <Col xs={24} sm={2} >
        {display_num}
      </Col>
      <Col {...colLayout}>
        <Select style={{width: '100%'}}/>
      </Col>
      <Col {...colLayout}>
        <Select style={{width: '100%'}}/>
      </Col>
      <Col {...colLayout}>
        <Select style={{width: '100%'}}/>
      </Col>
      <Col xs={24} sm={1}>
        <Icon style={{ color: 'red' }} type='delete' />
      </Col>
    </Row>
  );
};

FilterCondition.defaultProps = defaultProps;
FilterCondition.propTypes = propTypes;
export default FilterCondition;