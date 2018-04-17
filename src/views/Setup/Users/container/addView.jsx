/* eslint-disable no-shadow */
import React from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Panel } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';
import { setDepartment, toggleDepartmentDialog, updateUsers, addUsers, setEditUser } from '../flow/action';
import EditAndAddForm from '../component/editAndAddForm';
import DepartmentDialog from '../component/departmentDialog';
import { getTeamIds } from '../flow/reselect';

class addEditView extends React.Component {
  render() {
    const {
      timeZones, moments, editUser, selectedDepartmentId, selectedDepartmentText, isDisplayDepartmentDialog, setDepartment, toggleDepartmentDialog, addUsers, updateUsers, teams, history,teamIds,
    } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <Panel contentClasses="pl-lg pr-lg" panelTitle={_.isEmpty(editUser) ? formatMessage({ id: 'page.users.addUser' }) : formatMessage({ id: 'page.users.editUser' })} >
        <EditAndAddForm
          editObject={editUser}
          addUsers={addUsers}
          updateUsers={updateUsers}
          toggleDepartmentDialog={toggleDepartmentDialog}
          timeZones={timeZones}
          moments={moments}
          selectedDepartmentId={selectedDepartmentId}
          selectedDepartmentText={selectedDepartmentText}
          onCancel={() => history.push('/setup/company-info/users')}
          teamIds={teamIds}
        />
        <DepartmentDialog isDisplayDepartmentDialog={isDisplayDepartmentDialog} toggleDepartmentDialog={toggleDepartmentDialog} setDepartment={setDepartment} teams={teams} />
      </Panel>
    );
  }
}
addEditView.propTypes = {
  intl: intlShape.isRequired,
  actionType: PropTypes.string.isRequired,
};

const mapStateToProps = ({ setup, global }) => ({
  teams: global.settings.teams,
  timeZones: global.settings.timeZones,
  moments: global.settings.moments,
  editUser: setup.users.users.editUser,
  selectedDepartmentId: setup.users.users.department_id,
  selectedDepartmentText: setup.users.users.department_name,
  isDisplayDepartmentDialog: setup.users.ui.isDisplayDepartmentDialog,
  teamIds: getTeamIds({ global }),
});
const mapDispatchToProps = {
  setDepartment,
  toggleDepartmentDialog,
  addUsers,
  updateUsers,
  setEditUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(addEditView)));

