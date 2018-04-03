/* eslint-disable react/prop-types,no-shadow */
import React, {Fragment} from 'react';
import _ from 'lodash';
import {fetchTeams} from 'store/global/action';
import {createTemplate} from '../../flow/action';
import {connect} from 'react-redux';
import TemplateInformation from './templateInformation';


class EmailTemplatesCreation extends React.Component {
    componentDidMount() {

    }

    hooksFn = {};

    registerGetContentHook = fn => {
        this.hooksFn.getHTMLContent = fn;
    };

    save = () => {
        const {createTemplate, newTemplate} = this.props;
        const fn = this.hooksFn.getHTMLContent;
        let htmlContent = "<p></p>";
        if (fn) {
            htmlContent = fn();
        }

        createTemplate({
            folderId: newTemplate.folderId,
            name: newTemplate.name,
            apiName: newTemplate.apiName,
            content: htmlContent,
            description: newTemplate.description
        })

    }

    render() {
        return (
            <Fragment>
                <TemplateInformation save={this.save} registerGetContentHook={this.registerGetContentHook}/>
            </Fragment>

        );
    }
}
const mapStateToProps = ({global, setup, loginUser}) => {
    const {emailTemplates} = setup;
    return {
        loginUser: loginUser,
        newTemplate: emailTemplates.newTemplate,
    };
};

const mapDispatchToProps = {
    createTemplate
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailTemplatesCreation);

