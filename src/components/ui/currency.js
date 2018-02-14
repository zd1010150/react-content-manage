import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CURRENCY_SYMBOL, CHINA_RMB_CODE } from 'config/app.config';
import _ from 'lodash';


const currency = ({ value, baseCurrency }) => <span>{CURRENCY_SYMBOL[baseCurrency[0].name]}{ _.round(value, 2)}</span>;

currency.defaultProps = {
  baseCurrency: [{ name: CHINA_RMB_CODE }],
  value: 1.0,
};
currency.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  baseCurrency: PropTypes.array,
};

const mapStateToProps = ({ global }) => ({
  baseCurrency: global.settings.baseCurrency,
});

export default connect(mapStateToProps)(currency);
