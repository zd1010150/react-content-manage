/* eslint-disable react/prop-types,no-shadow */
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {intlShape, injectIntl} from 'react-intl';
import {Row, Col, Button, Icon} from 'antd';
import {Panel, SelectionPool, SearchPool} from 'components/ui/index';
import {setTeams} from 'store/global/action';
import {updateUsers} from 'views/Setup/Users/flow/action';
import Department from '../component/department';
import User from '../component/user';
import Enums from 'utils/EnumsManager';
import {
    getUserFolderData,
    getAllUser,
    setSelectedPermissionTeam,
    setPermissionVisible,
    setSelectedUser,
    addPermissionTeam,
    addPermissionUser,
    removeEntityFromSelection,
    updateShareFolderData
} from '../../flow/action';
import {getPermissionTeamUsers, getSelectedTeamName} from '../../flow/reselect';


class EmailTemplatePermission extends React.Component {
    componentDidMount() {
        const {getAllUser, getUserFolderData, loginUser, setSelectedUser} = this.props;
        getAllUser();
    }

    //Todo add team to permission list
    handleDoubleClickTeam = (selectedKeys, teamName) => {
        const {addPermissionTeam} = this.props;
        const selectTeam = {id: selectedKeys, name: teamName};
        addPermissionTeam(selectTeam);

    }

    handleDoubleClickUser = (selectedKeys, item) => {
        const {addPermissionUser} = this.props;
        const selectUser = {id: selectedKeys, name: item.name, team_id: true};
        addPermissionUser(selectUser);
    }

    handleTagClose = (itemId, isTeam) => {
        this.props.removeEntityFromSelection({itemId, isTeam})
    }

    save = () => {
        const {updateShareFolderData, addedPermissionDepartment, addedPermissionUser, selectedFolder} = this.props;
        const shareToTeams = addedPermissionDepartment.map((item)=>item.id)
        const shareToUsers = addedPermissionUser.map((item)=>item.id)
        const folderId = selectedFolder.id;
        updateShareFolderData({folderId, shareToTeams, shareToUsers})
    }

    render() {
        const {
            teams,
            setSelectedPermissionTeam,
            setTeams,
            teamUsers,
            isSelectTeamDialogVisible,
            selectedUser,
            getUserFolderData,
            getAllUser,
            updateUsers,
            selectedTeamName,
            isPermissionVisible,
            setPermissionVisible,
            setSelectedUser,
            addPermissionTeam,
            addedPermissionDepartment,
            addedPermissionUser,
            selectedFolder,
            isCurrentUser
        } = this.props;
        const {formatMessage} = this.props.intl;
        return (
            <div className="pl-lg pt-md pb-lg">
                <div>{formatMessage({id: 'page.emailTemplates.permissionTitle'})}</div>
                <SelectionPool
                    theme={Enums.ThemeTypes.Email}
                    teams={addedPermissionDepartment}
                    users={addedPermissionUser}
                    onTagClose={this.handleTagClose}
                    closable
                    withIcon
                />
                {
                    !isPermissionVisible && selectedFolder.id && isCurrentUser() &&
                    <Button className="email-theme-btn mt-sm" size="small" onClick={() => {
                        setPermissionVisible(true)
                    }}><Icon type="user"/>{ formatMessage({id: 'page.emailTemplates.addNewUser'}) }</Button>
                }
                {
                    isPermissionVisible &&
                    <Button className="email-theme-btn mt-sm" size="small" onClick={this.save}><Icon type="save"/>{ formatMessage({id: 'page.emailTemplates.save'}) }</Button>
                }
                {
                    isPermissionVisible &&
                    <Button className="ml-sm" size="small" onClick={() => {
                        setPermissionVisible(false)
                    }}><Icon type="reload"/>{ formatMessage({id: 'page.emailTemplates.cancel'}) }</Button>
                }
                {
                    isPermissionVisible && <Row className="pt-lg pb-lg">
                        <Col className="gutter-row field-label" span={12}>
                            <Department
                                canDoubleClick={true}
                                handleDoubleClick={this.handleDoubleClickTeam}
                                teams={teams}
                                setTeams={setTeams}
                                setSelectedTeam={setSelectedPermissionTeam}
                            />
                        </Col>
                        <Col className="gutter-row field-value" span={12}>
                            <SearchPool
                                theme={Enums.ThemeTypes.Email}
                                title='Click Chart to Choose Department'
                                users={teamUsers}
                                onTagDoubleClick={this.handleDoubleClickUser}
                            />
                        </Col>
                    </Row>
                }
            </div>
        );
    }
}

EmailTemplatePermission.propTypes = {
    intl: intlShape.isRequired,
};

const mapStateToProps = ({global, setup, loginUser}) => {
    const {emailTemplates} = setup;
    return {
        teams: global.settings.teams,
        teamUsers: getPermissionTeamUsers({emailTemplates}),
        loginUser: loginUser,
        isSelectTeamDialogVisible: emailTemplates.ui.isSelectTeamDialogVisible,
        isPermissionVisible: emailTemplates.ui.isPermissionVisible,
        selectedUser: emailTemplates.selectedUser,
        selectedTeamName: getSelectedTeamName({global, emailTemplates}),
        addedPermissionDepartment: emailTemplates.addedPermissionDepartment,
        addedPermissionUser: emailTemplates.addedPermissionUser
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
    updateShareFolderData
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(EmailTemplatePermission));

