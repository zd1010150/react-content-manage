import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import { Button, Icon, Row } from 'antd';

import Enums from 'utils/EnumsManager';
import { Section } from 'components/ui/index'
import { Panel, FilterCondition } from 'components/ui/index';
import { ViewName, FilterCriteria, ViewButtons, FieldsSelection } from '../components/index';
import { resetView, saveView, fetchViewById } from '../flow/actions';
// import { saveView } from '../components/ViewButtons/flow/actions';

const defaultProps = {
};
const propTypes = {
  intl: intlShape.isRequired,
};

class ObjectFilter extends Component {
  componentDidMount() {
    const { match } = this.props;
    const { object, viewId } = match.params;
    debugger;
    this.props.fetchViewById(viewId, object);
    if (viewId !== Enums.PhantomID) {
      // fetch if path id is not phantom
      console.log('----fetch exist view data----');
    } else {
      // otherwise reset all sub store and fetch all fields and selectors
      console.log('----reset view substore----');
      this.props.resetView();
    }
  }

  handleSaveClick = () => {
    console.log('saving');
    this.props.saveView();
  }

  render() {
    return (
      <Panel panelClasses="lead-theme-panel" panelTitle="Edit Views">
        <Section title="Step 1. Enter View Name" body={ViewName} collapsible />
        <Section title="Step 2. Specify Filter Criteria" body={FilterCriteria} />
        <Section title="Step 3. Select Fields to Display" body={FieldsSelection} />
        <Section title="Step 4. Restrict Visibility" body={null} />
        <ViewButtons onSaveClick={this.handleSaveClick} />
      </Panel>
    );
  }
}

ObjectFilter.defaultProps = defaultProps;
ObjectFilter.propTypes = propTypes;
const mapStateToProps = ({ objectView }) => ({
  objectView,
});
const mapDispatchToProps = {
  resetView,
  saveView,
  fetchViewById,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ObjectFilter));