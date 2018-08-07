import { RelatedToSelection } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setRelatedTo, tryFetchRelatedTos } from '../../flow/secondaryInfo/actions';


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  opportunities: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  relatedTo: PropTypes.string.isRequired,
};

class RelatedTo extends Component {
  componentDidMount() {
    const { objectId, objectType } = this.props.match.params;
    this.props.tryFetchRelatedTos(objectType, objectId);
  }

  handleRelatedToChange = id => this.props.setRelatedTo(id)

  render() {
    const { intl, accounts, opportunities, relatedTo } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.ui.table';

    return (
      <Fragment>
        <div
          className="mb-sm ant-form-item-label"
          style={{ lineHeight: 1.5 }}
        >
          {formatMessage({ id: `${i18n}.relatedTo` })}
        </div>
        <RelatedToSelection
          relatedTo={relatedTo}
          accounts={accounts}
          opportunities={opportunities}
          onChange={this.handleRelatedToChange}
        />
      </Fragment>
    );
  }
}

RelatedTo.defaultProps = defaultProps;
RelatedTo.propTypes = propTypes;
const mapStateToProps = ({ global, invoice }) => ({
  language: global.language,
  accounts: invoice.secondaryInfo.relatedAccounts,
  opportunities: invoice.secondaryInfo.relatedOpportunities,
  relatedTo: invoice.secondaryInfo.relatedTo,
});
const mapDispatchToProps = {
  tryFetchRelatedTos,
  setRelatedTo,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(injectIntl(RelatedTo)));
