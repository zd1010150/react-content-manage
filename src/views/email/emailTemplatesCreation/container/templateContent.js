import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {intlShape, injectIntl} from 'react-intl';
import {Row, Col, Input, Select, Button, Icon, Radio, Table, Modal, Checkbox} from 'antd';
import {connect} from 'react-redux';
// import {Panel, RichEditor} from 'components/ui/index';
import {Panel, CKEditor} from 'components/ui/index';
import classNames from 'classnames/bind';
import {SelectComponentVertical, InputComponent, TextAreaComponent} from '../component/formController';
import styles from '../emailTemplatesCreation.less';
import {tryLogout} from 'views/LoginForm/flow/actions';
import ImportTemplateButton from '../component/importTemplate';
import FileUpload from '../../newEmail/component/fileUpload';
const cx = classNames.bind(styles);
const RadioGroup = Radio.Group;
import {apiDomain} from '../../../../config/env.config.js';
import config from '../../ckConfig.js';
const Radios = ({handleRadioClick, formatMessage}) => (
    <RadioGroup defaultValue={1} onChange={e => {
        e.target.value === 1 ? handleRadioClick(true) : handleRadioClick(false)
    }}>
        <Radio className="email-theme-radio"
               value={1}>{formatMessage({id: 'page.emailTemplates.chooseCloudAttachment'})}</Radio>
        <Radio className="email-theme-radio"
               value={2}>{formatMessage({id: 'page.emailTemplates.attachLocalFiles'})}</Radio>
    </RadioGroup>
);

class TemplateContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {visible: false, chooseCloudAttachment: true}
    }

    componentDidMount() {

    }

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
    handleRadioClick = (flag) => {
        this.setState({
            chooseCloudAttachment: flag,
        });
    }

    handleCheck = (e) => {
        // e.target.checked
        console.log(e.target.checked)
    }

    onChange = (evt) => {
        this.props.registerGetContentHook(() => {
            return evt.editor.getData();
        });
    }
    onBlur = (evt) => {
        console.log("onBlur fired with event info: ", evt);
    }

    afterPaste = (evt) => {
        console.log("afterPaste fired with event info: ", evt);
    }

    fileUploadHandler = (evt) => {
        const fileLoader = evt.data.fileLoader;
        const xhr = fileLoader.xhr;
        evt.data.requestData = {
            document: evt.data.requestData.upload
        };
        xhr.setRequestHeader('Cache-Control', 'no-cache');
        xhr.setRequestHeader('X-CUSTOM', 'HEADER');
        xhr.setRequestHeader('accept', 'image/*');
        xhr.setRequestHeader('Authorization', this.props.loginUser.token_info.access_token)
        xhr.withCredentials = true;
        setTimeout(()=>{
            if (xhr.statusText === 'Unauthorized') {
                evt.stop();
                return this.props.tryLogout();
            }
        }, 2000)
    }

    fileUploadResponse = (evt) => {
        // Prevent the default response handler.
        evt.stop();
        // Get XHR and response.
        const data = evt.data,
            xhr = data.fileLoader.xhr,
            response = xhr.responseText.split('|');
        if (response[1]) {
            // An error occurred during upload.
            data.message = response[1];
            evt.cancel();
        } else {
            data.url = JSON.parse(response[0]).data.url
        }
    }


    render() {
        const {intl, setTemplateContent, registerGetContentHook, content, selectedValue, attachments, onFileUpload} = this.props;
        const {formatMessage} = intl;

        const columns = [
            {
                key: 'check',
                render: record => (
                    <span>
               <Checkbox className="email-theme-checkbox" onChange={this.handleCheck}/>
          </span>
                ),
            }, {
                title: formatMessage({id: 'page.emailTemplates.name'}),
                dataIndex: 'name',
                key: 'name',
            }, {
                title: formatMessage({id: 'page.emailTemplates.type'}),
                dataIndex: 'type',
                key: 'subscriberList.id',
            }, {
                title: formatMessage({id: 'page.emailTemplates.description'}),
                dataIndex: 'description',
            }, {

                key: 'id',
                render: record => (
                    <span>
                <Icon type="delete" className="danger pl-lg" onClick={() => this.delete(record.id)}/>
              </span>
                ),

            }
        ];

        const selectTemplate = <ImportTemplateButton setTemplateContent={setTemplateContent}/>;
        const attachment = <FileUpload attachments={attachments} label={formatMessage({ id: 'page.emailTemplates.localAttachment'})} tryLogout={tryLogout} onFileUpload={onFileUpload}/>
        // const attachment = <Button className="email-theme-btn ml-sm" size="small" onClick={this.showModal}><Icon
        //     type="link"/>{ formatMessage({id: 'page.emailTemplates.attachment'}) }</Button>
        // const preview = <Button className="email-theme-btn ml-sm" size="small" onClick={() => {
        // }}><Icon type="eye-o"/>
        //     {formatMessage({id: 'page.emailTemplates.preview'})}
        // </Button>
        const additionalCtrl = <div className="pl-lg pt-lg pb-sm"
                                    style={{background: '#f8f8f8'}}>{selectTemplate}{attachment}</div>
        const modalHeader = <Row>
            <Col className="gutter-row field-label pt-md" span={20}>
                {formatMessage({id: 'page.emailTemplates.attachFiles'})}
            </Col>
            <Col className="gutter-row field-label" span={4}>
                <Button className="email-theme-btn mr-sm" shape="circle" icon="save" onClick={this.handleSave}></Button>
                <Button shape="circle" icon="close" onClick={this.handleCancel}></Button>
            </Col>
        </Row>
        const CloudAttachment = <div className="mt-lg"><SelectComponentVertical
            label={formatMessage({id: 'page.emailTemplates.chooseFolder'})}/>
            <Table dataSource={[{name: 'abc', type: 'test', description: 'testing'}]} columns={columns} rowKey="id"
                   pagination={false}/></div>
        const LocalAttachment = <div><InputComponent style={{paddingLeft: 0}}
                                                     label={formatMessage({id: 'page.emailTemplates.fileName'})}/>
            <InputComponent style={{paddingLeft: 0}} type='file'
                            label={formatMessage({id: 'page.emailTemplates.fileName'})}/>
            <TextAreaComponent label={formatMessage({id: 'page.emailTemplates.description'})} style={{paddingLeft: 0}}/>
        </div>
        return (
            <Fragment>
                <Modal
                    title={modalHeader}
                    visible={this.state.visible}
                    footer={null}
                    closable={null}
                >
                    <Radios formatMessage={formatMessage} handleRadioClick={this.handleRadioClick}></Radios>
                    {this.state.chooseCloudAttachment ? CloudAttachment : LocalAttachment}
                </Modal>
                {/*<RichEditor content={content} registerGetContentHook={registerGetContentHook}*/}
                {/*setContent={setNewTemplateContent} additionalCtrl={additionalCtrl}/>*/}
                {additionalCtrl}
                <CKEditor
                    content={content}
                    events={{
                        blur: this.onBlur,
                        afterPaste: this.afterPaste,
                        change: this.onChange,
                        fileUploadRequest: this.fileUploadHandler,
                        fileUploadResponse: this.fileUploadResponse
                    }}
                    insertValue={selectedValue}
                    config={config}/>
            </Fragment>
        );
    }
}

const mapStateToProps = ({global, loginUser}) => ({
    loginUser: loginUser
});
const mapDispatchToProps = {
    tryLogout: tryLogout
};

TemplateContent.propTypes = {
    selectedValue: PropTypes.string,
    content: PropTypes.string,
    setTemplateContent: PropTypes.func.isRequired,
    registerGetContentHook: PropTypes.func.isRequired,
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(TemplateContent));

