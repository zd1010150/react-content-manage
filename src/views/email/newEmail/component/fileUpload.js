import React, {Component} from 'react';
import classNames from 'classnames/bind';
import {Select, Input, Row, Col, Button, Icon, Upload, notification} from 'antd';
import _ from 'lodash';
import {baseUrl} from 'config/env.config';
import {UNAUTHENTICATION, MAX_UPLOAD_FILE_SIZE} from 'config/app.config';
// import { Panel, Upload } from 'components/ui/index';


export default class FileUpload extends Component {
    state = {
        isMaxSizeError: false,
        isTypeError: false,
        fileList: [],
    };

    handleChange = (info) => {
        const {
            onFileUpload, tryLogout,
        } = this.props;
        let isAllDone = true,
            allResponse = [],
            allError = [];
        let fileList = info.fileList;

        // 1. read from response and show file link
        fileList = fileList.map((file) => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        // 2. filter successfully uploaded files according to response from server
        fileList = fileList.filter((file) => {
            if (file.response) {
                return file.status === 'done';
            }
            return true;
        });

        const result = fileList.reduce(({
                                            isAllDone, allResponse, allError,
                                        }, f) => ({
            isAllDone: (f.status === 'done' || f.status === 'error') && isAllDone,
            allResponse: _.isEmpty(f.response) ? allResponse : allResponse.concat([f.response]),
            allError: _.isEmpty(f.error) ? allError : allError.concat([f.error]),
        }), {
            isAllDone, allResponse, allError,
        });

        if (result.isAllDone) {
            onFileUpload(result.allResponse, result.allError);
            result.allError.forEach((error, index) => {
                if (error.status === UNAUTHENTICATION.CODE) {
                    tryLogout();
                } else {
                    notification.error(result.allResponse[index].error);
                }
            });
        }
    }
    render() {
        const {label} = this.props;

        const uploadProps = {
            name: 'document',
            action: `${baseUrl}/admin/files/doc`,
            accept: '[application/pdf, application/doc, image/png, image/jpg, image/jpeg]',
            onChange: this.handleChange,
            multiple: true,
            withCredentials: true,
        };
        return (
            <Upload {...uploadProps}>
                <Button className="email-theme-btn ml-sm" size="small">
                    <Icon type="upload" /> {label}
                </Button>
            </Upload>

        );
    }
}