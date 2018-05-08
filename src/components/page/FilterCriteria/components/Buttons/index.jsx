import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Button, Icon } from 'antd';

import Enums from 'utils/EnumsManager';

const defaultProps = {
  theme: Enums.ObjectTypes.Leads,
};
const propTypes = {
  intl: intlShape.isRequired,
  theme: PropTypes.oneOf(Enums.ThemeTypesInArray).isRequired,
  handleAddClick: PropTypes.func,
};

const Buttons = ({ intl, theme, handleAddClick }) => {
  const i18nPrefix = 'page.filterCriteria';
  const { formatMessage } = intl;

  return (
    <Button
      size="small"
      className={`ml-sm ${theme}-theme-btn`}
      onClick={handleAddClick}
    >
      <Icon className="font-sm" type="plus" />
      {formatMessage({ id: `${i18nPrefix}.buttons.newFilter` })}
    </Button>
  );
};

Buttons.defaultProps = defaultProps;
Buttons.propTypes = propTypes;
export default injectIntl(Buttons);
