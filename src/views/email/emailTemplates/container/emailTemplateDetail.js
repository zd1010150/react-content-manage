/* eslint-disable react/prop-types,no-shadow */
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {intlShape, injectIntl} from 'react-intl';
import {Panel} from 'components/ui/index';
import {setTeams} from 'store/global/action';
import {updateUsers} from 'views/Setup/Users/flow/action';
import {NavLink} from 'react-router-dom';
import EmailTemplatePermission from './emailTemplatePermission';
import {
    setEditFolderViewVisible,
    setPermissionSettingVisible,
    setSharedByVisible,
    queryByPaging,
    setSelectedFolderData,
    deleteTemplate,
    fetchTemplateData,
    fetchNewTemplateData
} from '../../flow/action';
import {
    TemplateDetail
} from '../component';
import {getTeamUsers, getSelectedTeamName} from '../../flow/reselect';
import {withRouter} from "react-router";

class EmailTemplateDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {visible: false}
    }

    componentDidMount() {

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }


    isCurrentUser = () => {
        const {selectedUser, loginUser} = this.props;
        return loginUser.id === selectedUser.id
    }

    render() {
        const {formatMessage} = this.props.intl;
        const {
            setEditFolderViewVisible, setPermissionSettingVisible, isPermissionSettingVisible,
            isSharedByVisible, templates, templatesDataTablePagination, queryByPaging, setSharedByVisible,
            setSelectedFolderData, selectedFolder, userFolders, sharedFolders, selectedUser, loginUser, deleteTemplate, fetchTemplateData, fetchNewTemplateData, history,
            editTemplate, isUserEmailSettingRoute
        } = this.props;
        return (
            <TemplateDetail setEditFolderViewVisible={setEditFolderViewVisible}
                            setPermissionSettingVisible={setPermissionSettingVisible}
                            isPermissionSettingVisible={isPermissionSettingVisible}
                            isSharedByVisible={isSharedByVisible}
                            templates={templates}
                            templatesDataTablePagination={templatesDataTablePagination}
                            queryByPaging={queryByPaging}
                            setSharedByVisible={setSharedByVisible}
                            setSelectedFolderData={setSelectedFolderData}
                            selectedFolder={selectedFolder}
                            userFolders={userFolders}
                            sharedFolders={sharedFolders}
                            selectedUser={selectedUser}
                            deleteTemplate={deleteTemplate}
                            fetchTemplateData={fetchTemplateData}
                            fetchNewTemplateData={fetchNewTemplateData}
                            history={history}
                            editTemplate={editTemplate}
                            formatMessage={formatMessage}
                            isCurrentUser={this.isCurrentUser}
                            showModal={this.showModal}
                            visible={this.state.visible}
                            handleOk={this.handleOk}
                            handleCancel={this.handleCancel}
                            EmailTemplatePermission={EmailTemplatePermission}
                            isUserEmailSettingRoute={isUserEmailSettingRoute}/>
        );
    }
}

EmailTemplateDetail.propTypes = {
    intl: intlShape.isRequired,
};


const mapStateToProps = ({global, setup, loginUser}) => {
    const {emailTemplates} = setup;
    return {
        teams: global.settings.teams,
        teamUsers: getTeamUsers({emailTemplates}),
        loginUser: loginUser,
        isEditFolderViewVisible: emailTemplates.ui.isEditFolderViewVisible,
        isPermissionSettingVisible: emailTemplates.ui.isPermissionSettingVisible,
        isSharedByVisible: emailTemplates.ui.isSharedByVisible,
        templates: emailTemplates.templates.templates,
        templatesDataTablePagination: emailTemplates.templatesDataTablePagination,
        userFolders: emailTemplates.userFolders,
        sharedFolders: emailTemplates.sharedFolders,
        selectedFolder: emailTemplates.selectedFolder,
        selectedUser: emailTemplates.selectedUser,
        editTemplate: emailTemplates.editTemplate
    };
};

const mapDispatchToProps = {
    setTeams,
    updateUsers,
    setEditFolderViewVisible,
    setPermissionSettingVisible,
    setSharedByVisible,
    queryByPaging,
    setSelectedFolderData,
    deleteTemplate,
    fetchTemplateData,
    fetchNewTemplateData
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmailTemplateDetail));

