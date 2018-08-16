/**
 * InstantUpload is a component that instant upload selected file to backend.
 * This is changed based on Ant design Upload component.
 * @Based on: https://ant.design/components/upload/
 * @Features:
 * * Instant upload/sync file to backend (fileId is needed in backend response at least).
 * * Display list of uploaded file
 * * Click file name to show preview on another tab
 * * File extension limitation
 * * Uploading progress bar and other effects
 * * Customizable upload, remove actions
 * * Uploaded file can be removable
 * * Other built-in features with Ant Design Upload Component
 */
import React from 'react';
import { Upload, Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import { baseUrl } from 'config/env.config';
import { getAuthorization } from 'utils/common';


const defaultProps = {
  wrapperCls: '',
  selectFileText: 'Select File',
  extraUploadProps: null,
  onUploadStateChange: null,
  onBeforeUpload: null,
  onRemove: null,
};
const propTypes = {
  action: PropTypes.string.isRequired,
  wrapperCls: PropTypes.string,
  selectFileText: PropTypes.string,
  extraUploadProps: PropTypes.object,
  fileList: PropTypes.array.isRequired,
  onBeforeUpload: PropTypes.func,
  onRemove: PropTypes.func,
  onUploadStateChange: PropTypes.func,
};


const InstantUpload = ({
  action,
  wrapperCls,
  selectFileText,
  fileList,
  onUploadStateChange,
  onBeforeUpload,
  onRemove,
  extraUploadProps,
}) => {
  const combinedUploadProps = {
    action: `${baseUrl}/${action}`,
    fileList,
    onChange: onUploadStateChange,
    onRemove,
    beforeUpload: (file) => {
      if (_.isFunction(onBeforeUpload)) {
        onBeforeUpload(file);
      }
      return true;
    },
    headers: {
      Authorization: getAuthorization(),
    },
    withCredentials: true,
    ...extraUploadProps,
  };

  return (
    <div className={`fileUploadWrapper ${wrapperCls}`}>
      <Upload {...combinedUploadProps}>
        <Button>
          <Icon type="upload" /> {selectFileText}
        </Button>
      </Upload>
    </div>
  );
};


InstantUpload.defaultProps = defaultProps;
InstantUpload.propTypes = propTypes;
export default InstantUpload;
