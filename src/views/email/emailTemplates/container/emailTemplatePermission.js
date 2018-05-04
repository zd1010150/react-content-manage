/* eslint-disable react/prop-types,no-shadow */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import { Panel, SelectionPool, SearchPool } from 'components/ui/index';
import { setTeams } from 'store/global/action';
import { updateUsers } from 'views/Setup/Users/flow/action';
import { TemplatePermission } from '../component';
import {
  getUserFolderData,
  getAllUser,
  setSelectedPermissionTeam,
  setPermissionVisible,
  setSelectedUser,
  addPermissionTeam,
  addPermissionUser,
  removeEntityFromSelection,
  updateShareFolderData,
} from '../../flow/action';
import { getPermissionTeamUsers, getSelectedTeamName } from '../../flow/reselect';


class EmailTemplatePermission extends React.Component {
  componentDidMount() {
    const { getAllUser } = this.props;
    getAllUser();
  }

    // Todo add team to permission list
    handleDoubleClickTeam = (selectedKeys, teamName) => {
      const { addPermissionTeam } = this.props;
      const selectTeam = { id: selectedKeys, name: teamName };
      addPermissionTeam(selectTeam);
    }

    handleDoubleClickUser = (selectedKeys, item) => {
      const { addPermissionUser } = this.props;
      const selectUser = { id: selectedKeys, name: item.name, team_id: true };
      addPermissionUser(selectUser);
    }

    handleTagClose = (itemId, isTeam) => {
      this.props.removeEntityFromSelection({ itemId, isTeam });
    }

    save = () => {
      const {
        updateShareFolderData, addedPermissionDepartment, addedPermissionUser, selectedFolder,
      } = this.props;
      const shareToTeams = addedPermissionDepartment.map(item => item.id);
      const shareToUsers = addedPermissionUser.map(item => item.id);
      const folderId = selectedFolder.id;
      updateShareFolderData({ folderId, shareToTeams, shareToUsers });
    }

    render() {
      const {
        teams,
        setSelectedPermissionTeam,
        setTeams,
        teamUsers,
        isPermissionVisible,
        setPermissionVisible,
        addedPermissionDepartment,
        addedPermissionUser,
        selectedFolder,
        isCurrentUser,
      } = this.props;
      const { formatMessage } = this.props.intl;
      return (
        <TemplatePermission
          teams={teams}
          setSelectedPermissionTeam={setSelectedPermissionTeam}
          setTeams={setTeams}
          teamUsers={teamUsers}
          isPermissionVisible={isPermissionVisible}
          setPermissionVisible={setPermissionVisible}
          addedPermissionDepartment={addedPermissionDepartment}
          addedPermissionUser={addedPermissionUser}
          selectedFolder={selectedFolder}
          isCurrentUser={isCurrentUser}
          formatMessage={formatMessage}
          handleTagClose={this.handleTagClose}
          save={this.save}
          handleDoubleClickTeam={this.handleDoubleClickTeam}
          handleDoubleClickUser={this.handleDoubleClickUser}
        />
      );
    }
}

EmailTemplatePermission.propTypes = {
  intl: intlShape.isRequired,
};

const mapStateToProps = ({ global, setup, loginUser }) => {
  const { emailTemplates } = setup;
  return {
    teams: global.settings.teams,
    teamUsers: getPermissionTeamUsers({ emailTemplates }),
    loginUser,
    isSelectTeamDialogVisible: emailTemplates.ui.isSelectTeamDialogVisible,
    isPermissionVisible: emailTemplates.ui.isPermissionVisible,
    selectedUser: emailTemplates.selectedUser,
    selectedTeamName: getSelectedTeamName({ global, emailTemplates }),
    addedPermissionDepartment: emailTemplates.addedPermissionDepartment,
    addedPermissionUser: emailTemplates.addedPermissionUser,
  };
};

const mapDispatchToProps = {
  setTeams,
  getUserFolderData,
  getAllUser,
  updateUsers,
  setSelectedPermissionTeam,
  setPermissionVisible,
  setSelectedUser,
  addPermissionTeam,
  addPermissionUser,
  removeEntityFromSelection,
  updateShareFolderData,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(EmailTemplatePermission));

