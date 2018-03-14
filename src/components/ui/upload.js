/* eslint-disable max-len,no-nested-ternary,react/forbid-prop-types,react/require-default-props,react/no-unused-state */
import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { tryLogout } from 'views/LoginForm/flow/actions';
import { Upload, notification } from 'antd';
import PropTypes from 'prop-types';
import { baseUrl } from 'config/env.config';
import { UNAUTHENTICATION } from 'config/app.config';

class PicturesWall extends React.Component {
    onChange = ({ file, fileList, event }) => {
      const {
        uploadConfig, onAllDone, tryLogout,
      } = this.props;
      let isAllDone = true,
        allResponse = [],
        allError = [];
      if (_.isFunction(uploadConfig.onChange)) {
        uploadConfig.onChange({ file, fileList, event });
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

      // if (hasError) {
      //   onFail();
      // }
      // if (files && files.length > 0) {
      //   onSuccess(this.getResponse(fileList));
      // } else {
      //   onFail(this.getResponse(fileList));
      // }
      // if (info.file.status === 'done') {
      //   notification.success(`${info.file.name} file uploaded successfully`);
      // } else if (info.file.status === 'error') {
      //   notification.error(`${info.file.name} file upload failed.`);
      // }
    }

    render() {
      const { uploadConfig, children } = this.props;
      const newConfig = Object.assign({}, uploadConfig, { action: `${baseUrl}${uploadConfig.action}` }); // handle the action
      const config = Object.assign({}, newConfig, { onChange: this.onChange }); // handle onchange event

      return (
        <div>
          <Upload {...config}>
            { children }
          </Upload>
        </div>
      );
    }
}
PicturesWall.defaultProps = {
  uploadConfig: {},
  children: <span>upload</span>,
  onAllDone: () => {},
};
PicturesWall.propTypes = {
  uploadConfig: PropTypes.object,
  children: PropTypes.element,
  onAllDone: PropTypes.func,
};

const mapDispathcToProps = {
  tryLogout,
};
export default connect(null, mapDispathcToProps)(PicturesWall);
