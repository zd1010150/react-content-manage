

import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { fetchTeams } from 'store/global/action';
import { Input, Checkbox, Button, Icon } from 'antd';
import { connect } from 'react-redux';
import { Panel } from 'components/ui/index';
import { fetchPermission, savePermission, toggleDepartmentDialog, setDepartment, setSeletedDeparmentPermission } from '../flow/action';
import { intlShape, injectIntl } from 'react-intl';
import DepartmentDialog from '../../Users/component/departmentDialog';

const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;
const { Search } = Input;
class permissionProfile extends Component {
  componentDidMount() {
    this.props.fetchTeams();
  }
  openDepartment() {
    this.props.toggleDepartmentDialog(true);
  }
  setDepartment({ department_id, department_name }) {
    const { setDepartment, fetchPermission } = this.props;
    setDepartment({ department_id, department_name });
    fetchPermission(department_id);
  }
  changePermission(e) {
    const isChecked = e.target.checked;
    const checkedValue = e.target.value;
    const permissions = this.props.selectedDepartment.permissions.slice();
    const isExist = permissions.indexOf(checkedValue) > -1;
    if (isChecked && !isExist) { // 选中不存在
      permissions.push(checkedValue);
    } else if (!isChecked && isExist) {
      permissions.splice(permissions.indexOf(checkedValue), 1);
    }
    this.props.setSeletedDeparmentPermission(permissions);
  }
  onSubmit() {
    const { savePermission, selectedDepartment } = this.props;

    savePermission({ team_id: selectedDepartment.department_id, permissions: selectedDepartment.permissions, description: '' });
  }
  onCancel() {
    const { fetchPermission, selectedDepartment } = this.props;
    fetchPermission(selectedDepartment.department_id);
  }
  render() {
    const { formatMessage } = this.props.intl;
    const {
      isDisplayDepartmentDialog, toggleDepartmentDialog, teams, permissions, selectedDepartment,
    } = this.props;
    return (
      <Panel panelTitle={formatMessage({ id: 'page.permissionProfile.permissionProfile' })} >
        <div className="pl-lg pr-lg pt-lg pb-lg">
          <h4>Team</h4>
          <Search
            className="input-material-theme"
            placeholder={formatMessage({ id: 'page.permissionProfile.inputTeam' })}
            readOnly
            onClick={() => { this.openDepartment(); }}
            value={selectedDepartment.department_name}
          />
          <DepartmentDialog isDisplayDepartmentDialog={isDisplayDepartmentDialog} toggleDepartmentDialog={toggleDepartmentDialog} setDepartment={this.setDepartment.bind(this)} teams={teams} noDepartment={true} />
          <h4 className="pt-lg pb-lg">Description</h4>
          <TextArea rows={4} />
        </div>
        <div className="panel-section">
          <div className="section-header">Tab Settings</div>
          <div className="section-content mt-lg mb-lg">
            {
              permissions.tabs.map(t =>
                (<Checkbox
                  key={t.value}
                  value={t.value}
                  onChange={e => this.changePermission(e)}
                  checked={selectedDepartment.permissions.indexOf(t.value) > -1}
                >
                  {t.label}
                 </Checkbox>))
            }
          </div>
        </div>
        <div className="panel-section">
          <div className="section-header">Tab Conditions</div>
          <div className="section-content  mt-lg mb-lg">
            <table style={{ width: '100%' }}>
              <thead className="ant-table-thead">
                <tr>
                  <th>Tab</th>
                  <th >Create</th>

                  <th >Delete</th>
                  <th >Edit</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody className="ant-table-tbody">
                {
                    Object.keys(permissions.pages).map(pageTitle => (
                      <tr key={pageTitle}>
                        <td>{pageTitle}</td>
                        {
                          permissions.pages[pageTitle].map(permission =>
                            (
                              <td key={permission.value}>
                                <Checkbox value={permission.value} onChange={e => this.changePermission(e)} checked={selectedDepartment.permissions.indexOf(permission.value) > -1} />
                              </td>
                            ))
                        }
                      </tr>))
                      }
              </tbody>
            </table>
          </div>
        </div>
        <div className="pb-lg pl-lg">
          <Button type="primary" htmlType="submit" disabled={_.isEmpty(`${selectedDepartment.department_id}`)} onClick={() => { this.onSubmit(); }}><Icon type="save" />{ formatMessage({ id: 'global.ui.button.save' })}</Button>
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
});
const mapDispatchToProps = {
  fetchPermission,
  savePermission,
  toggleDepartmentDialog,
  setDepartment,
  fetchTeams,
  setSeletedDeparmentPermission,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(permissionProfile));
