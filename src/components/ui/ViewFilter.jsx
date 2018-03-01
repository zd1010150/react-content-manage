import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Select, Col } from 'antd';
const Option = Select.Option;

const propTypes = {
  intl: intlShape.isRequired,
};
const defaultProps = {
  
};

const ViewFilter = ({ intl, onChange }) => {
  const { formatMessage } = intl;
  // Attention: according to ant design spec, the parent component for this component MUST have a Row element
  return (
    <Col xs={24} sm={12}>
      <label>Filter</label>
      <Select defaultValue="lucy" style={{ width: 120 }} onChange={onChange}>
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="disabled" disabled>Disabled</Option>
        <Option value="Yiminghe">yiminghe</Option>
      </Select>
    </Col>
  );
};

ViewFilter.propTypes = propTypes;
ViewFilter.defaultProps = defaultProps;
export default injectIntl(ViewFilter);