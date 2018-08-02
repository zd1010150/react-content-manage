/* eslint-disable react/prop-types,no-shadow */
import React, {Fragment} from 'react';
import _ from 'lodash';
import {fetchTeams} from 'store/global/action';
import {createTemplateData, updateTemplateData} from '../../flow/action';
import {connect} from 'react-redux';
import TemplateInformation from './templateInformation';
import {withRouter} from 'react-router';

class EmailTemplatesCreation extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            attachments: []
        }
    }
    componentDidMount() {

    }

    hooksFn = {};

    registerGetContentHook = fn => {
        this.hooksFn.getHTMLContent = fn;
    };

    isSetupTemplatesCreation(){
        return this.props.location.pathname === '/setup/email/templates-creation'
    }

    isUserSettingTemplatesCreation(){
        const patt = new RegExp("/user/email-setting/templates-creation");
        return patt.test(this.props.location.pathname);
    }

    isUserSetting(){
        const patt = new RegExp("/user/email-setting");
        return patt.test(this.props.location.pathname);
    }

    isNewTemplateRouter = () => {
        return this.isSetupTemplatesCreation() || this.isUserSettingTemplatesCreation();
    }

    onFileUpload = (response, error) => {
        if (_.isEmpty(error)) {
            const files = response.map((r)=>{
                return r.data.id
            })
            this.setState({attachments: files})
        }
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

        if(this.isNewTemplateRouter()){
            createTemplateData({
                folderId: newTemplate.folderId,
                name: newTemplate.name,
                apiName: newTemplate.apiName,
                content: htmlContent,
                description: newTemplate.description,
                category: newTemplate.category,
                attachments: this.state.attachments,
                cb: ()=> !this.isUserSetting() ? history.push('/setup/email/templates') : history.push('/user/email-setting')

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
                attachments: this.state.attachments,
                cb: ()=> !this.isUserSetting() ? history.push('/setup/email/templates') : history.push('/user/email-setting')

            })
        }
    }

    cancel = () => {
        const {history} = this.props;
        console.log('this.isUserSetting()', this.isUserSetting())
        this.isUserSetting() ? history.push('/user/email-setting') : history.push('/setup/email/templates')
    }

    render() {
        return (
            <Fragment>
                <div id="TemplateInformation">
                    <TemplateInformation onFileUpload={this.onFileUpload} isNewTemplateRouter={this.isNewTemplateRouter} save={this.save} cancel={this.cancel} registerGetContentHook={this.registerGetContentHook}/>
                </div>
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

