/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import { FIELD_TYPE_SELECT, FIELD_EDIT, FIELD_ADD, PICKLIST_OPTION_EDIT } from '../flow/pageAction';
import FieldAddContainer from './fieldAddContainer';
import FieldEditContaienr from './fieldEditContainer';
import FieldTypeContainer from './fieldTypeContainer';
import PickListOptionEditContainer from './pickListOptionEditContainer';
import TableView from './tableView';

class FieldsIndexView extends React.Component {
  constructor(props) {
    super();
    // this.resetState(props);
  }
  componentWillReceiveProps(nextProps) {
    // this.resetState(nextProps);
  }
  getView(props) {
    const { location } = props;
    const pairs = queryString.parse(location.search);
    if (_.isEmpty(pairs.action)) return <TableView />;
    switch (pairs.action) {
      case FIELD_TYPE_SELECT:
        return <FieldTypeContainer />;
      case FIELD_EDIT:
        return <FieldEditContaienr />;
      case FIELD_ADD:
        return <FieldAddContainer />;
      case PICKLIST_OPTION_EDIT:
        return <PickListOptionEditContainer />;
      default:
        return <TableView />;
    }
  }
  render() {
    return (<div>{this.getView(this.props)}</div>);
  }
}


export default withRouter(FieldsIndexView);
