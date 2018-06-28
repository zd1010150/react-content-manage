import React, { Component } from 'react';
import { CommonManualFileUpload } from 'components/ui/index';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { setAttachment, removeAttachment } from '../flow/actions';

const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
};


class Upload extends Component {
  componentDidMount() {
    // fetch exist attachment if in edit
  }

  handleBeforeUpload = (file) => {
    console.log(file.uid);
    // update file list
    this.props.setAttachment(file);
  }

  handleRemove = (file) => {
    console.log(file.uid);
    this.props.removeAttachment(file);
  }

  render() {
    const { invoice, intl } = this.props;
    const { formatMessage } = intl;
    const i18n = 'page.invoice';

    const { fileList } = invoice;

    return (
      <CommonManualFileUpload
        // Direct props
        labelText={formatMessage({ id: `${i18n}.attachment` })}
        // Indirect/ManualFileUpload props
        uploadProps={{
          fileList,
        }}
        selectFileBtnText={formatMessage({ id: `${i18n}.chooseFile` })}
        wrapperCls="horizontal"
        onBeforeUpload={this.handleBeforeUpload}
        onRemove={this.handleRemove}
      />
    );
  }
}


Upload.defaultProps = defaultProps;
Upload.propTypes = propTypes;
const mapStateToProps = ({ global, invoice }) => ({
  language: global.language,
  invoice,
});
const mapDispatchToProps = {
  setAttachment,
  removeAttachment,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(Upload));
