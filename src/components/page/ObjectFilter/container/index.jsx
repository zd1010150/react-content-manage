import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';

import Enums from 'utils/EnumsManager';
import { Section } from '../../../ui/index'
import { Panel, FilterCondition } from 'components/ui/index';
import { ViewName } from '../components/index';

const defaultProps = {
};
const propTypes = {
  intl: intlShape.isRequired,
};

class ObjectFilter extends Component {
  componentDidMount() {
    // fetch if path id is not phantom

    // otherwise reset all sub store and fetch all fields and selectors
  }

  render() {
    const { match } = this.props;
    const { object, viewId } = match.params;
    return (
      <Panel panelClasses="lead-theme-panel" panelTitle="Edit Views">
        <Section title="Step 1. Enter View Name" body={ViewName} collapsible />
        <Section title="Step 2. Specify Filter Criteria" body={null} />
        <FilterCondition />
        <span>object: {object}</span>
        <br />
        <span>view: {viewId}</span>
      </Panel>
    );
  }
}

ObjectFilter.defaultProps = defaultProps;
ObjectFilter.propTypes = propTypes;
export default injectIntl(ObjectFilter);