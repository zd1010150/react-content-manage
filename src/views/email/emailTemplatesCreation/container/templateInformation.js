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
        <InputComponent value={editTemplate.description} onChange={setTemplateDescription}
                        label={formatMessage({id: 'page.emailTemplates.newTemplateDescription'})}/>
        <SelectComponent defaultValue={editTemplate.category ? editTemplate.category : 'leads'}
                         onChange={setTemplateCategory} items={categories}
                         label={formatMessage({id: 'page.emailTemplates.category'})}
                         value={v => v.name}/>
    </Fragment>
}

const FieldInfo = ({selectedLabel, selectedValue, template, fieldOption, formatMessage, selectLabel, selectValue}) => {
    console.log('template', template)
    console.log('fieldOption', fieldOption)
    let fieldLabels, fieldValues = [];
    let fieldObj = {};

    if (!_.isEmpty(template) && !_.isEmpty(fieldOption)) {
        fieldLabels = fieldOption[template.category].map((obj, index) => {
            return obj.field_label
        });
        if(!!selectedLabel){
            fieldOption[template.category].map((obj, index) => {
                fieldObj[obj.field_label] = obj.field_value
            });
            fieldValues = [fieldObj[selectedLabel]]
        }
    }


    return <Row className={`pt-lg ${cx(['new-template-input-row', 'new-template-folder-information'])}`}>
        <Col className="gutter-row field-value" span={10}>
            <SelectComponentVertical items={fieldLabels} label={formatMessage({id: 'page.emailTemplates.selectField'})}
                                     onChange={selectLabel}/>
        </Col>
        <Col className="gutter-row field-value" offset={2} span={10}>
            <SelectComponentVertical defaultValue={fieldValues[0]} items={fieldValues} label={formatMessage({id: 'page.emailTemplates.fieldValue'})}
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
        this.state = {defaultFolderName: '', selectedLabel: '', selectedValue: ''}
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
            fieldOption
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
                               selectLabel={this.selectLabel}
                               selectValue={this.selectValue}
                               template={newTemplate}
                               fieldOption={fieldOption}
                               formatMessage={formatMessage}/>
                    <TemplateContent registerGetContentHook={registerGetContentHook}
                                     setTemplateContent={setNewTemplateContent}
                                     content={newTemplate.content}
                                     selectedValue={this.state.selectedValue}
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
                               selectLabel={this.selectLabel}
                               selectValue={this.selectValue}
                               template={editTemplate}
                               fieldOption={fieldOption} formatMessage={formatMessage}/>
                    <TemplateContent registerGetContentHook={registerGetContentHook}
                                     setTemplateContent={setEditTemplateContent}
                                     content={editTemplate.content}
                                     selectedValue={this.state.selectedValue}
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

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(TemplateInformation));


