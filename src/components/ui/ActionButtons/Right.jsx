import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { Button, Icon } from 'antd';
import Enums from 'utils/EnumsManager';

const defaultProps = {
};
const propTypes = {
  intl: intlShape.isRequired,
  theme: PropTypes.oneOf(Enums.ThemeTypes),
};

const RightActions = ({ intl, theme, permissions }) => {
  const { formatMessage } = intl;
  const btnSettings = {
    className: `btn-ellipse ml-sm ${theme}-theme-btn`,
    size: 'small',
  };

  const btnPrefixWord = formatMessage({ id: 'global.ui.button.createNew' });
  const btnWord = formatMessage({ id: `global.properNouns.${theme}` });
  const btnWords = intl.locale === 'zh' ? `${btnPrefixWord}${btnWord}` : `${btnPrefixWord} ${btnWord}`;

  // TODO: add permission check to show or hide buttons
  
  return (
    <Fragment>
      {theme !== 'lead' ? 
        null : (
          <Button {...btnSettings} >
            {btnWords}
          </Button>
        )
      }
      <Button {...btnSettings} disabled >
        {formatMessage({ id: 'global.ui.button.addToCampaign' })}
      </Button>
    </Fragment>
  );
};

RightActions.defaultProps = defaultProps;
RightActions.propTypes = propTypes;
export default injectIntl(RightActions);