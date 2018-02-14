/* eslint-disable react/no-typos,react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { intlShape, injectIntl } from 'react-intl';

import Nav from '../component/nav';

const leftSideNavView = ({ intl, location, match }) => <Nav intl={intl} location={location} match={match} />;


leftSideNavView.propTypes = {
  intl: intlShape.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

const LeftSideNavView = withRouter(injectIntl(leftSideNavView));

export default LeftSideNavView;
