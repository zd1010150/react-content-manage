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
        const {createTemplateData, updateTemplateData, newTemplate, editTemplate, history} = this.props;
        const fn = this.hooksFn.getHTMLContent;
        let htmlContent = "<p></p>";
        if(editTemplate.content && editTemplate.content !== ''){
            htmlContent = editTemplate.content;
        }
        if (fn) {
            htmlContent = fn();
        }
        console.log('????', htmlContent)

        if(this.isNewTemplateRouter()){
            createTemplateData({
                folderId: newTemplate.folderId,
                name: newTemplate.name,
                apiName: newTemplate.apiName,
                content: htmlContent,
                description: newTemplate.description,
                category: newTemplate.category,
                cb: ()=> history.push('/setup/email/templates')
            })
        }else{
            updateTemplateData({
                templateId: editTemplate.id,
                folderId: editTemplate.folderId ? editTemplate.folderId : editTemplate.folder_id,
                name: editTemplate.name,
                apiName: editTemplate.apiName,
                content: htmlContent,
                description: editTemplate.description,
                category: editTemplate.category,
                cb: ()=> history.push('/setup/email/templates')

            })
        }
    }

    cancel = () => {
        this.props.history.push('/setup/email/templates')
    }

    render() {
        return (
            <Fragment>
                <TemplateInformation isNewTemplateRouter={this.isNewTemplateRouter} save={this.save} cancel={this.cancel} registerGetContentHook={this.registerGetContentHook}/>
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

