import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { CHINESE_CODE } from 'config/app.config';

const address = ({
  language, country, countries, street, city, state, zipCode,
}) => {
  const countryObj = countries.filter(c => c.code === country);
  const countryName = _.isEmpty(countryObj) ? '' : countryObj[0].name;
  if (language === CHINESE_CODE) {
    return <span>{countryName}{state}{city}{street} {zipCode}</span>;
  }
  return <span>{street} {city} {state} {countryName} {zipCode}</span>;
};
address.defaultProps = {
  country: '',
  street: '',
  city: '',
  state: '',
  zipCode: '',
  countries: [],
  language: CHINESE_CODE,
};
address.propTypes = {
  country: PropTypes.string,
  street: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zipCode: PropTypes.string,
  countries: PropTypes.array,
  language: PropTypes.string,
};

const mapStateToProps = ({ global }) => ({
  countries: global.settings.countries,
  language: global.language,
});

export default connect(mapStateToProps)(address);
