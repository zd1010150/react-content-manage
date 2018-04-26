import React, {Fragment} from 'react';
import _ from 'lodash';
import {intlShape, injectIntl} from 'react-intl';
import {Row, Col, Input, Select, Button, Icon, Radio, Table} from 'antd';
import {
    getUserFolderData
} from '../../flow/action';
import {
    setNewTemplateFolder,
    setNewTemplateName,
    setNewTemplateApiName,
    setNewTemplateDescription,
    setNewTemplateContent,
    setEditTemplateFolder,
    setEditTemplateName,
    setEditTemplateApiName,
    setEditTemplateDescription,
    setEditTemplateContent
} from '../flow/action';
import {connect} from 'react-redux';
import {SelectComponent, SelectComponentVertical, InputComponent} from '../component/formController';
import {Panel} from 'components/ui/index';
import classNames from 'classnames/bind';
import TemplateContent from './templateContent';
import styles from '../emailTemplatesCreation.less';
const cx = classNames.bind(styles);

const BasicInfo = ({
                       disableApiInput,
                       defaultFolderName,
                       setTemplateFolder,
                       setTemplateName,
                       setTemplateApiName,
                       setTemplateDescription,
                       editTemplate,
                       userFolders, selectedFolder, formatMessage
                   }) => {
    return <Fragment>
        <SelectComponent defaultValue={defaultFolderName} editTemplate={editTemplate}
                         onChange={setTemplateFolder} items={userFolders}
                         selectedFolder={selectedFolder} label={formatMessage({id: 'page.emailTemplates.folder'})}/>
        <InputComponent value={editTemplate.name} onChange={setTemplateName}
                        label={formatMessage({id: 'page.emailTemplates.emailTemplatesName'})}/>
        <InputComponent disableInput={disableApiInput} value={editTemplate.api_name} onChange={setTemplateApiName}
                        label={formatMessage({id: 'page.emailTemplates.emailTemplateApiName'})}/>
        <InputComponent value={editTemplate.description} onChange={setTemplateDescription}
                        label={formatMessage({id: 'page.emailTemplates.newTemplateDescription'})}/>
    </Fragment>
}

const FieldInfo = ({formatMessage, onChange}) => {
    return <Row className={`pt-lg ${cx(['new-template-input-row', 'new-template-folder-information'])}`}>
        <Col className="gutter-row field-label" span={7}>
            <SelectComponentVertical label={formatMessage({id: 'page.emailTemplates.fieldInfo'})} onChange={onChange}/>
        </Col>
        <Col className="gutter-row field-value" offset={1} span={7}>
            <SelectComponentVertical label={formatMessage({id: 'page.emailTemplates.selectField'})}
                                     onChange={onChange}/>
        </Col>
        <Col className="gutter-row field-value" offset={1} span={7}>
            <SelectComponentVertical label={formatMessage({id: 'page.emailTemplates.fieldValue'})} onChange={onChange}/>
        </Col>
    </Row>
}

const ActionButtonGroup = ({save, cancel, formatMessage}) => {
    return <div className="pt-md pl-md pb-md">
        <Button className="email-theme-btn mr-md" onClick={save}><Icon
            type="save"/>{ formatMessage({id: 'page.emailTemplates.save'}) }</Button>
        <Button onClick={cancel}><Icon type="close"/>{ formatMessage({id: 'page.emailTemplates.cancel'}) }</Button>
    </div>
}

class TemplateInformation extends React.Component {
    constructor(props){
        super(props);
        this.state = {defaultFolderName: ''}
    }
    componentDidMount() {
        const {getUserFolderData, loginUser, isNewTemplateRouter, selectedFolder, editTemplate} = this.props;
        getUserFolderData(loginUser.id);
        if (isNewTemplateRouter()) {
            if (selectedFolder.id) {
                this.setState({defaultFolderName: selectedFolder.name});
                setNewTemplateFolder(selectedFolder.id)
            } else if (editTemplate.folder) {
                this.setState({defaultFolderName: editTemplate.folder.name});
            }
        } else {
            if (selectedFolder.id) {
                this.setState({defaultFolderName: selectedFolder.name});
            }
        }
    }

