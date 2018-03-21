

import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { fetchTeams } from 'store/global/action';
import { Input, Checkbox, Button } from 'antd';
import { connect } from 'react-redux';
import { Panel } from 'components/ui/index';
import { fetchPermission, savePermission, toggleDepartmentDialog, setDepartment } from '../flow/action';
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
  render() {
    const { formatMessage } = this.props.intl;
    const {
      isDisplayDepartmentDialog, toggleDepartmentDialog, setDepartment, teams, permissions, selectedDepartment,
    } = this.props;

    return (
      <Panel panelTitle={formatMessage({ id: 'page.permissionProfile.permissionProfile' })} >
        <div className="pl-lg pr-lg pt-lg pb-lg">
          <h4>Team</h4>
          <Search className="input-material-theme" placeholder={formatMessage({ id: 'page.permissionProfile.inputTeam' })} readOnly onClick={() => { this.openDepartment(); }} value={selectedDepartment.department_name} />
          <DepartmentDialog isDisplayDepartmentDialog={isDisplayDepartmentDialog} toggleDepartmentDialog={toggleDepartmentDialog} setDepartment={setDepartment} teams={teams} />
          <h4 className="pt-lg pb-lg">Description</h4>
          <TextArea rows={4} />
        </div>
        <div className="panel-section">
          <div className="section-header">Tab Settings</div>
          <div className="section-content mt-lg mb-lg">
            <CheckboxGroup options={permissions.tabs} />
          </div>
        </div>
        <div className="panel-section">
          <div className="section-header">Tab Conditions</div>
          <div className="section-content  mt-lg mb-lg">
            <table style={{width: '100%'}}>
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
                    Object.keys(permissions.pages).map(pageTitle => (<tr key={pageTitle}>
                      <td>{pageTitle}</td>
                      {
                              permissions.pages[pageTitle].map(permission =>
                                <td key={permission.value}><Checkbox value={permission.value} /></td>)
                          }
                    </tr>))
                      }
              </tbody>
            </table>
          </div>
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
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(permissionProfile));
