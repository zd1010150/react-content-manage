import { Button, Icon, notification, Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
import * as biUtils from '../../utils/biForm';
import * as ciUtils from '../../utils/ciForm';
import * as iiUtils from '../../utils/invoiceInfo';
import * as siUtils from '../../utils/secondaryInfo';
import { trySaveNewInvoice, tryUpdateInvoice } from '../../flow/actions';

const { PhantomId } = Enums;


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
  shouldComponentUpdate() { return false; }

  handleSave = () => {
    if (this.isAnyFieldInvalid()) return;
    const payload = this.toApi();
    console.table(payload);
    const { invoiceId } = this.props.match.params;
    if (invoiceId === PhantomId) {
      this.props.trySaveNewInvoice(payload, this.handleCancel);
    } else {
      this.props.tryUpdateInvoice(invoiceId, payload, this.handleCancel);
    }
  }
  handleCancel = () => this.props.history.goBack()
  showNotification = errorId => notification.error({
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
    if (!ciUtils.isCIFormValid(ciForm)) {
      this.showNotification('ciForm');
      return true;
    }
    if (!biUtils.isBIFormValid(biForm)) {
      this.showNotification('biForm');
      return true;
    }
    if (!iiUtils.isInvoiceInfoValid(invoiceInfo)) {
      this.showNotification('invoiceInfo');
      return true;
    }
    if (!siUtils.isSecondaryInfoValid(secondaryInfo)) {
      this.showNotification('secondaryInfo');
      return true;
    }
    return false;
  }
  toApi = () => {
    const {
      attachments,
      biForm,
      ciForm,
      invoiceInfo,
      itemsList,
      secondaryInfo,
      summary,
    } = this.props.invoice;
    const ciData = ciUtils.toApi(ciForm);
    const biData = biUtils.toApi(biForm);
    const iiData = iiUtils.toApi(invoiceInfo);
    const items = itemsList.map(item => item.toApi());
    // TODO: rethink about better way to convert summary.
    const sumData = summary.filter(item => item.description !== 'grandTotal').map(item => item.toApi());
    const attachedData = attachments.map(item => item.toApi());
    const otherData = siUtils.toApi(secondaryInfo);
    return {
      ...ciData,
      ...biData,
      ...iiData,
      items: {
        items,
      },
      extra_prices: sumData,
      attachments: attachedData,
      ...otherData,
    };
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
  trySaveNewInvoice,
  tryUpdateInvoice,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(injectIntl(Actions)));
