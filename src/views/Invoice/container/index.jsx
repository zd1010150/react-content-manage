import { Panel, Section } from 'components/ui/index';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { BillingInfo, CompanyInfo, InvoiceInfo, ItemDetails, ItemsList } from '../components/index';
import { connect } from 'react-redux';
import { tryFetchInvoiceDetails } from '../flow/actions';
import { withRouter } from 'react-router-dom';
import Enums from 'utils/EnumsManager';

const { PhantomId } = Enums;


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
};

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.sections = [
      {
        key: 'il',
        titleId: 'il',
        child: ItemsList,
      },
      {
        key: 'ci',
        titleId: 'ci',
        child: CompanyInfo,
      },
      // {
      //   key: 'bi',
      //   titleId: 'bi',
      //   child: BillingInfo,
      // },
      // {
      //   key: 'ii',
      //   titleId: 'ii',
      //   child: InvoiceInfo,
      // },
      {
        key: 'id',
        titleId: 'id',
        child: ItemDetails,
      },
    ];
  }

  componentDidMount() {
    const { tryFetchInvoiceDetails, match } = this.props;
    const { objectId, objectType, invoiceId } = match.params;

    if (invoiceId !== PhantomId) {
      tryFetchInvoiceDetails(invoiceId);
    }
  }

  render() {
    const { intl, objectType } = this.props;
    const { formatMessage } = intl;
    const i18n = 'page.invoice';

    return (
      <Panel
        panelClasses={`${objectType}-theme-panel`}
        panelTitle='Adding new invoice'
        // panelClasses={`${theme}-theme-panel`}
        // panelTitle={formatMessage({ id: `${i18n}.${titleId}` })}
      >
        {this.sections.map(s => (
          <Section
            title={s.key === 'ii' ? '' : formatMessage({ id: `${i18n}.sections.${s.titleId}` })}
            key={s.key}
          >
            {s.child}
          </Section>
        ))}
      </Panel>
    );
  }
}


Invoice.defaultProps = defaultProps;
Invoice.propTypes = propTypes;
const mapStateToProps = () => ({});
const mapDispatchToProps = {
  tryFetchInvoiceDetails,
  // tryFetchInvoiceDefaultDetails,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(injectIntl(Invoice)));
