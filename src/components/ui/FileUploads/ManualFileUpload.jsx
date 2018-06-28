/**
 * ManualFileUpload is used to submit file until users click on 'upload' button instead of submitting file automatically on file change.
 * This is changed based on Ant design Upload component. -> https://ant.design/components/upload/
 */
import React, { Component } from 'react';
import { Upload, Button, Icon, message } from 'antd';
import PropTypes from 'prop-types';


const defaultProps = {
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


class ManualFileUpload extends Component {
  state = {
    fileList: [],
    uploading: false,
  }

  // handleUpload = () => {
  //   const { fileList } = this.state;
  //   const formData = new FormData();
  //   fileList.forEach((file) => {
  //     formData.append('files[]', file);
  //   });

  //   this.setState({
  //     uploading: true,
  //   });

  //   // You can use any AJAX library you like
  //   reqwest({
  //     url: '//jsonplaceholder.typicode.com/posts/',
  //     method: 'post',
  //     processData: false,
  //     data: formData,
  //     success: () => {
  //       this.setState({
  //         fileList: [],
  //         uploading: false,
  //       });
  //       message.success('upload successfully.');
  //     },
  //     error: () => {
  //       this.setState({
  //         uploading: false,
  //       });
  //       message.error('upload failed.');
  //     },
  //   });
  // }

  render() {
    const {
      showUploadBtn,
      wrapperCls,
      selectFileBtnText,
      uploadBtnProps,
      onBeforeUpload,
      onRemove,
      onUploadBtnClick,
      uploadProps,
      uploading,
    } = this.props;

    const allUploadProps = {
      ...uploadProps,
      onRemove: (file) => {
        if (_.isFunction(onRemove)) {
          onRemove(file);
        }
        // this.setState(({ fileList }) => {
        //   const index = fileList.indexOf(file);
        //   const newFileList = fileList.slice();
        //   newFileList.splice(index, 1);
        //   return {
        //     fileList: newFileList,
        //   };
        // });
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
        <Upload {...allUploadProps}>
          <Button>
            <Icon type="upload" /> {selectFileBtnText}
          </Button>
        </Upload>
        {showUploadBtn ? (
          <Button
            onClick={onUploadBtnClick}
            loading={uploading}
            {...uploadBtnProps}
          >
            {uploading ? 'Uploading' : 'Start Upload' }
          </Button>
        ) : null}
      </div>
    );
  }
}


ManualFileUpload.defaultProps = defaultProps;
ManualFileUpload.propTypes = propTypes;
export default ManualFileUpload;
