/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { fetchTeams } from 'store/global/action';
import { PAGE_ACTION } from 'config/app.config';
import { Permission, Unauthentication } from 'components/page/index';
import PERMISSIONS from 'config/app-permission.config';
import TableView from './tableView';
import AddView from './addView';
import { setDepartment, setEditUser } from '../flow/action';

class usersIndexView extends React.Component {
  constructor(props) {
    super();
    this.resetState(props);
  }
  componentDidMount() {
    this.props.fetchTeams();
  }
  componentWillReceiveProps(nextProps) {
    this.resetState(nextProps);
  }
  resetState(props) {
    const { setEditUser, setDepartment, location } = props;
    const pairs = queryString.parse(location.search);

    if (pairs.action === PAGE_ACTION.ADD) {
      setEditUser({});
      setDepartment({
        department_id: '',
        department_name: '',
      });
    }
  }
  render() {
    const { location } = this.props;
    const pairs = queryString.parse(location.search);
    const currentView = _.isEmpty(pairs.action) || (pairs.action && pairs.action === PAGE_ACTION.VIEWALL) ? <TableView /> : <AddView actionType={pairs.action} />;
    return (<Permission permission={PERMISSIONS.SETUP_COMPANYPROFILE_USERS}><div>{currentView}</div></Permission>);
  }
}


const mapDispatchToProps = {
  fetchTeams,
  setDepartment,
  setEditUser,
};

const UsersIndexView = withRouter(connect(null, mapDispatchToProps)(usersIndexView));
export default UsersIndexView;
