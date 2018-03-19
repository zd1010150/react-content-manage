import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';

import Enums from 'utils/EnumsManager';
import { Panel, SectionTitle } from 'components/ui/index';
import { FilterCondition } from '../../../ui/index';

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
        <SectionTitle title="Step 1. Enter View Name" />
        <br />
        <SectionTitle title="Step 2. Specify Filter Criteria" />
        <FilterCondition/>
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