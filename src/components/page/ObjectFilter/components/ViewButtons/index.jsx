import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { Row, Button, Icon } from 'antd';

const propTypes = {
  onSaveClick: PropTypes.func,
  intl: intlShape.isRequired,
};

const ViewButtons = ({ intl, onSaveClick }) => {
  const { formatMessage } = intl;
  return (
    <Row style={{ margin: '40px 15px 20px' }}>
      <Button
        className="ml-sm lead-theme-btn"
        size="small"
        onClick={onSaveClick}
      >
        <Icon type="save" size="small" />
        {formatMessage({ id: 'global.ui.button.save' })}
      </Button>
      <Button
        className="ml-sm"
        size="small"
      >
        <Link to="/leads">
          <Icon type="close" size="small" />
          {formatMessage({ id: 'global.ui.button.cancel' })}
        </Link>
      </Button>
    </Row>
  );
};

ViewButtons.propTypes = propTypes;
export default injectIntl(ViewButtons);