import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Row, Col } from 'antd';

import Enums from 'utils/EnumsManager';

const propTypes = {
  intl: intlShape.isRequired,
};

const colLayout = {
  xs: 24,
  sm: 7,
  push: 1,
}

const Header = ({ intl }) => {

  const { formatMessage } = intl;
  return (
    <Row gutter={16}>
      {Enums.CriteriaColumns.map((col, i) => (
        <Col key={i} {...colLayout}>
          {formatMessage({ id: `global.ui.criteria.${col}` })}
        </Col>
      ))}
    </Row>
  );
};

Header.propTypes = propTypes;
export default injectIntl(Header);