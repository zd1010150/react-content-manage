import { Panel } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { concatArrayParams } from 'utils/common';
import { Buttons, RadiosTable } from '../components/index';
import { resetState, tryFetchLeads } from '../flow/actions';


const propTypes = {
  intl: intlShape.isRequired,
  tryFetchLeads: PropTypes.func.isRequired,
};


class MergeLeads extends Component {
  componentDidMount() {
    const { selectedLeadIds, tryFetchLeads } = this.props;
    if (selectedLeadIds.length) {
      tryFetchLeads(concatArrayParams(selectedLeadIds));
    }
  }

  componentDidUpdate() {
    // Modify the history here to avoid warning about render method
    const { mergeSuccess, history } = this.props;
    if (mergeSuccess) {
      // TODO: need to decide which page to return to, because the original ids may not be find, and new id may not be accessible
      return history.push('/leads');
    }
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    const { intl, data } = this.props;
    const { formatMessage } = intl;
    const i18n = 'page.mergeLeads';

    return (
      <Panel
        panelTitle={formatMessage({ id: `${i18n}.title` })}
        panelClasses="lead-theme-panel"
        contentClasses="pb-lg pl-lg pr-lg pt-sm"
      >
        <RadiosTable />
        <div className="mt-lg"><Buttons canMerge={data.length > 0} /></div>
      </Panel>
    );
  }
}


const mapStateToProps = ({ language, mergence, duplicates }) => ({
  language: global.language,
  selectedLeadIds: duplicates.selectedRowKeys,
  data: mergence.data,
  mergeSuccess: mergence.mergeSuccess,
});
const mapDispatchToProps = {
  resetState,
  tryFetchLeads,
};
MergeLeads.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(MergeLeads)));
