/* eslint-disable no-shadow */
import React from 'react';
import _ from 'lodash';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { Button, Icon, Modal } from 'antd';
import { connect } from 'react-redux';
import { Panel, DeleteConfirmDialog } from 'components/ui/index';
import { objTypeAndClassTypeMap } from 'config/app.config';
import { intlShape, injectIntl } from 'react-intl';
import { SECTIONS } from '../flow/edit/operateType';
import {
  setEditLayout,
  setAddLayout,
  fetchAllLayouts,
  saveLayoutName,
  deleteLayout,
} from '../flow/action';
import { setCurrentLayout, setCurrentTab } from '../flow/edit/action';
import { ASSIGN_LAYOUT_TO_DEPARTMENT, LAYOUT_EDIT } from '../flow/pageAction';
import AddForm from '../component/tableView/addForm';


class LayoutsTableView extends React.Component {
    state={
      deleteDialogVisible: false,
      deleteId: '',
    }
    componentDidMount() {
      this.props.fetchAllLayouts(this.props.objectType);
    }
    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        this.props.fetchAllLayouts(nextProps.objectType);
      }
    }
    add() {
      const { setAddLayout } = this.props;
      setAddLayout({ isShowDialog: true });
    }
    assignmentLayout() {
      const { history, objectType } = this.props;
      history.push(`/setup/${objectType}/pageLayout?action=${ASSIGN_LAYOUT_TO_DEPARTMENT}`);
    }
    editLayout(layout) {
      const {
        setCurrentLayout, history, objectType, setCurrentTab,
      } = this.props;
      setCurrentLayout({ id: layout.id, name: layout.name });
      setCurrentTab(SECTIONS);
      history.push(`/setup/${objectType}/pageLayout?action=${LAYOUT_EDIT}`);
    }
    deleteLayout(layout) {
      this.setState({
        deleteDialogVisible: true,
        deleteId: layout.id,
      });
    }
    confirmDelete() {
      const { deleteLayout, fetchAllLayouts, objectType } = this.props;
      deleteLayout(this.state.deleteId, () => {
        fetchAllLayouts(objectType);
        this.setState({ deleteDialogVisible: false });
      });
    }
    saveAndNext() {
      const {
        saveLayoutName, objectType, setAddLayout,
      } = this.props;
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          saveLayoutName(objectType, values, (layout) => {
            setAddLayout({ isShowDialog: false });
            this.editLayout(layout);
          });
        }
      });
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
          { formatMessage({ id: 'global.ui.button.addBtn' }, { actionType: formatMessage({ id: 'page.layouts.layout' }) })}
                     </Button>);
        actions.push(<Button
          key="cancel"
          className={classNames('btn-ellipse', 'ml-sm', `${classType}-theme-btn`)}
          size="small"
          icon="edit"
          onClick={() => this.assignmentLayout()}
        >
          { formatMessage({ id: 'page.layouts.assingmentLayout' }) }

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
                      <Icon className="pl-sm" type="delete" onClick={() => this.deleteLayout(l)} />
                    </td>
                    <td> { l.name }</td>
                    <td> { } {l.created_at}</td>
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
              <Button key="save" onClick={() => this.saveAndNext()}> save and next</Button>,
              ]}
            onCancel={() => setAddLayout({ isShowDialog: false })}
          >
            <AddForm allLayouts={allLayouts} ref={(c) => { this.form = c; }} />
          </Modal>
          <DeleteConfirmDialog visible={this.state.deleteDialogVisible} onOk={() => this.confirmDelete()} onCancel={() => this.setState({ deleteDialogVisible: false })} >
            <h3>{ formatMessage({ id: 'global.ui.dialog.deleteTitle' })}</h3>
          </DeleteConfirmDialog>
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
  saveLayoutName,
  setCurrentLayout,
  deleteLayout,
  setCurrentTab,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(LayoutsTableView)));
