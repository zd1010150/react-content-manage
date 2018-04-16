/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import {connect} from 'react-redux';
import {intlShape, injectIntl} from 'react-intl';
import {Panel} from 'components/ui/index';
import {setTeams} from 'store/global/action';
import {updateUsers} from 'views/Setup/Users/flow/action';
import {DepartmentComponent} from '../component';
import {
    getUserFolderData,
    getAllUser,
    setSelectedTeam,
    setDepartmentVisible,
    setSelectedUser
} from '../../flow/action';
import {getTeamUsers, getSelectedTeamName} from '../../flow/reselect';


class EditView extends React.Component {
    componentDidMount() {
        const {getAllUser} = this.props;
        getAllUser();
    }

    render() {
        const {
            teams,
            setSelectedTeam,
            setTeams,
            teamUsers,
            isSelectTeamDialogVisible,
            selectedUser,
            getUserFolderData,
            getAllUser,
            updateUsers,
            selectedTeamName,
            isDepartmentVisible,
            setDepartmentVisible,
            setSelectedUser
        } = this.props;
        const {formatMessage} = this.props.intl;
        return (
            <DepartmentComponent
                teams={teams}
                setSelectedTeam={setSelectedTeam}
                setTeams={setTeams}
                teamUsers={teamUsers}
                isSelectTeamDialogVisible={isSelectTeamDialogVisible}
                selectedUser={selectedUser}
                getUserFolderData={getUserFolderData}
                getAllUser={getAllUser}
                updateUsers={updateUsers}
                selectedTeamName={selectedTeamName}
                isDepartmentVisible={isDepartmentVisible}
                setDepartmentVisible={setDepartmentVisible}
                setSelectedUser={setSelectedUser}
                formatMessage={formatMessage}
            />
        );
    }
}

EditView.propTypes = {
    intl: intlShape.isRequired,
};

const mapStateToProps = ({global, setup, loginUser}) => {
    const {emailTemplates} = setup;
    return {
        teams: global.settings.teams,
        teamUsers: getTeamUsers({emailTemplates}),
        loginUser: loginUser,
        isSelectTeamDialogVisible: emailTemplates.ui.isSelectTeamDialogVisible,
        isDepartmentVisible: emailTemplates.ui.isDepartmentVisible,
        selectedUser: emailTemplates.selectedUser,
        newTeam: emailTemplates.newTeam,
        selectedTeamName: getSelectedTeamName({global, emailTemplates}),
    };
};

const mapDispatchToProps = {
    setTeams,
    getUserFolderData,
    getAllUser,
    updateUsers,
    setSelectedTeam,
    setDepartmentVisible,
    setSelectedUser
};

export default connect(mapStateToProps, mapDispatchToProps)(EditView);

