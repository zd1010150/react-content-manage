/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from 'react-intl';
import { Username } from 'components/ui/index';

const welcomeMsgView = ({ intl, account }) => {
  const { formatMessage } = intl;
  return (
    <div data-role="welcomeMsg">
      <span> { formatMessage({ id: 'global.magento.welcomeMsg' })} {account.first_name} {account.last_name}  !</span>
    </div>
  );
};


welcomeMsgView.propTypes = {
  intl: intlShape.isRequired,
  account: PropTypes.object.isRequired,
};

const Welcome = injectIntl(welcomeMsgView);
export default Welcome;
