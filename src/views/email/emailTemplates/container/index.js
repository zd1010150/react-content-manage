/* eslint-disable react/prop-types,no-shadow */
import React, {Fragment} from 'react';
import _ from 'lodash';
import {fetchTeams} from 'store/global/action';
import {intlShape, injectIntl} from 'react-intl';
import {
    setEditFolderViewVisible,
    getUserFolderData,
    setSelectedUser
} from '../../flow/action';
import {connect} from 'react-redux';
import EditView from './editDepartmentView';
import EmailTemplateDetail from './emailTemplateDetail';
import EmailEditFolder from './emailEditFolder';
import {withRouter} from "react-router";


class EmailTemplates extends React.Component {
    componentDidMount() {
        const {getUserFolderData, loginUser, setSelectedUser} = this.props;
        this.props.fetchTeams();
        // get current user's folders as default
        getUserFolderData(loginUser.id);
        // set the radio button content as current user's name
        setSelectedUser(loginUser);
    }

    render() {
        const {isEditFolderViewVisible, location, intl} = this.props;
        return (
            <Fragment>
                {location.pathname !== '/user/email-setting' && <EditView intl={intl}/>}
                {!isEditFolderViewVisible ? <EmailTemplateDetail intl={intl}/> : <EmailEditFolder intl={intl}/>}

            </Fragment>

        );
    }
}

const mapStateToProps = ({global, setup, loginUser}) => {
    const {emailTemplates} = setup;
    return {
        teams: global.settings.teams,
        isEditFolderViewVisible: emailTemplates.ui.isEditFolderViewVisible,
        loginUser: loginUser
    };
};

const mapDispatchToProps = {
    fetchTeams,
    setEditFolderViewVisible,
    setSelectedUser,
    getUserFolderData
};

export default injectIntl(withRouter(connect(mapStateToProps, mapDispatchToProps)(EmailTemplates)));

