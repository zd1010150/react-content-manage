import React, {Fragment} from 'react';
import _ from 'lodash';
import {intlShape, injectIntl} from 'react-intl';
import {Row, Col, Input, Button, Icon, Radio, Table, notification, Modal, Select} from 'antd';
import {
    getUserFolderData,
    setSelectedUser,
    newEmailQueryByPaging,
    fetchSelectedTemplateData,
    newEmailSetTemplatesData,
    sendEmail,
    fetchUserEmail
} from '../../flow/action';
import {connect} from 'react-redux';
import {Panel} from 'components/ui/index';
import validateEmail, {validateEmailGroup} from 'utils/emailValidation';
import {setStore, getStore, removeStore} from 'utils/localStorage';
import EnumsManager from 'utils/EnumsManager';
import classNames from 'classnames/bind';
import NewEmailContent from './newEmailContent';
import {FloatingLabelInput, StyledSelect} from 'components/ui/index';
import {withRouter} from 'react-router';
import styles from '../newEmail.less';
const cx = classNames.bind(styles);
const RadioGroup = Radio.Group;
const Option = Select.Option;


const savedEmails = getStore(EnumsManager.LocalStorageEmails) ? JSON.parse(getStore(EnumsManager.LocalStorageEmails)) : [];
const children = [];
for (let i = 0; i < savedEmails.length; i++) {
    !!savedEmails[i] && children.push(<Option key={savedEmails[i]}>{savedEmails[i]}</Option>);
}
const InputComponent = ({isDisabled, isNormal, label, handleChange, value}) => {

    return <Row className={`pt-lg ${cx('new-email-input-row')}`}>
        <Col className="gutter-row field-label mt-sm" span={2}>
            {label}
        </Col>
        <Col className={`gutter-row field-value ${cx('new-email-input')}`} span={22}>
            {!isNormal && <Select
                mode="tags"
                size="default"
                onChange={handleChange}
                style={{width: '100%'}}
            >
                {children}
            </Select>}
            {!!isNormal && !!isDisabled && <Input defaultValue={value[0]} disabled={isDisabled}/>}
            {!!isNormal && !isDisabled && <Input value={value} onChange={handleChange}/>}

        </Col>
    </Row>
}
const BasicInfo = ({
                       formatMessage, handleSendTo, handleCc,
                       handleBcc,
                       handleSubject,
                       sendTo,
                       cc,
                       bcc,
                       subject,
                       isSpecificEntry
                   }) => {
    return <Fragment>
        <InputComponent isDisabled={isSpecificEntry} isNormal={isSpecificEntry} value={sendTo} handleChange={handleSendTo}
                        label={formatMessage({id: 'page.emailTemplates.to'})}/>
        <InputComponent value={cc} handleChange={handleCc} label={formatMessage({id: 'page.emailTemplates.cc'})}/>
        <InputComponent value={bcc} handleChange={handleBcc} label={formatMessage({id: 'page.emailTemplates.bcc'})}/>
        <InputComponent isNormal={true} value={subject} handleChange={handleSubject}
                        label={formatMessage({id: 'page.emailTemplates.subject'})}/>
    </Fragment>
}

const Radios = ({userFolders, sharedFolders, handleRadioClick, formatMessage}) => (
    <RadioGroup defaultValue={userFolders} onChange={handleRadioClick}>
        <Radio className="email-theme-radio"
               value={userFolders}>{formatMessage({id: 'page.emailTemplates.myFolders'})}</Radio>
        <Radio className="email-theme-radio"
               value={sharedFolders}>{formatMessage({id: 'page.emailTemplates.sharedBy'})}</Radio>
    </RadioGroup>
);

class NewEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sendTo: [],
            cc: [],
            bcc: [],
            subject: '',
            visible: false,
            authModalVisible: false,
            selectedFolderId: '',
            showFolders: [],
            attachments: [],
            authLink: '',
            isSpecificEntry: false
        }
    }

    componentDidMount() {
        const {getUserFolderData, loginUser, setSelectedUser, match} = this.props;
        //show default option: userFolders
        getUserFolderData(loginUser.id, (data) => {
            this.setState({showFolders: data.own.data})
        });
        setSelectedUser(loginUser);
        this.checkSpecificEntry();
        console.log('1111111', match.params)

    }

    hooksFn = {};

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleSave = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancelAuthModal = () => {
        this.setState({
            authModalVisible: false,
        });
    }

    handleRadioClick = (e) => {
        // clear content when radio button change
        const {newEmailSetTemplatesData} = this.props;
        this.setState({showFolders: e.target.value});
        this.setState({selectedFolderId: ''});
        newEmailSetTemplatesData([]);
    }

    handleSendTo = (value) => {
        this.setState({
            sendTo: value
        })
    }
    handleCc = (value) => {
        this.setState({
            cc: value
        })
    }
    handleBcc = (value) => {
        this.setState({
            bcc: value
        })
    }
    handleSubject = (e) => {
        this.setState({
            subject: e.target.value
        })
    }

    /**
     * To cannot be empty, cc and bcc can be empty
     * to, cc, bcc must be email format
     */
    checkFieldInput() {
        const { formatMessage } = this.props.intl;
        if (this.state.sendTo.length === 0) {
            notification.error({
                message: formatMessage({ id: 'page.emailTemplates.emailToEmptyError' })
            });
            return false
        } else if (!validateEmailGroup(this.state.sendTo)) {
            notification.error({
                message: formatMessage({ id: 'page.emailTemplates.emailToFormatError' })
            });
            return false
        } else if (this.state.subject === '') {
            notification.error({
                message: formatMessage({ id: 'page.emailTemplates.emailSubjectEmptyError' })
            });
            return false
        } else if (this.state.cc.length !== 0 && !validateEmailGroup(this.state.cc)) {
            notification.error({
                message: formatMessage({ id: 'page.emailTemplates.emailCcFormatError' })
            });
            return false
        } else if (this.state.bcc.length !== 0 && !validateEmailGroup(this.state.bcc)) {
            notification.error({
                message: formatMessage({ id: 'page.emailTemplates.emailBccFormatError' })
            });
            return false
        } else {
            return true
        }
    }

    registerGetContentHook = fn => {
        this.hooksFn.getHTMLContent = fn;
    };

    onFileUpload = (response, error) => {
        console.log('111', response, error)
        if (_.isEmpty(error)) {
            const files = response.map((r)=>{
                return r.data.id
            })
            this.setState({attachments: files})
        }
    }

    send = () => {
        const {sendEmail, loginUser, match} = this.props;
        const { formatMessage } = this.props.intl;
        if (!this.checkFieldInput()) {
            return
        }
        const {history} = this.props;
        const fn = this.hooksFn.getHTMLContent;
        let htmlContent = "<p></p>";
        if (fn) {
            htmlContent = fn();
        }
        const userEmail = loginUser.email;
        const from = {
            name: loginUser.name,
            address: loginUser.email
        };
        const to = this.state.sendTo ? this.state.sendTo.map((v) => {
            return {address: v}
        }) : undefined;
        const cc = this.state.cc ? this.state.cc.map((v) => {
            return {address: v}
        }) : undefined;
        const bcc = this.state.bcc ? this.state.bcc.map((v) => {
            return {address: v}
        }) : undefined;

        const dataObj = {
            from,
            to,
            cc,
            bcc,
            subject: this.state.subject,
            content_type: 'html',
            content: htmlContent,
            attachments: this.state.attachments,
            email_able_type: match.params.objectType,
            email_able_id: match.params.objectId
        };
        console.log('dataObj', dataObj)
        const noAuthMessage = formatMessage({ id: 'page.emailTemplates.noAuthMessage' });
        const emailSendMessage = formatMessage({ id: 'page.emailTemplates.emailSendMessage' });
        const pendingSavedEmails = _.uniqBy(this.state.sendTo.concat(this.state.cc).concat(this.state.bcc).concat(savedEmails));
        sendEmail({userEmail, dataObj, noAuthMessage, emailSendMessage}, (status, authLink) => {
            if(status !== 'error'){
                setStore(EnumsManager.LocalStorageEmails, pendingSavedEmails);
                history.push(`/${match.params.objectType}/${match.params.objectId}`);
            }else{
                this.setState({authLink}, ()=>{
                    this.setState({authModalVisible: true})
                })
                // window.open(
                //     authLink,
                //     '_blank' // <- This is what makes it open in a new window.
                // );
            }
        });

    }

    discard = () => {
        const {history, match} = this.props;
        history.push(`/${match.params.objectType}/${match.params.objectId}`);
    }

    handleFolderChange = (id) => {
        const {newEmailQueryByPaging, match} = this.props;
        const category = match.params.objectType;
        this.setState({selectedFolderId: id});
        newEmailQueryByPaging({folderId: id, category});
    }

    handleDoubleClick = (record) => {
        const {fetchSelectedTemplateData, match} = this.props;
        fetchSelectedTemplateData({
            templateId: record.id,
            objectType: match.params.objectType,
            objectId: match.params.objectId,
            cb: () => {
                this.setState({visible: false})
            },
            cbErr: () => notification.error({
                message: 'object category may not exist, please check the url'
            })
        });
    }
    checkSpecificEntry = () => {
        const {match, fetchUserEmail} = this.props;
        const objectType = match.params.objectType;
        const objectId = match.params.objectId;
        if(objectType && objectId){
            fetchUserEmail({objectType, objectId}, (data)=>{
                this.setState({
                    isSpecificEntry: !!match.params.objectType && !!match.params.objectId,
                    sendTo: [data.data.email]
                })
            })
        }
    }

    render() {
        const {templates, userFolders, sharedFolders, templatesDataTablePagination, selectedEmailTemplate} = this.props;
        const {formatMessage} = this.props.intl;
        const SendButton = <Button className="email-theme-btn" size="small" onClick={this.send}><Icon
            type="right-square"/>{ formatMessage({id: 'page.emailTemplates.send'}) }</Button>;
        const DiscardButton = <Button className="ml-md" size="small" onClick={this.discard}><Icon
            type="delete"/>{ formatMessage({id: 'page.emailTemplates.discard'}) }</Button>
        const actionsRight = <div>{SendButton}{DiscardButton}</div>;
        const modalHeader = <Row>
            <Col className="gutter-row field-label pt-md" span={22}>
                {formatMessage({id: 'page.emailTemplates.selectTemplate'})}
            </Col>
            <Col className="gutter-row field-label" span={2}>
                {/*<Button className="email-theme-btn mr-sm" shape="circle" icon="save" onClick={this.handleSave}></Button>*/}
                <Button shape="circle" icon="close" onClick={this.handleCancel}></Button>
            </Col>
        </Row>
        const columns = [
            {
                title: formatMessage({id: "page.emailTemplates.templateName"}),
                dataIndex: "name",
                key: "name",
                render: text => <a href="javascript:;">{text}</a>,
            },
            {
                title: formatMessage({id: "page.emailTemplates.description"}),
                dataIndex: "description",
                key: "description"
            },
        ];
        const pagination = {
            defaultCurrent: templatesDataTablePagination.currentPage,
            current: templatesDataTablePagination.currentPage,
            defaultPageSize: templatesDataTablePagination.perPage,
            pageSize: templatesDataTablePagination.perPage,
            total: templatesDataTablePagination.total,
            size: "small",
            onChange(page, pageSize) {
                newEmailQueryByPaging({pageSize, page});
            }
        };
        return (
            <Panel panelTitle={formatMessage({id: 'page.emailTemplates.newEmail'})}
                   contentClasses={`pl-lg pr-lg pt-lg pb-lg ${cx('new-email-panel-content')}`}
                   actionsRight={actionsRight}>
                <Modal
                    visible={this.state.authModalVisible}
                    footer={null}
                    closable={true}
                    onCancel={this.handleCancelAuthModal}
                >
                    <p style={{color: 'red'}}>{formatMessage({id: 'page.emailTemplates.needAuthMessage'})}</p>
                    <a href={this.state.authLink} target='_blank' style={{textDecoration: 'underline'}}>{this.state.authLink}</a>
                    {/*<iframe src={this.state.authLink} />*/}
                </Modal>
                <Modal
                    title={modalHeader}
                    visible={this.state.visible}
                    footer={null}
                    closable={null}
                >
                    <Radios userFolders={userFolders} sharedFolders={sharedFolders} formatMessage={formatMessage}
                            handleRadioClick={this.handleRadioClick}/>
                    <div className="mt-md">
                        <StyledSelect
                            style={{width: '100%'}}
                            displayField={'name'}
                            valueField={'id'}
                            options={this.state.showFolders}
                            onChange={this.handleFolderChange}
                            value={this.state.selectedFolderId}
                        />
                    </div>
                    <Table
                        onRow={(record) => {
                            return {
                                onDoubleClick: () => {
                                    this.handleDoubleClick(record)
                                }
                            };
                        }}
                        dataSource={templates}
                        columns={columns}
                        pagination={pagination}
                        className="mt-lg"
                        rowKey="id"/>
                    <div className={`ml-sm ${cx('hint-msg')}`}>
                        {formatMessage({id: 'page.emailTemplates.doubleClickHint'})}
                    </div>
                </Modal>
                <BasicInfo handleSendTo={this.handleSendTo}
                           handleCc={this.handleCc}
                           handleBcc={this.handleBcc}
                           handleSubject={this.handleSubject}
                           sendTo={this.state.sendTo}
                           cc={this.state.cc}
                           bcc={this.state.bcc}
                           subject={this.state.subject}
                           formatMessage={formatMessage}
                           isSpecificEntry={this.state.isSpecificEntry}/>
                <NewEmailContent onFileUpload={this.onFileUpload}
                                 content={selectedEmailTemplate.content}
                                 attachments={selectedEmailTemplate.attachments}
                                 showModal={this.showModal}
                                 registerGetContentHook={this.registerGetContentHook}/>
            </Panel>

        );
    }
}

const mapStateToProps = ({global, setup, loginUser}) => {
    const emailTemplates = setup.emailTemplates;
    return {
        loginUser: loginUser,
        userFolders: emailTemplates.userFolders,
        sharedFolders: emailTemplates.sharedFolders,
        templates: emailTemplates.newEmailTemplates,
        templatesDataTablePagination: emailTemplates.templatesDataTablePagination,
        selectedEmailTemplate: emailTemplates.selectedEmailTemplate
    }
};
const mapDispatchToProps = {
    setSelectedUser,
    getUserFolderData,
    newEmailQueryByPaging,
    fetchSelectedTemplateData,
    newEmailSetTemplatesData,
    sendEmail,
    fetchUserEmail
};


export default withRouter(injectIntl(connect(mapStateToProps, mapDispatchToProps)(NewEmail)));


