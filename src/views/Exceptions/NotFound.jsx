import React, { Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Link } from 'react-router-dom';

const propTypes = {
  intl: intlShape.isRequired,
};

const NotFound = ({ intl }) => {
  const { formatMessage } = intl;
  return (
    <Fragment>
      <h2>
        {formatMessage({ id: 'global.errors.notFound' })}  
      </h2>
      <Link to="/dashboard">
        {formatMessage({ id: 'global.errors.returnDashboard' })}
      </Link>
    </Fragment>
  );
};

NotFound.propTypes = propTypes;
export default injectIntl(NotFound);
