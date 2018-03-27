import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Button } from 'antd';

import { getThemeByType } from 'utils/common';
import Enums from 'utils/EnumsManager';

const propTypes = {
  intl: intlShape.isRequired,
  objectType: PropTypes.oneOf(Enums.ObjectTypes).isRequired,
  handleAddClick: PropTypes.func,
};

const Buttons = ({ intl, objectType, handleAddClick }) => {
  const i18nPrefix = 'page.filterCriteria';
  const { formatMessage } = intl;
  const theme = getThemeByType(objectType);

  return (
    <Button
      size="small"
      className={`ml-sm ${theme}-theme-btn`}
      onClick={handleAddClick}
    >
      + {formatMessage({ id: `${i18nPrefix}.buttons.newFilter`})}
    </Button>
  );
};

Buttons.propTypes = propTypes;
export default injectIntl(Buttons);