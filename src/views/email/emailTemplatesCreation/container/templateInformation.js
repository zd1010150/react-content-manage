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
import {Panel} from 'components/ui/index';
import classNames from 'classnames/bind';
import {withRouter} from 'react-router';
import TemplateContent from './templateContent';
import styles from '../emailTemplatesCreation.less';
const cx = classNames.bind(styles);
const Option = Select.Option;

const InputComponent = ({value, label, updateTemplate}) => {
    return <Row className={`pt-lg ${cx('new-template-input-row')}`}>
        <Col className="gutter-row field-label" span={4}>
            {label}
        </Col>
        <Col className="gutter-row field-value" span={20}>
            {
                !!value && <Input value={value} onChange={(e) => {
                    updateTemplate(e.target.value)
                }}/>
            }
            {
                !value && <Input onChange={(e) => {
                    updateTemplate(e.target.value)
                }}/>
            }

        </Col>
    </Row>
}

const SelectComponent = ({defaultFolderName, userFolders, selectedFolder, label, editTemplate, updateTemplate}) => {
    return <Row className={`pt-lg ${cx('new-template-input-row')}`}>
        <Col className="gutter-row field-label" span={4}>
            {label}
        </Col>
        <Col className="gutter-row field-value" span={20}>
            <Select onChange={(value) => {
                updateTemplate(value)
            }} defaultValue={defaultFolderName} className="full-width">
                {userFolders && userFolders.map((folder) =>
                    <Option key={folder.id} value={folder.id}>{folder.name}</Option>
                )}
            </Select>
        </Col>
    </Row>
}

const SelectComponentVertical = ({label, onChange}) => {
    return <Fragment>
        <div>
            {label}
        </div>
        <Select onChange={onChange} defaultValue="Zhejiang" className="full-width">
            <Option value="Zhejiang">Zhejiang</Option>
            <Option value="Jiangsu">Jiangsu</Option>
        </Select>
    </Fragment>
}

const BasicInfo = ({
                       defaultFolderName,
                       setTemplateFolder,
                       setTemplateName,
                       setTemplateApiName,
                       setTemplateDescription,
                       editTemplate,
                       userFolders, selectedFolder, formatMessage
                   }) => {
    return <Fragment>
        <SelectComponent defaultFolderName={defaultFolderName} editTemplate={editTemplate} updateTemplate={setTemplateFolder} userFolders={userFolders}
                         selectedFolder={selectedFolder} label={formatMessage({id: 'page.emailTemplates.folder'})}/>
        <InputComponent value={editTemplate.name} updateTemplate={setTemplateName}
                        label={formatMessage({id: 'page.emailTemplates.emailTemplatesName'})}/>
        <InputComponent value={editTemplate.api_name} updateTemplate={setTemplateApiName}
                        label={formatMessage({id: 'page.emailTemplates.emailTemplateApiName'})}/>
        <InputComponent value={editTemplate.description} updateTemplate={setTemplateDescription}
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
        <Button onClick={() => {
            cancel(false)
        }}><Icon type="close"/>{ formatMessage({id: 'page.emailTemplates.cancel'}) }</Button>
    </div>
}

class TemplateInformation extends React.Component {
    componentDidMount() {
        const {getUserFolderData, loginUser} = this.props;
        getUserFolderData(loginUser.id);
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
            setEditTemplateFolder,
            setEditTemplateName,
            setEditTemplateApiName,
            setEditTemplateDescription,
            setEditTemplateContent,
            isNewTemplateRouter,
            save
        } = this.props;
        let defaultFolderName = '';
        if (isNewTemplateRouter()) {
            if (selectedFolder.id) {
                defaultFolderName = selectedFolder.name;
                setNewTemplateFolder(selectedFolder.id)
            } else if (editTemplate.folder) {
                defaultFolderName = editTemplate.folder.name;
            }
        } else {
            if (selectedFolder.id) {
                defaultFolderName = selectedFolder.name;
            }
        }


        return (
            <Panel panelTitle={formatMessage({id: 'page.emailTemplates.newEmailTemplate'})}
                   panelClasses="email-theme-panel"
                   contentClasses={`pl-lg pr-lg pt-lg pb-lg ${cx('new-template-panel-content')}`}>
                {isNewTemplateRouter() &&
                <Fragment>
                    <BasicInfo defaultFolderName={defaultFolderName}
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
                                     setTemplateContent={setNewTemplateContent}/>
                </Fragment>
                }

                {!isNewTemplateRouter() &&
                <Fragment>
                    <BasicInfo defaultFolderName={defaultFolderName}
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


                <ActionButtonGroup save={save} formatMessage={formatMessage}/>
            </Panel>

        );
    }
}


const mapStateToProps = ({global, setup, loginUser}) => {
    const {emailTemplates} = setup;
    return {
        loginUser: loginUser,
        userFolders: emailTemplates.userFolders,
        selectedFolder: emailTemplates.selectedFolder,
        editTemplate: emailTemplates.editTemplate,
    };
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


export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(TemplateInformation)));


