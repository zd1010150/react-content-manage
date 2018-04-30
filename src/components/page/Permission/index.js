import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';


class Permission extends React.Component {
  render() {
    const {
      accountPermissions, permission, children, nullComponent,
    } = this.props;
    return (
      <React.Fragment>
        { !_.isEmpty(permission) && accountPermissions.indexOf(permission) > -1 ? children : nullComponent}
      </React.Fragment>
    );
  }
}
Permission.defaultProps = {
  nullComponent: '',
};
Permission.propTypes = {
  permission: PropTypes.string.isRequired,
  accountPermissions: PropTypes.array.isRequired,
  nullComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};
const mapStateToProps = ({ global }) => ({
  accountPermissions: global.permissions,
});

export default connect(mapStateToProps)(Permission);

