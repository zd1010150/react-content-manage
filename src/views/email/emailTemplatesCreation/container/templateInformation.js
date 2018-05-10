import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
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
    setNewTemplateCategory,
    setEditTemplateFolder,
    setEditTemplateName,
    setEditTemplateApiName,
    setEditTemplateDescription,
    setEditTemplateContent,
    setEditTemplateCategory
} from '../flow/action';
import {connect} from 'react-redux';
import {SelectComponent, SelectComponentVertical, InputComponent} from '../component/formController';
import {Panel} from 'components/ui/index';
import classNames from 'classnames/bind';
import TemplateContent from './templateContent';
import styles from '../emailTemplatesCreation.less';
const cx = classNames.bind(styles);

const BasicInfo = ({
                       fieldOption,
                       disableApiInput,
                       defaultFolderName,
                       setTemplateFolder,
                       setTemplateName,
                       setTemplateApiName,
                       setTemplateDescription,
                       setTemplateCategory,
                       editTemplate,
                       userFolders, selectedFolder, formatMessage
                   }) => {
    const categories = Object.keys(fieldOption).map((name, index) => {
        return {
            id: index,
            name
        }
    });
    return <Fragment>
        <SelectComponent defaultValue={selectedFolder.name ? selectedFolder.name : ''}
                         onChange={setTemplateFolder} items={userFolders}
                         label={formatMessage({id: 'page.emailTemplates.folder'})}
                         value={v => v.id}/>
        <InputComponent value={editTemplate.name} onChange={setTemplateName}
                        label={formatMessage({id: 'page.emailTemplates.emailTemplatesName'})}/>
        <InputComponent disableInput={disableApiInput} value={editTemplate.api_name} onChange={setTemplateApiName}
                        label={formatMessage({id: 'page.emailTemplates.emailTemplateApiName'})}/>
        <InputComponent optional={true} value={editTemplate.description} onChange={setTemplateDescription}
                        label={formatMessage({id: 'page.emailTemplates.newTemplateDescription'})}/>
        <SelectComponent defaultValue={editTemplate.category ? editTemplate.category : 'leads'}
                         onChange={setTemplateCategory} items={categories}
                         label={formatMessage({id: 'page.emailTemplates.category'})}
                         value={v => v.name}/>
    </Fragment>
}

const convertFieldToMap = (data) => {
    return data.reduce((newObj, current)=>{
        let obj = {};
        obj[current.id] = {label: current.field_label, value: current.field_value};
        return {
            ...newObj,
            ...obj
        }
    }, {})
}

