/* eslint-disable react/no-typos */
import React from 'react';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import PageTitle from '../component/pageTitle';

const pageTitleView = ({ intl, pageTitle }) => (

  <PageTitle intl={intl} pageTitle={pageTitle} />
);
pageTitleView.propTypes = {
  intl: intlShape.isRequired,
  pageTitle: PropTypes.string.isRequired,
};


function mapStateToProps(state) {
  return { pageTitle: state.global.pageTitle };
}
// react-router 和 redux集成
const PageTitleView = injectIntl(connect(mapStateToProps)(pageTitleView));

export default PageTitleView;
