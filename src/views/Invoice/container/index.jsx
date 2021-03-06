import { Panel, Section } from 'components/ui/index';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getThemeByType } from 'utils/common';
import Enums from 'utils/EnumsManager';
import { Actions, BillingInfo, CompanyInfo, InvoiceInfo, ItemDetails } from '../components/index';
import { reset, tryFetchInvoiceDefaults, tryFetchInvoiceDetails } from '../flow/actions';
import { deactivateRow } from '../flow/itemsList/actions';

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
        key: 'ci',
        titleId: 'ci',
        child: CompanyInfo,
      },
      {
        key: 'bi',
        titleId: 'bi',
        child: BillingInfo,
      },
      {
        key: 'ii',
        titleId: 'ii',
        child: InvoiceInfo,
      },
      {
        key: 'id',
        titleId: 'id',
        child: ItemDetails,
      },
    ];

    this.panel = null;
  }

  componentDidMount() {
    const { objectId, objectType, invoiceId } = this.props.match.params;
    if (invoiceId !== PhantomId) {
      this.props.tryFetchInvoiceDetails(invoiceId);
    } else {
      this.props.tryFetchInvoiceDefaults(objectId, objectType, invoiceId);
    }

    // Register focus handler
    // NOTES: The following listener is helping us to manage interaction with ItemsList component.
    //        Deactivate all editable fields in ItemsList when no more focus away from the current row.
    this.panel.addEventListener('focus', this.handlePageFocus, true);
    // NOTES: deactivate row if user click on other area, in order to complement cases that the above handler can't do
    this.panel.addEventListener('click', this.handlePageClick, true);
  }

  componentWillUnmount() {
    // Unregister focus handler
    this.panel.removeEventListener('focus', this.handlePageFocus, true);
    this.panel.removeEventListener('click', this.handlePageClick, true);
    // Reset
    this.props.reset();
  }

  getRowElement = (e) => {    
    let element = e.target.parentNode ? e.target.parentNode.parentNode : null;
    if (element.classList.contains('ant-input-number')) {
      element = element.parentNode ? element.parentNode.parentNode : null;
    }
    return element;
  }

  isSameRowFocused = (row, focusingId) => {
    if (!row) return false;
    if (!row.dataset || !row.dataset.itemId) return false;
    if (Number(row.dataset.itemId) !== focusingId) return false;
    return true;
  }

  handlePageFocus = (e) => {
    const row = this.getRowElement(e);
    const { items } = this.props;
    const focusingItem = items.find(item => item.isEditingAll);
    if (focusingItem && !this.isSameRowFocused(row, focusingItem.id)) {
      // TODO: This still have minor issue because click on page area may not trigger 'focus' event due to default DOM events.
      //       Another click handler needs to be added in order to handle such scenarios.
      this.props.deactivateRow(focusingItem.id);
    }
  }

  // consider performance, we end exist recursion when 'panel' is found
  isClsInScope = (node, cls) => {
    if (node.classList.contains(cls)) return true;
    if (node.classList.contains('panel-content')) return false;
    // Recursion
    if (node.parentNode) return this.isClsInScope(node.parentNode, cls);
  }
  // recusively find if parent or itself has target
  isClickInTarget = (event, target) => this.isClsInScope(event.target, target.selector)
  // Reset row status if click outside itemsTable
  handlePageClick = (e) => {
    if (this.isClickInTarget(e, { selector: 'itemsList', type: 'class' })) return;
    const { items, deactivateRow } = this.props;
    items.filter(item => item.isEditingAll).forEach(item => deactivateRow(item.id));
  }

  render() {
    const { intl, match } = this.props;
    const { formatMessage } = intl;
    const i18n = 'page.invoice';
    const { invoiceId, objectType } = match.params;
    const titleId = invoiceId === PhantomId ? 'new' : 'edit';

    return (
      <div ref={(panel) => { this.panel = panel; }}>
        <Panel
          panelClasses={`${getThemeByType(objectType)}-theme-panel`}
          panelTitle={formatMessage({ id: `${i18n}.pageTitles.${titleId}` })}
        >
          {this.sections.map(s => (
            <Section
              title={s.key === 'ii' ? '' : formatMessage({ id: `${i18n}.sections.${s.titleId}` })}
              key={s.key}
            >
              {s.child}
            </Section>
          ))}
          <Actions />
        </Panel>
      </div>
    );
  }
}


Invoice.defaultProps = defaultProps;
Invoice.propTypes = propTypes;
const mapStateToProps = ({ global, invoice }) => ({
  language: global.language,
  items: invoice.itemsList,
});
const mapDispatchToProps = {
  tryFetchInvoiceDetails,
  tryFetchInvoiceDefaults,
  deactivateRow,
  reset,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(injectIntl(Invoice)));
