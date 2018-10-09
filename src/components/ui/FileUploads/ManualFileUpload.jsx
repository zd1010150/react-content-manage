/**
 * ManualFileUpload is used to submit file until users click on 'upload' button instead of submitting file automatically on file change.
 * This is changed based on Ant design Upload component. -> https://ant.design/components/upload/
 */
import React from 'react';
import { Upload, Button, Icon } from 'antd';
import PropTypes from 'prop-types';


const defaultProps = {
  maxFileNumber: 1,
  showUploadBtn: false,
  wrapperCls: '',
  selectFileBtnText: 'Select File',
  uploadProps: null,
  uploadBtnProps: null,
  onBeforeUpload: null,
  onRemove: null,
  onUploadBtnClick: null,
  uploading: false,
};
const propTypes = {
  maxFileNumber: PropTypes.number,
  showUploadBtn: PropTypes.bool,
  wrapperCls: PropTypes.string,
  selectFileBtnText: PropTypes.string,
  uploadProps: PropTypes.object,
  uploadBtnProps: PropTypes.object,
  onBeforeUpload: PropTypes.func,
  onRemove: PropTypes.func,
  onUploadBtnClick: PropTypes.func,
  uploading: PropTypes.bool,
};


const ManualFileUpload = ({
  maxFileNumber,
  showUploadBtn,
  wrapperCls,
  selectFileBtnText,
  uploadBtnProps,
  onBeforeUpload,
  onRemove,
  onUploadBtnClick,
  uploadProps,
  uploading,
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
      return false;
    },
  };

  return (
    <div className={`fileUploadWrapper ${wrapperCls}`}>
      <Upload {...combinedUploadProps}>
        <Button disabled={uploadProps.fileList.length >= maxFileNumber}>
          <Icon type="upload" /> {selectFileBtnText}
        </Button>
      </Upload>
      {showUploadBtn ? (
        <Button
          {...uploadBtnProps}
          onClick={onUploadBtnClick}
          loading={uploading}
        >
          {uploading ? 'Uploading' : 'Start Upload' }
        </Button>
      ) : null}
    </div>
  );
}


ManualFileUpload.defaultProps = defaultProps;
ManualFileUpload.propTypes = propTypes;
export default ManualFileUpload;
