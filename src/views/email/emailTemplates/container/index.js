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
import EditView from './departmentView';
import EmailTemplateDetail from './emailTemplateDetail';
import EmailEditFolder from './emailEditFolder';
import {withRouter} from "react-router";
import { Permission, Unauthentication } from 'components/page/index';
import PERMISSIONS from 'config/app-permission.config';


class EmailTemplates extends React.Component {
    componentDidMount() {
        const {getUserFolderData, loginUser, setSelectedUser, location} = this.props;
        if(!this.isUserEmailSettingRoute()){
            this.props.fetchTeams();
        }
        // get current user's folders as default
        getUserFolderData(loginUser.id);
        // set the radio button content as current user's name
        setSelectedUser(loginUser);
    }

    isUserEmailSettingRoute = () => {
        const {location} = this.props;
        const patt = new RegExp("/user/email-setting");
        return patt.test(location.pathname);
    }

    render() {
        const {isEditFolderViewVisible, location, intl} = this.props;
        return (
            <Fragment>
                <Permission permission={PERMISSIONS.SETUP_EMAILCOMMUNICATIONS_EMAILTEMPLATES} errorComponent={<Unauthentication />}>
                    {!this.isUserEmailSettingRoute() && <EditView intl={intl}/>}
                    {!isEditFolderViewVisible ? <EmailTemplateDetail isUserEmailSettingRoute={this.isUserEmailSettingRoute} intl={intl}/> : <EmailEditFolder intl={intl}/>}
                </Permission>
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

