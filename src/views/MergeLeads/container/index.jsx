import { Panel } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Buttons, RadiosTable } from '../components/index';
import { tryFetchLeads } from '../flow/actions';
import { concatArrayParams } from 'utils/common';


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
  tryFetchLeads: PropTypes.func,
};


class MergeLeads extends Component {
  componentDidMount() {
    // fetch data
    const { selectedLeadIds, tryFetchLeads } = this.props;
    if (selectedLeadIds.length) {
      tryFetchLeads(concatArrayParams(selectedLeadIds));
    }
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
});
const mapDispatchToProps = {
  tryFetchLeads,
};
MergeLeads.defaultProps = defaultProps;
MergeLeads.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MergeLeads));