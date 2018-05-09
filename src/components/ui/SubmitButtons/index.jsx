import { Button, Icon, Row } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';


const propTypes = {
  onSaveClick: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};


const SubmitButtons = ({
  intl,
  objectType,
  onSaveClick,
  theme,
}) => {
  const { formatMessage } = intl;
  const i18nPrefix = 'global.ui.button';
  
  return (
    <Row style={{ margin: '30px 15px 20px' }}>
      <Button
        className={`${theme}-theme-btn ml-sm`}
        onClick={onSaveClick}
      >
        <Icon className="font-sm" type="save" size="small" />
        {formatMessage({ id: `${i18nPrefix}.save` })}
      </Button>
      <Button
        className="ml-sm"
      >
        <Link to={`/${objectType}`}>
          <Icon className="font-sm" type="close" size="small" />
          {formatMessage({ id: `${i18nPrefix}.cancel` })}
        </Link>
      </Button>
    </Row>
  );
};


SubmitButtons.propTypes = propTypes;
export default injectIntl(SubmitButtons);
