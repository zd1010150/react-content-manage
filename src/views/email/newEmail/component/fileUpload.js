import React, {Component} from 'react';
import classNames from 'classnames/bind';
import {Select, Input, Row, Col, Button, Icon} from 'antd';
import { Panel, Upload } from 'components/ui/index';


export default class FileUpload extends Component {

    render() {
        const {onFileUpload, label} = this.props;
        const uploadProps = {
            name: 'document',
            action: '/admin/files/doc',
            accept: '[application/pdf, application/doc, image/png, image/jpg, image/jpeg]',
            withCredentials: true,
        };
        return (
            <Upload isShowMaxSizeTip={false} uploadConfig={uploadProps} onAllDone={onFileUpload} key={Math.random()}>
                <Button className="email-theme-btn mt-sm" size="small">
                    <Icon type="upload" /> {label}
                </Button>
            </Upload>

        );
    }
}