import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';


class FormatedTime extends React.Component {
  render() {
    const {
      value, timeZoneSetting, isTime,
    } = this.props;
    const { dateFormat, timeFormat, offset } = timeZoneSetting;
    return (
      <span>{moment.utc(value).utcOffset(offset).format(isTime ? timeFormat : dateFormat)}</span>
    );
  }
}
FormatedTime.defaultProps = {
  value: '',
  isTime: false,
};
FormatedTime.propTypes = {
  value: PropTypes.string,
  timeZoneSetting: PropTypes.object.isRequired,
  isTime: PropTypes.bool,
};
const mapStateToProps = ({ global }) => ({
  timeZoneSetting: global.timeZoneSetting,
});


export default connect(mapStateToProps)(FormatedTime);

