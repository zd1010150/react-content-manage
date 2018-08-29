import { notification } from 'antd';
import { InstantUpload } from 'components/ui/index';
import { baseUrl } from 'config/env.config';
import fetch from 'isomorphic-fetch';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { addAttachment, removeAttachment } from '../../flow/upload/actions';


const defaultProps = {
  addAttachment: null,
  removeAttachment: null,
};
const propTypes = {
  intl: intlShape.isRequired,
  addAttachment: PropTypes.func,
  removeAttachment: PropTypes.func,
};


class Upload extends Component {
  handleFileUpload = (data) => {
    const { addAttachment } = this.props;

    const formData = new FormData();
    const keys = Object.keys(data);
    keys.forEach(key => formData.append(key, data[key]));

    fetch(`${baseUrl}/admin/files/asset`, {
      credentials: 'include',
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then((json) => {
        const { id, name, url } = json.data;
        addAttachment({
          uid: id,
          name,
          status: 'done',
          url,
        });
      })
      .catch(() => notification.error({
        message: 'Fail to add attachment.',
      }));
  }

  handleRemove = file => this.props.removeAttachment(file.uid)

  render() {
    const { intl, attachments, match } = this.props;
    const { objectId, objectType } = match.params;
    const { formatMessage } = intl;
    const i18n = 'page.invoice';

    return (
      <Fragment>
        <div
          className="mb-sm ant-form-item-label"
          style={{ lineHeight: 1.5 }}
        >
          {formatMessage({ id: `${i18n}.attachment` })}
        </div>
        <InstantUpload
          action="admin/files/asset"
          fileList={attachments}
          selectFileText={formatMessage({ id: `${i18n}.chooseFile` })}
          wrapperCls="horizontal"
          onUploadStateChange={this.handleUploadStateChange}
          onBeforeUpload={this.handleBeforeUpload}
          onRemove={this.handleRemove}
          extraUploadProps={{
            data: file => ({
              document: file,
              // ownerId: objectId,
              // ownerType: objectType,
            }),
            customRequest: ({ data }) => this.handleFileUpload(data),
          }}
        />
      </Fragment>
    );
  }
}


Upload.defaultProps = defaultProps;
Upload.propTypes = propTypes;
const mapStateToProps = ({ global, invoice }) => ({
  language: global.language,
  attachments: invoice.attachments,
});
const mapDispatchToProps = {
  addAttachment,
  removeAttachment,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(injectIntl(Upload)));
