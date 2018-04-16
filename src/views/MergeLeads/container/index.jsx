import { Panel } from 'components/ui/index';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Buttons, RadiosTable } from '../components/index';
import { tryFetchLeads } from '../flow/actions';


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
};


class MergeLeads extends Component {
  componentDidMount() {
    // fetch data
    const { selectedLeadIds, tryFetchLeads } = this.props;
    console.log(selectedLeadIds);
    tryFetchLeads(selectedLeadIds);
  }

  render() {
    const { intl } = this.props;
    const { formatMessage } = intl;
    const i18n = 'page.mergeLeads';

    return (
      <Panel
        panelTitle={formatMessage({ id: `${i18n}.title` })}
        panelClasses="lead-theme-panel"
      >
        <RadiosTable

        />
        <Buttons />
      </Panel>
    );
  }
}


const mapStateToProps = ({ language, mergence, duplicates }) => ({
  language: global.language,
  selectedLeadIds: duplicates.selectedRowKeys,
});
const mapDispatchToProps = {
  tryFetchLeads,
};
MergeLeads.defaultProps = defaultProps;
MergeLeads.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MergeLeads));