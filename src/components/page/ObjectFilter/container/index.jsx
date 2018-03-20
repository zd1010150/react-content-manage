import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { intlShape, injectIntl } from 'react-intl';
import { Button, Icon, Row } from 'antd';

import Enums from 'utils/EnumsManager';
import { Section } from 'components/ui/index'
import { Panel, FilterCondition } from 'components/ui/index';
import { ViewName, FilterCriteria } from '../components/index';
import { resetView } from '../flow/actions';

const defaultProps = {
};
const propTypes = {
  intl: intlShape.isRequired,
};

class ObjectFilter extends Component {
  componentDidMount() {
    const { match } = this.props;
    const { object, viewId } = match.params;    
    if (viewId !== Enums.PhantomID) {
      // fetch if path id is not phantom
      console.log('----fetch exist view data----');
    } else {
      // otherwise reset all sub store and fetch all fields and selectors
      console.log('----reset view substore----');
      this.props.resetView();
    }
  }

  render() {
    return (
      <Panel panelClasses="lead-theme-panel" panelTitle="Edit Views">
        <Section title="Step 1. Enter View Name" body={ViewName} collapsible />
        <Section title="Step 2. Specify Filter Criteria" body={FilterCriteria} />
        <Section title="Step 3. Select Fields to Display" body={null} />
        <Section title="Step 4. Restrict Visibility" body={null} />
        <Row style={{ margin: '40px 15px 20px' }}>
          <Button className="ml-sm lead-theme-btn" size="small">
            <Icon type="save" size="small" />
            Submit
          </Button>
          <Button className="ml-sm" size="small">
            <Icon type="close" size="small" />
            Cancel
          </Button>
        </Row>
      </Panel>
    );
  }
}

ObjectFilter.defaultProps = defaultProps;
ObjectFilter.propTypes = propTypes;
const mapStateToProps = () => ({
});
const mapDispatchToProps = {
  resetView,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ObjectFilter));