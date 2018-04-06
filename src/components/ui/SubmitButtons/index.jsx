import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { Row, Button, Icon } from 'antd';

const propTypes = {
  onSaveClick: PropTypes.func,
  intl: intlShape.isRequired,
};

const SubmitButtons = ({ intl, onSaveClick }) => {
  const { formatMessage } = intl;
  const i18nPrefix = 'global.ui.button';
  
  return (
    <Row style={{ margin: '30px 15px 20px' }}>
      <Button
        className="ml-sm lead-theme-btn"
        onClick={onSaveClick}
      >
        <Icon type="save" size="small" />
        {formatMessage({ id: `${i18nPrefix}.save` })}
      </Button>
      <Button
        className="ml-sm"
      >
        <Link to="/leads">
          <Icon type="close" size="small" />
          {formatMessage({ id: `${i18nPrefix}.cancel` })}
        </Link>
      </Button>
    </Row>
  );
};

SubmitButtons.propTypes = propTypes;
export default injectIntl(SubmitButtons);