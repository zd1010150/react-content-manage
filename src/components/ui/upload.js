/* eslint-disable max-len,no-nested-ternary,react/forbid-prop-types,react/require-default-props,react/no-unused-state */
import React from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {tryLogout} from 'views/LoginForm/flow/actions';
import {Upload, notification} from 'antd';
import PropTypes from 'prop-types';
import {baseUrl} from 'config/env.config';
import {intlShape, injectIntl} from 'react-intl';
import {UNAUTHENTICATION, MAX_UPLOAD_FILE_SIZE} from 'config/app.config';

class PicturesWall extends React.Component {
    state = {
        isMaxSizeError: false,
        isTypeError: false,
        fileList: [],
    };
    beforeUpload = (file, fileList) => {
        const {maxSize, onError, uploadConfig} = this.props;
        if (fileList[0]) {
            if (fileList[0].size > maxSize) {
                this.setState({isMaxSizeError: true, fileList: []});
                onError('maxSize');

                return false;
            }
            this.setState({isMaxSizeError: false});
            console.log('123131', fileList[0].type)
            if (!_.isEmpty(uploadConfig.accept) && uploadConfig.accept.indexOf(fileList[0].type) < 0) {
                this.setState({isTypeError: true, fileList: []});
                onError('type');
                return false;
            }
            this.setState({isTypeError: false, fileList});
            return true;
        }
    }
    onChange = ({file, fileList, event}) => {
        const {
            uploadConfig, onAllDone, tryLogout,
        } = this.props;
        let isAllDone = true,
            allResponse = [],
            allError = [];
        if (_.isFunction(uploadConfig.onChange)) {
            uploadConfig.onChange({file, fileList, event});
        }

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
            onAllDone(result.allResponse, result.allError);
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
        const {
            uploadConfig, children, maxSize, isShowMaxSizeTip, isShowError, style
        } = this.props;
        const newConfig = Object.assign({}, uploadConfig, {action: `${baseUrl}${uploadConfig.action}`}); // handle the action
        const config = Object.assign({}, newConfig, {onChange: this.onChange}); // handle onchange event
        const {formatMessage} = this.props.intl;
        const size = _.round(maxSize / 1024 / 1024, 2);
        return (
            <div style={style}>
                <Upload {...config} beforeUpload={this.beforeUpload} fileList={this.state.fileList}>
                    { children }
                </Upload>
                {
                    isShowError && this.state.isTypeError ?
                        <p className="error-msg"> {formatMessage({id: 'global.ui.upload.errorType'}, {type: uploadConfig.accept})} </p> : ''
                }
                {
                    isShowError && this.state.isMaxSizeError ?
                        <p className="error-msg"> {formatMessage({id: 'global.ui.upload.errorMax'}, {size})} </p> : ''
                }

                { isShowMaxSizeTip ?
                    <p className="error-msg"> {formatMessage({id: 'global.ui.upload.maxSize'}, {size})} </p> : '' }

            </div>
        );
    }
}
PicturesWall.defaultProps = {
    uploadConfig: {},
    children: <span>upload</span>,
    onAllDone: () => {
    },
    maxSize: MAX_UPLOAD_FILE_SIZE.DEFAULT,
    isShowMaxSizeTip: true,
    isShowError: true,
    onError: () => {
    },
    style: {}
};
PicturesWall.propTypes = {
    intl: intlShape.isRequired,
    uploadConfig: PropTypes.object,
    children: PropTypes.element,
    onAllDone: PropTypes.func,
    maxSize: PropTypes.number,
    isShowMaxSizeTip: PropTypes.bool,
    isShowError: PropTypes.bool,
    onError: PropTypes.func,
    style: PropTypes.object,
};

const mapDispathcToProps = {
    tryLogout,
};
export default connect(null, mapDispathcToProps)(injectIntl(PicturesWall));
