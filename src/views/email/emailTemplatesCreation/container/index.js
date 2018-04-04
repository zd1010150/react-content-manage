/* eslint-disable react/prop-types,no-shadow */
import React, {Fragment} from 'react';
import _ from 'lodash';
import {fetchTeams} from 'store/global/action';
import {createTemplateData, updateTemplateData} from '../../flow/action';
import {connect} from 'react-redux';
import TemplateInformation from './templateInformation';
import {withRouter} from 'react-router';

class EmailTemplatesCreation extends React.Component {
    componentDidMount() {

    }

    hooksFn = {};

    registerGetContentHook = fn => {
        this.hooksFn.getHTMLContent = fn;
    };

    isNewTemplateRouter = () => {
        return this.props.location.pathname === '/setup/email/templates-creation'
    }

    save = () => {
        const {createTemplateData, updateTemplateData, newTemplate, editTemplate} = this.props;
        const fn = this.hooksFn.getHTMLContent;
        let htmlContent = "<p></p>";
        if (fn) {
            htmlContent = fn();
        }

        if(this.isNewTemplateRouter()){
            createTemplateData({
                folderId: newTemplate.folderId,
                name: newTemplate.name,
                apiName: newTemplate.apiName,
                content: htmlContent,
                description: newTemplate.description
            })
        }else{
            console.log('???', {
                folderId: editTemplate.folderId ? editTemplate.folderId : editTemplate.folder_id,
                name: editTemplate.name,
                apiName: editTemplate.apiName,
                content: htmlContent,
                description: editTemplate.description
            })
            updateTemplateData({
                templateId: editTemplate.id,
                folderId: editTemplate.folderId ? editTemplate.folderId : editTemplate.folder_id,
                name: editTemplate.name,
                apiName: editTemplate.apiName,
                content: htmlContent,
                description: editTemplate.description
            })
        }



    }

    render() {
        return (
            <Fragment>
                <TemplateInformation isNewTemplateRouter={this.isNewTemplateRouter} save={this.save} registerGetContentHook={this.registerGetContentHook}/>
            </Fragment>

        );
    }
}
const mapStateToProps = ({global, setup, loginUser}) => {
    const {emailTemplates} = setup;
    return {
        loginUser: loginUser,
        newTemplate: emailTemplates.newTemplate,
        editTemplate: emailTemplates.editTemplate
    };
};

const mapDispatchToProps = {
    createTemplateData,
    updateTemplateData
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmailTemplatesCreation));

