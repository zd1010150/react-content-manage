

import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { fetchTeams } from 'store/global/action';
import { Input, Checkbox, Button, Icon, Tree } from 'antd';
import { connect } from 'react-redux';
import { Panel } from 'components/ui/index';
import { fetchPermission, savePermission, toggleDepartmentDialog, setDepartment, setSeletedDeparmentPermission, fetchAllPermission, setExpandedKeys } from '../flow/action';
import { intlShape, injectIntl } from 'react-intl';
import DepartmentDialog from '../../Users/component/departmentDialog';
import { getTeamIds } from '../flow/reselect';
import styles from '../index.less';

const { TreeNode } = Tree;
const { TextArea } = Input;
const { Search } = Input;
const cx = classNames.bind(styles);

class permissionProfile extends Component {
  onExpand(expandedKeys) {
    this.props.setExpandedKeys(expandedKeys);
  }
  componentDidMount() {
    this.props.fetchTeams();
    this.props.fetchAllPermission();
  }
  openDepartment() {
    this.props.toggleDepartmentDialog(true);
  }
  setDepartment({ department_id, department_name }) {
    const { setDepartment, fetchPermission } = this.props;
    if (_.isEmpty(`${department_id}`)) {
      return;
    }
    setDepartment({ department_id, department_name });
    fetchPermission(department_id);
  }
  onCheckPermission(checkedKeys) {
    this.props.setSeletedDeparmentPermission(checkedKeys, false);
  }
  permissionChange(e, permission) {
    debugger;
    const isChecked = e.target.checked;
    const { permissions } = this.props.selectedDepartment;
    const newPermissions = [...permissions];
    debugger;
    if (isChecked) {
      newPermissions.push(permission);
    } else if (!isChecked && newPermissions.indexOf(permission) > -1) {
      debugger;
      newPermissions.splice(newPermissions.indexOf(permission), 1);
    }
    this.props.setSeletedDeparmentPermission(newPermissions, false);
  }
  onSubmit() {
    const { savePermission, selectedDepartment } = this.props;
    if (_.isEmpty(`${selectedDepartment.department_id}`)) {
      return;
    }
    savePermission({ team_id: selectedDepartment.department_id, permissions: selectedDepartment.permissions, description: selectedDepartment.description });
  }
  onCancel() {
    const { fetchPermission, selectedDepartment } = this.props;
    if (_.isEmpty(`${selectedDepartment.department_id}`)) {
      return;
    }
    fetchPermission(selectedDepartment.department_id);
  }
  renderTreeNodes(data) {
    const { permissions } = this.props.selectedDepartment;
    if (!_.isArray(data) && !_.isEmpty(data)) {
      return Object.keys(data).map((tab) => {
        const tabPermission = data[tab];
        const treeEl = (<Checkbox onChange={e => this.permissionChange(e, tabPermission.id)} checked={permissions.indexOf(tabPermission.id) > -1}>
          {tabPermission.name}
        </Checkbox>);
        if (!_.isEmpty(tabPermission.child_rec)) {
          return (
            <TreeNode className={cx('tree-node-line')} title={treeEl} key={tabPermission.id}>
              {this.renderTreeNodes(tabPermission.child_rec)}
            </TreeNode>
          );
        }
        return (<TreeNode className={cx('tree-node-line')} title={treeEl} key={tabPermission.id} />);
      });
    }
  }

  render() {
    const { formatMessage } = this.props.intl;
    const {
      isDisplayDepartmentDialog,
      toggleDepartmentDialog,
      teams,
      permissions,
      selectedDepartment,
      teamIds,
      treeExpandKeys,
    } = this.props;

    return (
      <Panel panelTitle={formatMessage({ id: 'page.permissionProfile.permissionProfile' })} >
        <div className="pl-lg pr-lg pt-lg pb-lg">
          <h4>{formatMessage({ id: 'global.properNouns.department' })} </h4>
          <Search
            className="input-material-theme"
            placeholder={formatMessage({ id: 'page.permissionProfile.inputTeam' })}
            readOnly
            onClick={() => { this.openDepartment(); }}
            value={selectedDepartment.department_name}
          />
          <DepartmentDialog
            isDisplayDepartmentDialog={isDisplayDepartmentDialog}
            toggleDepartmentDialog={toggleDepartmentDialog}
            setDepartment={({ department_id, department_name }) => this.setDepartment({ department_id, department_name })}
            teams={teams}
            noDepartment
            teamIds={teamIds}
          />
          <h4 className="pt-lg pb-lg">{formatMessage({ id: 'page.permissionProfile.description' })}</h4>
          <TextArea rows={4} onChange={e => this.props.setDepartment({ description: e.target.value })} value={selectedDepartment.description} />
        </div>
        <div className="panel-section">
          <div className="section-header">{formatMessage({ id: 'page.permissionProfile.permissionSetting' })}</div>
          <div className="section-content mt-lg mb-lg">
            <Tree
              defaultExpandAll
              autoExpandParent={false}
              checkedKeys={selectedDepartment.permissions}
              expandedKeys={treeExpandKeys}
              onExpand={expandedKeys => this.onExpand(expandedKeys)}
            >
              { this.renderTreeNodes(permissions)}
            </Tree>
          </div>
        </div>
        <div className="pb-lg pl-lg">
          <Button type="primary" htmlType="submit" disabled={_.isEmpty(`${selectedDepartment.department_id}`)} onClick={() => { this.onSubmit(); }}>
            <Icon type="save" />
            { formatMessage({ id: 'global.ui.button.save' })}
          </Button>
          <Button type="danger" className="ml-sm" onClick={() => { this.onCancel(); }}><Icon type="close" />{ formatMessage({ id: 'global.ui.button.cancel' })}</Button>
        </div>
      </Panel>
    );
  }
}
permissionProfile.propTypes = {
  intl: intlShape.isRequired,
};
const mapStateToProps = ({ global, setup }) => ({
  teams: global.settings.teams,
  permissions: setup.permissionPro.permissions,
  selectedDepartment: setup.permissionPro.selectedDepartment,
  isDisplayDepartmentDialog: setup.permissionPro.ui.isDisplayDepartmentDialog,
  teamIds: getTeamIds({ global }),
  treeExpandKeys: setup.permissionPro.ui.treeExpandKeys,
});
const mapDispatchToProps = {
  fetchPermission,
  savePermission,
  toggleDepartmentDialog,
  setDepartment,
  fetchTeams,
  setSeletedDeparmentPermission,
  fetchAllPermission,
  setExpandedKeys,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(permissionProfile));
