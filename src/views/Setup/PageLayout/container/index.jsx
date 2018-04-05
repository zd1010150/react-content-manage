/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import { setCurrentObject } from '../flow/action';
import { ASSIGN_LAYOUT_TO_DEPARTMENT, LAYOUT_EDIT } from '../flow/pageAction';
import AssignDepartmentContainer from './assignDepartmentContainer';
import EditContainer from './editContainer';
import TableView from './tableViewContainer';

class PageLayoutIndexView extends React.Component {
  constructor(props) {
    super();
    this.setObjectType(props);
  }
  componentWillReceiveProps(nextProps) {
    this.setObjectType(nextProps);
  }
  setObjectType(props) {
    const { match, setCurrentObject } = props;
    setCurrentObject(match.params.objectType);
  }
  getView(props) {
    const { location } = props;
    const pairs = queryString.parse(location.search);
    if (_.isEmpty(pairs.action)) return <TableView />;
    switch (pairs.action) {
      case ASSIGN_LAYOUT_TO_DEPARTMENT:
        return <AssignDepartmentContainer />;
      case LAYOUT_EDIT:
        return <EditContainer />;
      default:
        return <TableView />;
    }
  }
  render() {
    return (<div>{this.getView(this.props)}</div>);
  }
}

const mapDispatchToProps = {
  setCurrentObject,
};

export default withRouter(connect(null, mapDispatchToProps)(PageLayoutIndexView));
