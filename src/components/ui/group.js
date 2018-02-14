import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

const group = ({ groupId, subGroups }) => {
  const currentGroup = subGroups.filter(s => s.id === Number(groupId));
  const groupName = _.isEmpty(currentGroup) ? '' : currentGroup[0].name;
  return <span>{groupName}</span>;
};
group.defaultProps = {
  subGroups: [],
  groupId: 0,
};
group.propTypes = {
  groupId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  subGroups: PropTypes.array,
};

const mapStateToProps = ({ global }) => ({
  subGroups: global.settings.subGroup,
});

export default connect(mapStateToProps)(group);
