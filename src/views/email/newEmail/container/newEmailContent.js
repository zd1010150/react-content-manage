import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {intlShape, injectIntl} from 'react-intl';
import {Row, Col, Input, Select, Button, Icon, Radio, Table} from 'antd';
import {connect} from 'react-redux';
import {Panel, CKEditor} from 'components/ui/index';
import {tryLogout} from 'views/LoginForm/flow/actions';
import FileUpload from '../component/fileUpload';
import config from '../../ckConfig.js';
import classNames from 'classnames/bind';
import styles from '../newEmail.less';
const cx = classNames.bind(styles);

class NewEmailContent extends React.Component {
    constructor(props){
        super(props);

    }
    componentDidMount() {

    }
    onBlur = (evt) => {
        console.log("onBlur fired with event info: ", evt);
    }

    afterPaste = (evt) => {
        console.log("afterPaste fired with event info: ", evt);
    }
    onChange = (evt) => {
        this.props.registerGetContentHook(() => {
            return evt.editor.getData();
        });
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
        if(this.props.loginUser){
            if(!this.props.loginUser.token_info.access_token){
                evt.stop();
                return this.props.tryLogout();
            }
        }else{
            evt.stop();
            return this.props.tryLogout();
        }
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
        const {showModal, content, onFileUpload, tryLogout} = this.props;
        const { formatMessage } = this.props.intl;
        const selectTemplate = <Button className="email-theme-btn" size="small" onClick={showModal}><Icon type="download" />{ formatMessage({ id: 'page.emailTemplates.selectTemplate' }) }</Button>;
        // const cloudAttachment = <Button className="email-theme-btn ml-sm" size="small" onClick={() => {}}><Icon type="file" />{ formatMessage({ id: 'page.emailTemplates.cloudAttachment' }) }</Button>
        // const localAttachment = <Button className="email-theme-btn ml-sm" size="small" onClick={() => {}}><Icon type="link" />{ formatMessage({ id: 'page.emailTemplates.localAttachment' }) }</Button>
        const localAttachment = <FileUpload label={formatMessage({ id: 'page.emailTemplates.localAttachment'})} tryLogout={tryLogout} onFileUpload={onFileUpload}/>
        const additionalCtrl = <div className="pl-lg pt-md pb-sm" style={{background: '#f8f8f8'}}>{selectTemplate}{localAttachment}</div>
        return (
            <Fragment>
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
                    config={config}/>
            </Fragment>
        );
    }
}

const mapStateToProps = ({ global, loginUser }) => ({
    loginUser: loginUser
});
const mapDispatchToProps = {
    tryLogout: tryLogout
};

NewEmailContent.prototype = {
    onFileUpload: PropTypes.func.isRequired,
    content: PropTypes.string,
    showModal: PropTypes.func.isRequired,
    registerGetContentHook: PropTypes.func.isRequired,
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(NewEmailContent));

