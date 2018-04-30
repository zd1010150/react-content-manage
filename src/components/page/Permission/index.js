import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';


class Permission extends React.Component {
  render() {
    const {
      accountPermissions, permission, children,
    } = this.props;
    return (
      <React.Fragment>
        { !_.isEmpty(permission) && accountPermissions.indexOf(permission) > -1 ? children : ''}
      </React.Fragment>
    );
  }
}
Permission.propTypes = {
  permission: PropTypes.string.isRequired,
  accountPermissions: PropTypes.array.isRequired,
};
const mapStateToProps = ({ global }) => ({
  accountPermissions: global.permissions,
});

export default connect(mapStateToProps)(Permission);

