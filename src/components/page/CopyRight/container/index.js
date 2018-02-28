import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
const propTypes = {
  intl: intlShape.isRequired
};

const CopyRight = ({ intl, style }) => {
  const { formatMessage } = intl;
  const mergedStyle = {
    textAlign: 'center',
    color: '#8b91a0',
    lineHeight: '45px',
    ...style,
  }
  return (
    <div style={mergedStyle}>
      <small>{formatMessage({ id: 'global.crm.footer.copyright' })}</small>
    </div>
  );
};

CopyRight.propTypes = propTypes;
export default injectIntl(CopyRight);
