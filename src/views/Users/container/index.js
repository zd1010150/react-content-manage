/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import { PAGE_ACTION } from 'config/app.config';
import TableView from './tableView';
import AddView from './addView';

const usersIndexView = ({ location }) => {
  const pairs = queryString.parse(location.search);
  const currentView = _.isEmpty(pairs.action) || (pairs.action && pairs.action === PAGE_ACTION.VIEWALL) ? <TableView /> : <AddView actionType={pairs.action} />;
  return (<div>{currentView}</div>);
};


const UsersIndexView = withRouter((usersIndexView));
export default UsersIndexView;
