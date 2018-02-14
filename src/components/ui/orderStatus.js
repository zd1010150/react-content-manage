import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

const orderStatus = ({ status, deliveryOrderStatus }) => {
  const statuArr = deliveryOrderStatus.filter(s => s.id === Number(status));
  const statusName = _.isEmpty(statuArr) ? '' : statuArr[0].name;
  return <span>{statusName}</span>;
};
orderStatus.defaultProps = {
  deliveryOrderStatus: [],
  status: 0,
};
orderStatus.propTypes = {
  status: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  deliveryOrderStatus: PropTypes.array,
};

const mapStateToProps = ({ global }) => ({
  deliveryOrderStatus: global.settings.deliveryOrderStatus,
});

export default connect(mapStateToProps)(orderStatus);
