import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

const logistics = ({ freight, freightSettings }) => {
  const feightArr = freightSettings.filter(s => Number(s.id) === Number(freight));
  const feightName = _.isEmpty(feightArr) ? '' : feightArr[0].name;
  return <span>{feightName}</span>;
};
logistics.defaultProps = {
  freightSettings: [],
  freight: 0,
};
logistics.propTypes = {
  freight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  freightSettings: PropTypes.array,
};

const mapStateToProps = ({ global }) => ({
  freightSettings: global.settings.freightSetting,
});

export default connect(mapStateToProps)(logistics);
