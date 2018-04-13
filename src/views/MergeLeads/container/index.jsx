import { Panel } from 'components/ui/index';
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Buttons } from '../components/index';

class MergeLeads extends Component {
  componentDidMount() {
    // fetch data
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
        merge MergeLeads
        <Buttons />
      </Panel>
    );
  }
}


const mapStateToProps = ({ language, mergence }) => ({
  language: global.language,
});
const mapDispatchToProps = {
  // tryFetchData,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MergeLeads));