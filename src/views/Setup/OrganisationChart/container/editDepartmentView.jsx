/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import { Row, Col, Button, Icon } from 'antd';
import { Panel } from 'components/ui/index';
import { setTeams } from 'store/global/action';
import { updateUsers } from 'views/Setup/Users/flow/action';
import { Permission } from 'components/page/index';
import PERMISSIONS from 'config/app-permission.config';
import AddDepartment from '../component/add';
import Department from '../component/department';
import User from '../component/user';
import {
  setSortableViewVisible,
  setSeleteTeamDialogVisible,
  setSelectedUser,
  getAllUser,
  setSelectedTeam,
  deleteDepartment,
  updateTeam,
  setAddVisible,
  setNewDepartName,
  resetNewDepartment,
  addDepartment,
  setSortingTeam } from '../flow/action';
import { getTeamUsers, getSelectedTeamName, getTeamIds } from '../flow/reselect';


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
      setSortableViewVisible,
      teamUsers,
      isSelectTeamDialogVisible,
      selectedUser,
      setSeleteTeamDialogVisible,
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
      teamIds,
      accountPermissions,
    } = this.props;
    const { formatMessage } = this.props.intl;
    const actionsRight = (<Permission permission={PERMISSIONS.SETUP_COMPANYPROFILE_ORGANISATIONALCHART_UPDATE}>
      <Button className="btn-ellipse" size="small" onClick={() => { setSortableViewVisible(true); setSortingTeam(JSON.parse(JSON.stringify(teams))); }}>
        <Icon type="edit" />{ formatMessage({ id: 'page.organChart.editStructure' }) }
      </Button>
                          </Permission>);
    return (
      <Panel panelTitle={formatMessage({ id: 'page.organChart.organisitionChart' })} contentClasses="pl-lg pr-lg pt-lg pb-lg" actionsRight={actionsRight}>
        { isAddVisible ? <Permission permission={PERMISSIONS.SETUP_COMPANYPROFILE_ORGANISATIONALCHART_ADD}><AddDepartment
          newTeam={newTeam}
          setNewDepartName={setNewDepartName}
          addDepartment={addDepartment}
          setAddVisible={setAddVisible}
          resetNewDepartment={resetNewDepartment}
          selectedTeamName={selectedTeamName}
        />
        </Permission> : ''}

        <Row>
          <Col className="gutter-row field-label pr-lg" span={8}>
            <Department
              teamIds={teamIds}
              teams={teams}
              setTeams={setTeams}
              setSelectedTeam={setSelectedTeam}
              setAddVisible={setAddVisible}
              deleteDepartment={deleteDepartment}
              updateTeam={updateTeam}
              accountPermissions={accountPermissions}
            />
          </Col>
          <Col className="gutter-row field-value pl-lg" span={16}>
            <User
              teamUsers={teamUsers}
              isSelectTeamDialogVisible={isSelectTeamDialogVisible}
              teams={teams}
              selectedUser={selectedUser}
              setSeleteTeamDialogVisible={setSeleteTeamDialogVisible}
              setSelectedUser={setSelectedUser}
              getAllUser={getAllUser}
              updateUsers={updateUsers}
              selectedTeamName={selectedTeamName}
            />
          </Col>
        </Row>
      </Panel>
    );
  }
}

EditView.propTypes = {
  intl: intlShape.isRequired,
};


const mapStateToProps = ({ global, setup }) => {
  const { orgChart } = setup;
  return {
    teamIds: getTeamIds({ global }),
    teams: global.settings.teams,
    teamUsers: getTeamUsers({ orgChart }),
    isSelectTeamDialogVisible: orgChart.ui.isSelectTeamDialogVisible,
    isAddVisible: orgChart.ui.isAddVisible,
    selectedUser: orgChart.selectedUser,
    newTeam: orgChart.newTeam,
    selectedTeamName: getSelectedTeamName({ global, orgChart }),
    accountPermissions: global.permissions,
  };
};


const mapDispatchToProps = {
  setTeams,
  setSortableViewVisible,
  setSelectedUser,
  setSeleteTeamDialogVisible,
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
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(EditView));

