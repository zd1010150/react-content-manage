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


const defaultProps = {
  wrapperCls: '',
  selectFileBtnText: 'Select File',
  uploadProps: null,
  onBeforeUpload: null,
  onRemove: null,
};
const propTypes = {
  wrapperCls: PropTypes.string,
  selectFileBtnText: PropTypes.string,
  uploadProps: PropTypes.object,
  onBeforeUpload: PropTypes.func,
  onRemove: PropTypes.func,
};


const InstantUpload = ({
  wrapperCls,
  selectFileBtnText,
  onBeforeUpload,
  onRemove,
  uploadProps,
}) => {
  const combinedUploadProps = {
    ...uploadProps,
    // with exist file
    // fileList: [{
    //   uid: 'test123',
    //   name: 'xx.png',
    //   status: 'done',
    //   response: '',
    // }],
    onRemove: (file) => {
      if (_.isFunction(onRemove)) {
        onRemove(file);
      }
    },
    beforeUpload: (file) => {
      if (_.isFunction(onBeforeUpload)) {
        onBeforeUpload(file);
      }
      return true;
    },
  };

  return (
    // <div className={`fileUploadWrapper ${wrapperCls}`}>
    <div className={`${wrapperCls}`}>
      <Upload {...combinedUploadProps}>
        <Button>
          <Icon type="upload" /> {selectFileBtnText}
        </Button>
      </Upload>
    </div>
  );
}


InstantUpload.defaultProps = defaultProps;
InstantUpload.propTypes = propTypes;
export default InstantUpload;
