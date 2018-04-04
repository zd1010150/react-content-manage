/* eslint-disable no-shadow */
import React from 'react';
import _ from 'lodash';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Button, Icon, Modal, Form } from 'antd';
import { connect } from 'react-redux';
import { Panel } from 'components/ui/index';
import { objTypeAndClassTypeMap, FORM_LAYOUT_CONFIG } from 'config/app.config';
import { intlShape, injectIntl } from 'react-intl';
import {
  setEditLayout,
  setAddLayout,
  fetchAllLayouts,
} from '../flow/action';

import { ASSIGN_LAYOUT_TO_DEPARTMENT, LAYOUT_EDIT } from '../flow/pageAction';
import AddForm from '../component/tableView/addForm';

const { Item: FormItem } = Form;
class LayoutsTableView extends React.Component {
  componentDidMount() {

  }
  add() {

  }
  assignmentLayout() {

  }
  editLayout(layout) {

  }
  deleteLayout(layout) {

  }
  saveAndNext() {

  }
  render() {
    const { formatMessage } = this.props.intl;
    const {
      objectType,
      allLayouts,
      addLayout,
      setAddLayout,
    } = this.props;
    const classType = objTypeAndClassTypeMap[objectType];
    const rightActions = (() => {
      const actions = [];
      actions.push(<Button
        key="save"
        className={classNames('btn-ellipse', 'ml-sm', `${classType}-theme-btn`)}
        size="small"
        icon="save"
        onClick={() => this.add()}
      >
        { formatMessage({ id: 'global.ui.button.add' })}
                   </Button>);
      actions.push(<Button
        key="cancel"
        className={classNames('btn-ellipse', 'ml-sm', `${classType}-theme-btn`)}
        size="small"
        icon="close"
        onClick={() => this.assignmentLayout()}
      >
        pagelayout assignment
                   </Button>);

      return actions;
    })();

    return (

      <Panel panelClasses={`${classType}-theme-panel`} panelTitle="page Layout" actionsRight={rightActions} contentClasses="pt-lg pb-lg" >
        <table style={{ width: '100%' }}>
          <thead className="ant-table-thead">
            <tr>
              <th>Action</th>
              <th>Layout Name</th>
              <th>Create By</th>
              <th>Modified By</th>
            </tr>
          </thead>
          <tbody className="ant-table-tbody" >
            {
                allLayouts.map(l => (
                  <tr key={l.id}>
                    <td>
                      <Icon className={`${classType}-theme-icon`} type="edit" onClick={() => this.editLayout(l)} />
                      <Icon className="pl-lg" type="delete" onClick={() => this.deleteLayout(l)} />
                    </td>
                    <td> { l.name }</td>
                    <td> { l.created_by_user } {l.created_at}</td>
                    <td> { l.updated_at }</td>
                  </tr>
                ))
            }
          </tbody>
        </table>
        <Modal
          visible={addLayout.isShowDialog}
          title="Create New PageLayout"
          footer={[
            <Button onClick={() => this.saveAndNext()}> save and next</Button>,
              ]}
          onCancel={() => setAddLayout({ isShowDialog: false })}
        >
          <AddForm allLayouts={allLayouts} ref={(c) => { this.form = c; }} />
        </Modal>
      </Panel>

    );
  }
}
LayoutsTableView.propTypes = {
  intl: intlShape.isRequired,
  objectType: PropTypes.string.isRequired,

};
const mapStateToProps = ({ setup }) => {
  const {
    tableView,
    currentObjectType,
  } = setup.layouts;

  return {
    allLayouts: tableView.allLayouts,
    objectType: currentObjectType,
    addLayout: tableView.addLayout,
  };
};
const mapDispatchToProps = {
  fetchAllLayouts,
  setEditLayout,
  setAddLayout,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(LayoutsTableView)));
