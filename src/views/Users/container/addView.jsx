/* eslint-disable no-shadow */
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { fetchTeams } from 'store/global/action';
import { connect } from 'react-redux';
import { Panel } from 'components/ui/index';
import { intlShape, injectIntl } from 'react-intl';
import { setDepartment, toggleDepartmentDialog, updateUsers, addUsers } from '../flow/action';
import EditAndAddForm from '../component/editAndAddForm';
import DepartmentDialog from '../component/departmentDialog';

class addEditView extends React.Component {
  componentDidMount() {
    this.props.fetchTeams();
  }
  render() {
    const {
      timeZones, moments, editUser, selectedDepartmentId, selectedDepartmentText, isDisplayDepartmentDialog, setDepartment, toggleDepartmentDialog, addUsers, updateUsers, teams,
    } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <Panel contentClasses="pl-lg pr-lg" panelTitle={_.isEmpty(editUser) ? formatMessage({ id: 'page.users.addUser' }) : formatMessage({ id: 'page.users.editUser' })} >
        <EditAndAddForm editObj={editUser} addUsers={addUsers} updateUsers={updateUsers} toggleDepartmentDialog={toggleDepartmentDialog} timeZones={timeZones} moments={moments} selectedDepartmentId={selectedDepartmentId} selectedDepartmentText={selectedDepartmentText} />
        <DepartmentDialog isDisplayDepartmentDialog={isDisplayDepartmentDialog} toggleDepartmentDialog={toggleDepartmentDialog} setDepartment={setDepartment} teams={teams} />
      </Panel>
    );
  }
}
addEditView.propTypes = {
  intl: intlShape.isRequired,
  actionType: PropTypes.string.isRequired,
};

const mapStateToProps = ({ setupUsers, global }) => ({
  teams: global.settings.teams,
  timeZones: global.settings.timeZones,
  moments: global.settings.moments,
  editUser: setupUsers.users.editUser,
  selectedDepartmentId: setupUsers.users.department_id,
  selectedDepartmentText: setupUsers.users.department_name,
  isDisplayDepartmentDialog: setupUsers.ui.isDisplayDepartmentDialog,
});
const mapDispatchToProps = {
  setDepartment,
  toggleDepartmentDialog,
  addUsers,
  updateUsers,
  fetchTeams,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(addEditView));

