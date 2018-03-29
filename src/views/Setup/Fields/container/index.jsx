/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import { setCurrentObject } from '../flow/action';
import { FIELD_TYPE_SELECT, FIELD_EDIT, FIELD_ADD, PICKLIST_OPTION_EDIT } from '../flow/pageAction';
import FieldAddContainer from './fieldAddContainer';
import FieldEditContaienr from './fieldEditContainer';
import FieldTypeContainer from './fieldAddSelectTypeContainer';
import PickListOptionEditContainer from './pickListOptionEditContainer';
import TableView from './tableView';

class FieldsIndexView extends React.Component {
  constructor(props) {
    super();
    this.setObjectType(props);
  }
  componentWillReceiveProps(nextProps) {
    this.setObjectType(nextProps);
  }
  setObjectType(props) {
    const { location, setCurrentObject } = props;
    const pairs = queryString.parse(location.search);
    setCurrentObject({ objType: pairs.objectType });
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
        return <TableView objectType={pairs.objectType} />;
    }
  }
  render() {
    return (<div>{this.getView(this.props)}</div>);
  }
}

const mapDispatchToProps = {
  setCurrentObject,
};

export default withRouter(connect(null, mapDispatchToProps)(FieldsIndexView));
