import { Button, Icon, Row, notification } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isCIFormValid } from '../../utils/ciForm';
import { isBIFormValid } from '../../utils/biForm';
import { isInvoiceInfoValid } from '../../utils/invoiceInfo';
import { isSecondaryInfoValid } from '../../utils/secondaryInfo';


const propTypes = {
  intl: intlShape.isRequired,
  invoice: PropTypes.shape({
    attachments: PropTypes.array.isRequired,
    biForm: PropTypes.object.isRequired,
    ciForm: PropTypes.object.isRequired,
    invoiceInfo: PropTypes.object.isRequired,
    itemsList: PropTypes.array.isRequired,
    secondaryInfo: PropTypes.object.isRequired,
    summary: PropTypes.array.isRequired,
  }).isRequired,
};

class Actions extends Component {
  shouldComponentUpdate() {
    return false;
  }

  handleSave = () => {
    if (this.isAnyFieldInvalid()) return;
  }
  handleCancel = () => this.props.history.goBack()
  getNotification = errorId => notification.error({
    message: this.props.intl.formatMessage({ id: `global.errors.${errorId}` }),
    duration: 3,
  })
  isAnyFieldInvalid = () => {
    const {
      biForm,
      ciForm,
      invoiceInfo,
      secondaryInfo,
    } = this.props.invoice;
    if (isCIFormValid(ciForm)) {
      this.getNotification('ciForm');
      return true;
    }
    if (isBIFormValid(biForm)) {
      this.getNotification('biForm');
      return true;
    }
    if (isInvoiceInfoValid(invoiceInfo)) {
      this.getNotification('invoiceInfo');
      return true;
    }
    if (isSecondaryInfoValid(secondaryInfo)) {
      this.getNotification('secondaryInfo');
      return true;
    }
    return false;
  }

  render() {
    console.log('render actions');
    const { formatMessage } = this.props.intl;
    const i18n = 'global.ui.button';

    return (
      <Row className="mb-lg pl-lg">
        <Button
          className="lead-theme-btn mr-sm"
          onClick={this.handleSave}
        >
          <Icon type="save" className="font-sm icon-thinner" />
          {formatMessage({ id: `${i18n}.save` })}
        </Button>
        <Button onClick={this.handleCancel}>
          <Icon type="close" className="font-sm icon-thinner" />
          {formatMessage({ id: `${i18n}.cancel` })}
        </Button>
      </Row>
    );
  }
}


Actions.propTypes = propTypes;
const mapStateToProps = ({ global, invoice }) => ({
  language: global.language,
  invoice,
});
const mapDispatchToProps = {

};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(injectIntl(Actions)));