    render() {
        const {formatMessage} = this.props.intl;
        const {
            userFolders, selectedFolder, setNewTemplateFolder,
            setNewTemplateName,
            setNewTemplateApiName,
            setNewTemplateDescription,
            setNewTemplateContent,
            registerGetContentHook,
            editTemplate,
            newTemplate,
            setEditTemplateFolder,
            setEditTemplateName,
            setEditTemplateApiName,
            setEditTemplateDescription,
            setEditTemplateContent,
            isNewTemplateRouter,
            save,
            cancel
        } = this.props;

        return (
            <Panel panelTitle={formatMessage({id: 'page.emailTemplates.newEmailTemplate'})}
                   panelClasses="email-theme-panel"
                   contentClasses={`pl-lg pr-lg pt-lg pb-lg ${cx('new-template-panel-content')}`}>
                {isNewTemplateRouter() &&
                <Fragment>
                    <BasicInfo
                        disableApiInput={false}
                        defaultFolderName={this.state.defaultFolderName}
                        setTemplateFolder={setNewTemplateFolder}
                        setTemplateName={setNewTemplateName}
                        setTemplateApiName={setNewTemplateApiName}
                        setTemplateDescription={setNewTemplateDescription}
                        editTemplate={{}}
                        userFolders={userFolders}
                        selectedFolder={selectedFolder}
                        formatMessage={formatMessage}/>
                    <FieldInfo formatMessage={formatMessage}/>
                    <TemplateContent registerGetContentHook={registerGetContentHook}
                                     setTemplateContent={setNewTemplateContent}
                                     content={newTemplate.content}
                                     />
                </Fragment>
                }

                {!isNewTemplateRouter() &&
                <Fragment>
                    <BasicInfo
                        disableApiInput={true}
                        defaultFolderName={this.state.defaultFolderName}
                        setTemplateFolder={setEditTemplateFolder}
                        setTemplateName={setEditTemplateName}
                        setTemplateApiName={setEditTemplateApiName}
                        setTemplateDescription={setEditTemplateDescription}
                        editTemplate={editTemplate}
                        userFolders={userFolders}
                        selectedFolder={{}}
                        formatMessage={formatMessage}/>
                    <FieldInfo formatMessage={formatMessage}/>
                    <TemplateContent registerGetContentHook={registerGetContentHook}
                                     setTemplateContent={setEditTemplateContent}
                                     content={editTemplate.content}
                    />
                </Fragment>
                }


                <ActionButtonGroup cancel={cancel} save={save} formatMessage={formatMessage}/>
            </Panel>

        );
    }
}


const mapStateToProps = ({global, setup, loginUser}, {isNewTemplateRouter}) => {
    const {emailTemplates} = setup;
    return isNewTemplateRouter() ?  {
        loginUser: loginUser,
        userFolders: emailTemplates.userFolders,
        selectedFolder: emailTemplates.selectedFolder,
        newTemplate: emailTemplates.newTemplate,
        } :
        {
        loginUser: loginUser,
        userFolders: emailTemplates.userFolders,
        selectedFolder: emailTemplates.selectedFolder,
        editTemplate: emailTemplates.editTemplate,
        }
};

const mapDispatchToProps = {
    getUserFolderData,
    setNewTemplateFolder,
    setNewTemplateName,
    setNewTemplateApiName,
    setNewTemplateDescription,
    setNewTemplateContent,
    setEditTemplateFolder,
    setEditTemplateName,
    setEditTemplateApiName,
    setEditTemplateDescription,
    setEditTemplateContent
};


TemplateInformation.defaultProps = {
    editTemplate: {},
    newTemplate: {}
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(TemplateInformation));


