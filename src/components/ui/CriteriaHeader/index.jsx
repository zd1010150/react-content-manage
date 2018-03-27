import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Row, Col } from 'antd';

import Enums from 'utils/EnumsManager';

const propTypes = {
  intl: intlShape.isRequired,
};

const CriteriaHeader = ({ intl, }) => {
  const colLayout = {
    xs: 24,
    sm: 7,
    push: 1,
  }

  return (
    <Row gutter={16}>
      {Enums.CriteriaColumns.map((col, i) => (
        <Col key={i} {...colLayout}>
          {intl.formatMessage({ id: `global.ui.criteria.${col}` })}
        </Col>
      ))}
    </Row>
  );
};

export default injectIntl(CriteriaHeader);