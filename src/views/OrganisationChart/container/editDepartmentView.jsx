/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import { Row, Col, Button, Icon } from 'antd';
import { Panel } from 'components/ui/index';
import { setTeams } from 'store/global/action';
import { updateUsers } from 'views/Users/flow/action';
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
  addDepartment } from '../flow/action';
import { getTeamUsers } from '../flow/reselect';


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
      selectedDepartment,
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
    } = this.props;
    const { formatMessage } = this.props.intl;
    const actionsRight = <div><Button className="btn-ellipse" size="small" onClick={() => { setSortableViewVisible(true); }}><Icon type="edit" />{ formatMessage({ id: 'page.organChart.editStructure' }) }</Button></div>;
    return (
      <Panel panelTitle={formatMessage({ id: 'page.organChart.organisitionChart' })} contentClasses="pl-lg pr-lg pt-lg pb-lg" actionsRight={actionsRight}>
        { isAddVisible ? <AddDepartment
          selectedDepartment={selectedDepartment}
          newTeam={newTeam}
          setNewDepartName={setNewDepartName}
          addDepartment={addDepartment}
          setAddVisible={setAddVisible}
          resetNewDepartment={resetNewDepartment}
        /> : ''}

        <Row className="pt-lg">
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
              selectedDepartment={selectedDepartment}
              teamUsers={teamUsers}
              isSelectTeamDialogVisible={isSelectTeamDialogVisible}
              teams={teams}
              selectedUser={selectedUser}
              setSeleteTeamDialogVisible={setSeleteTeamDialogVisible}
              setSelectedUser={setSelectedUser}
              getAllUser={getAllUser}
              updateUsers={updateUsers}
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


const mapStateToProps = ({ global, setupOrgChart }) => ({
  teams: global.settings.teams,
  selectedDepartment: setupOrgChart.selectedDepartment,
  teamUsers: getTeamUsers(setupOrgChart),
  isSelectTeamDialogVisible: setupOrgChart.ui.isSelectTeamDialogVisible,
  isAddVisible: setupOrgChart.ui.isAddVisible,
  selectedUser: setupOrgChart.selectedUser,
  newTeam: setupOrgChart.newTeam,

});
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
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(EditView));