const FieldInfo = ({selectedField, selectField, selectedLabel, selectedValue, template, fieldOption, formatMessage, selectLabel, selectValue}) => {
    console.log('selectedField', selectedField)
    console.log('fieldOption', fieldOption)
    let fieldLabels, fieldValues = [];
    let fieldObj = {};
    let convertObj;
    if (!_.isEmpty(template) && !_.isEmpty(fieldOption)) {
        convertObj  = convertFieldToMap(fieldOption[template.category]);
    }

    if(!!selectedField.label){
        fieldValues = [convertObj[selectedField.key]["value"]]
    }

    return <Row className={`pt-lg ${cx(['new-template-input-row', 'new-template-folder-information'])}`}>
        <Col className="gutter-row field-value" span={10}>
            <SelectComponentVertical labelInValue={true} items={fieldOption[template.category]} value={v => v.field_label} label={formatMessage({id: 'page.emailTemplates.selectField'})}
                                     onChange={selectField}/>
        </Col>
        <Col className="gutter-row field-value" offset={2} span={10}>
            <SelectComponentVertical labelInValue={false} defaultValue={selectedValue} items={fieldValues} label={formatMessage({id: 'page.emailTemplates.fieldValue'})}
                                     onChange={selectValue}/>
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
    constructor(props) {
        super(props);
        this.state = {defaultFolderName: '', selectedField: {}, selectedLabel: '', selectedValue: ''}
    }

    componentDidMount() {
        const {getUserFolderData, loginUser, isNewTemplateRouter, selectedFolder, setNewTemplateFolder, setNewTemplateCategory, editTemplate} = this.props;
        getUserFolderData(loginUser.id);
        if (isNewTemplateRouter()) {
            if (selectedFolder.id) {
                // this.setState({defaultFolderName: selectedFolder.name});
                setNewTemplateFolder(selectedFolder.id);
            }
            setNewTemplateCategory("leads");
        }
    }

    selectField = (value) => {
        this.setState({selectedField: value}, ()=>{
            this.setState({selectedValue: ''})
        })
    }

    selectLabel = (value) => {
        this.setState({selectedLabel: value})
    }

    selectValue = (value) => {
        this.setState({selectedValue: value})
    }

    render() {
        const {formatMessage} = this.props.intl;
        const {
            userFolders, selectedFolder, setNewTemplateFolder,
            setNewTemplateName,
            setNewTemplateApiName,
            setNewTemplateDescription,
            setNewTemplateContent,
            setNewTemplateCategory,
            registerGetContentHook,
            editTemplate,
            newTemplate,
            setEditTemplateFolder,
            setEditTemplateName,
            setEditTemplateApiName,
            setEditTemplateDescription,
            setEditTemplateContent,
            setEditTemplateCategory,
            isNewTemplateRouter,
            save,
            cancel,
            fieldOption,
            onFileUpload
        } = this.props;

        return (
            <Panel panelTitle={formatMessage({id: 'page.emailTemplates.newEmailTemplate'})}
                   panelClasses="email-theme-panel"
                   contentClasses={`pl-lg pr-lg pt-lg pb-lg ${cx('new-template-panel-content')}`}>
                {isNewTemplateRouter() &&
                <Fragment>
                    <BasicInfo
                        fieldOption={fieldOption}
                        disableApiInput={false}
                        defaultFolderName={this.state.defaultFolderName}
                        setTemplateFolder={setNewTemplateFolder}
                        setTemplateName={setNewTemplateName}
                        setTemplateApiName={setNewTemplateApiName}
                        setTemplateDescription={setNewTemplateDescription}
                        setTemplateCategory={setNewTemplateCategory}
                        editTemplate={{}}
                        userFolders={userFolders}
                        selectedFolder={selectedFolder}
                        formatMessage={formatMessage}/>
                    <FieldInfo selectedLabel={this.state.selectedLabel}
                               selectedValue={this.state.selectedValue}
                               selectedField={this.state.selectedField}
                               selectLabel={this.selectLabel}
                               selectValue={this.selectValue}
                               selectField={this.selectField}
                               template={newTemplate}
                               fieldOption={fieldOption}
                               formatMessage={formatMessage}/>
                    <TemplateContent registerGetContentHook={registerGetContentHook}
                                     setTemplateContent={setNewTemplateContent}
                                     content={newTemplate.content}
                                     selectedValue={this.state.selectedValue}
                                     attachments={[]}
                                     onFileUpload={onFileUpload}
                    />
                </Fragment>
                }

                {!isNewTemplateRouter() && !_.isEmpty(editTemplate) &&
                <Fragment>
                    <BasicInfo
                        fieldOption={fieldOption}
                        disableApiInput={true}
                        defaultFolderName={this.state.defaultFolderName}
                        setTemplateFolder={setEditTemplateFolder}
                        setTemplateName={setEditTemplateName}
                        setTemplateApiName={setEditTemplateApiName}
                        setTemplateDescription={setEditTemplateDescription}
                        setTemplateCategory={setEditTemplateCategory}
                        editTemplate={editTemplate}
                        userFolders={userFolders}
                        selectedFolder={selectedFolder}
                        formatMessage={formatMessage}/>
                    <FieldInfo selectedLabel={this.state.selectedLabel}
                               selectedValue={this.state.selectedValue}
                               selectedField={this.state.selectedField}
                               selectLabel={this.selectLabel}
                               selectValue={this.selectValue}
                               selectField={this.selectField}
                               template={editTemplate}
                               fieldOption={fieldOption}
                               formatMessage={formatMessage}/>
                    <TemplateContent registerGetContentHook={registerGetContentHook}
                                     setTemplateContent={setEditTemplateContent}
                                     content={editTemplate.content}
                                     attachments={editTemplate.attachments}
                                     selectedValue={this.state.selectedValue}
                                     onFileUpload={onFileUpload}
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
    return isNewTemplateRouter() ? {
        fieldOption: emailTemplates.fieldOption,
        loginUser: loginUser,
        userFolders: emailTemplates.userFolders,
        selectedFolder: emailTemplates.selectedFolder,
        newTemplate: emailTemplates.newTemplate,
    } :
        {
            fieldOption: emailTemplates.fieldOption,
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
    setNewTemplateCategory,
    setEditTemplateFolder,
    setEditTemplateName,
    setEditTemplateApiName,
    setEditTemplateDescription,
    setEditTemplateContent,
    setEditTemplateCategory
};


TemplateInformation.defaultProps = {
    editTemplate: {},
    newTemplate: {}
};

TemplateInformation.propTypes = {
    isNewTemplateRouter: PropTypes.func.isRequired,
    save: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    registerGetContentHook: PropTypes.func.isRequired,
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(TemplateInformation));


