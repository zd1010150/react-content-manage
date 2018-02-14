import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import classNames from 'classnames/bind';
import styles from '../MainContent.less';

const cx = classNames.bind(styles);
const PageTitle = ({ pageTitle, intl }) => {
  const { formatMessage } = intl;
  return (
    <h1 className={cx('main-content-title')}>{formatMessage({ id: pageTitle }) }</h1>
  );
};


PageTitle.propTypes = {
  intl: intlShape.isRequired,
  pageTitle: PropTypes.string.isRequired,
};

export default PageTitle;

