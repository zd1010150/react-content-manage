/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import { Row, Col, Button, Icon } from 'antd';
import { Panel } from 'components/ui/index';
import { setTeams } from 'store/global/action';
import { updateUsers } from 'views/Setup/Users/flow/action';
import AddDepartment from '../component/add';
import Department from '../component/department';
import User from '../component/user';
import {
  setSelectedUser,
  getAllUser,
  setSelectedTeam,
  deleteDepartment,
  updateTeam,
  setAddVisible,
  setNewDepartName,
  resetNewDepartment,
  addDepartment,
  setSortingTeam,
  setDepartmentVisible} from '../flow/action';
import { getTeamUsers, getSelectedTeamName } from '../flow/reselect';


class EditView extends React.Component {
  componentDidMount() {
    this.props.getAllUser();
  }
  render() {
    const {
      teams,
      newTeam,
      isAddVisible,
      setSelectedTeam,
      setTeams,
      teamUsers,
      isSelectTeamDialogVisible,
      selectedUser,
      setSelectedUser,
      getAllUser,
      updateUsers,
      deleteDepartment,
      updateTeam,
      setAddVisible,
      addDepartment,
      setNewDepartName,
      resetNewDepartment,
      setSortingTeam,
      selectedTeamName,
      isDepartmentVisible,
      setDepartmentVisible
    } = this.props;
    const { formatMessage } = this.props.intl;
    const actionsRight = <div><Button className="btn-ellipse email-theme-btn" size="small" onClick={() => {setDepartmentVisible(!isDepartmentVisible)}}><Icon type="edit" />{ formatMessage({ id: 'page.emailTemplates.hideDepartments' }) }</Button></div>;
    return (
      <Panel panelTitle={formatMessage({ id: 'page.emailTemplates.emailTemplates' })} panelClasses="email-theme-panel" contentClasses="pl-lg pr-lg" actionsRight={actionsRight}>
        { isAddVisible ? <AddDepartment
          newTeam={newTeam}
          setNewDepartName={setNewDepartName}
          addDepartment={addDepartment}
          setAddVisible={setAddVisible}
          resetNewDepartment={resetNewDepartment}
          selectedTeamName={selectedTeamName}
        /> : ''}

        {
          isDepartmentVisible && <Row className="pt-lg pb-lg">
            <Col className="gutter-row field-label" span={12}>
              <Department
                  teams={teams}
                  setTeams={setTeams}
                  setSelectedTeam={setSelectedTeam}
                  setAddVisible={setAddVisible}
                  deleteDepartment={deleteDepartment}
                  updateTeam={updateTeam}
              />
            </Col>
            <Col className="gutter-row field-value" span={12}>
              <User
                  teamUsers={teamUsers}
                  isSelectTeamDialogVisible={isSelectTeamDialogVisible}
                  teams={teams}
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                  getAllUser={getAllUser}
                  updateUsers={updateUsers}
                  selectedTeamName={selectedTeamName}
              />
            </Col>
          </Row>
        }
      </Panel>
    );
  }
}

EditView.propTypes = {
  intl: intlShape.isRequired,
};

const mapStateToProps = ({ global, setup }) => {
    const { emailTemplates } = setup;
    return {
        teams: global.settings.teams,
        teamUsers: getTeamUsers({ emailTemplates }),
        isSelectTeamDialogVisible: emailTemplates.ui.isSelectTeamDialogVisible,
        isAddVisible: emailTemplates.ui.isAddVisible,
        isDepartmentVisible: emailTemplates.ui.isDepartmentVisible,
        selectedUser: emailTemplates.selectedUser,
        newTeam: emailTemplates.newTeam,
        selectedTeamName: getSelectedTeamName({ global, emailTemplates }),
    };
};

const mapDispatchToProps = {
  setTeams,
  setSelectedUser,
  getAllUser,
  updateUsers,
  setSelectedTeam,
  deleteDepartment,
  setAddVisible,
  setNewDepartName,
  resetNewDepartment,
  addDepartment,
  updateTeam,
  setSortingTeam,
  setDepartmentVisible
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(EditView));
