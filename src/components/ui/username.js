import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CHINESE_CODE } from 'config/app.config';

const username = ({ language, firstName, lastName }) => {
  if (language === CHINESE_CODE) {
    return <span>{lastName} {firstName}</span>;
  }
  return <span>{firstName} {lastName} </span>;
};
username.defaultProps = {
  firstName: '',
  lastName: '',
  language: CHINESE_CODE,
};
username.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  language: PropTypes.string,
};

const mapStateToProps = ({ global }) => ({
  language: global.language,
});

export default connect(mapStateToProps)(username);
