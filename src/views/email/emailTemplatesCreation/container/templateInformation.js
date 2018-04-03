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
    setNewTemplateContent
} from '../flow/action';
import {connect} from 'react-redux';
import {Panel} from 'components/ui/index';
import classNames from 'classnames/bind';
import TemplateContent from './templateContent';
import styles from '../emailTemplatesCreation.less';
const cx = classNames.bind(styles);
const Option = Select.Option;

const InputComponent = ({label, updateNewTemplate}) => {
    return <Row className={`pt-lg ${cx('new-template-input-row')}`}>
        <Col className="gutter-row field-label" span={4}>
            {label}
        </Col>
        <Col className="gutter-row field-value" span={20}>
            <Input onChange={(e) => {
                updateNewTemplate(e.target.value)
            }}/>
        </Col>
    </Row>
}

const SelectComponent = ({userFolders, selectedFolder, label, updateNewTemplate}) => {
    let defaultFolderName;
    if (selectedFolder.id) {
        defaultFolderName = selectedFolder.name;
        console.log('selectedFolder.id', selectedFolder.id)
        updateNewTemplate(selectedFolder.id)
    } else {
        defaultFolderName = '';
    }
    return <Row className={`pt-lg ${cx('new-template-input-row')}`}>
        <Col className="gutter-row field-label" span={4}>
            {label}
        </Col>
        <Col className="gutter-row field-value" span={20}>
            <Select onChange={(value) => {updateNewTemplate(value)}} defaultValue={defaultFolderName} className="full-width">
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
                       setNewTemplateFolder,
                       setNewTemplateName,
                       setNewTemplateApiName,
                       setNewTemplateDescription,
                       userFolders, selectedFolder, formatMessage
                   }) => {
    return <Fragment>
        <SelectComponent updateNewTemplate={setNewTemplateFolder} userFolders={userFolders}
                         selectedFolder={selectedFolder} label={formatMessage({id: 'page.emailTemplates.folder'})}/>
        <InputComponent updateNewTemplate={setNewTemplateName}
                        label={formatMessage({id: 'page.emailTemplates.emailTemplatesName'})}/>
        <InputComponent updateNewTemplate={setNewTemplateApiName}
                        label={formatMessage({id: 'page.emailTemplates.emailTemplateApiName'})}/>
        <InputComponent updateNewTemplate={setNewTemplateDescription}
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
        <Button className="email-theme-btn mr-md" onClick={save}><Icon type="save"/>{ formatMessage({id: 'page.emailTemplates.save'}) }</Button>
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
            save
        } = this.props;
        return (
            <Panel panelTitle={formatMessage({id: 'page.emailTemplates.newEmailTemplate'})}
                   panelClasses="email-theme-panel"
                   contentClasses={`pl-lg pr-lg pt-lg pb-lg ${cx('new-template-panel-content')}`}>
                <BasicInfo setNewTemplateFolder={setNewTemplateFolder}
                           setNewTemplateName={setNewTemplateName}
                           setNewTemplateApiName={setNewTemplateApiName}
                           setNewTemplateDescription={setNewTemplateDescription}
                           userFolders={userFolders}
                           selectedFolder={selectedFolder}
                           formatMessage={formatMessage}/>
                <FieldInfo formatMessage={formatMessage}/>
                <TemplateContent registerGetContentHook={registerGetContentHook} setNewTemplateContent={setNewTemplateContent}/>
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
        selectedFolder: emailTemplates.selectedFolder
    };
};

const mapDispatchToProps = {
    getUserFolderData,
    setNewTemplateFolder,
    setNewTemplateName,
    setNewTemplateApiName,
    setNewTemplateDescription,
    setNewTemplateContent
};


export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(TemplateInformation));


