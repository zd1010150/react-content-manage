/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import { Permission, Unauthentication } from 'components/page/index';
import PERMISSIONS from 'config/app-permission.config';
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
    if (nextProps.match.params.objectType !== this.props.match.params.objectType) {
      this.setObjectType(nextProps);
    }
  }
  setObjectType(props) {
    const { match, setCurrentObject } = props;
    setCurrentObject({ objType: match.params.objectType });
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
    const permissionKey = `SETUP_${_.isEmpty(this.props.match.params.objectType) ? '' : this.props.match.params.objectType.toUpperCase()}_FIELDS`;
    return (<Permission permission={PERMISSIONS[permissionKey]} errorComponent={<Unauthentication />}>{this.getView(this.props)}</Permission>);
  }
}

const mapDispatchToProps = {
  setCurrentObject,
};

export default withRouter(connect(null, mapDispatchToProps)(FieldsIndexView));
