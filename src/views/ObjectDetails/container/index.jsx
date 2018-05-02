import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getThemeByType } from 'utils/common';
import { PrimaryDetails, TaskPanels, Toolbar } from '../components/index';
import { reset, tryFetchClientDetails } from '../flow/actions';
import { PrimaryDetails as NewPrimaryDetails } from 'components/page/index';

class ObjectDetails extends Component {
  componentDidMount() {
    const { objectId, objectType, tryFetchClientDetails } = this.props;
    tryFetchClientDetails(objectType, objectId);
  }

  componentDidUpdate() {
    if (this.props.deleted) {
      const { history, objectType } = this.props;
      history.push(`/${objectType}`);
    }
  }

  componentWillUnmount() {
    this.props.reset();
  }

  handleDelete = id => this.props.tryDeleteEntity(id, this.props.objectType)

  render() {
    const {
      accountId,
      objectId,
      objectType,
      tools,
      primaryDetails,
      modules,
    } = this.props;
    const theme = getThemeByType(objectType);

    const commonProps = {
      objectType,
      objectId,
      theme,
    };
    
    return (
      <Fragment>
        <NewPrimaryDetails {...commonProps} accountId={accountId} />
        <Toolbar {...commonProps} tools={tools} />
        {/* <PrimaryDetails {...commonProps} /> */}
        <TaskPanels {...commonProps} modules={modules} />
      </Fragment>
    );
  }
}


const mapStateToProps = ({ objectDetails }) => ({
  tools: objectDetails.toolbar.tools,
  primaryDetails: objectDetails.primaryDetails,
  modules: objectDetails.tasks.modules,
  deleted: objectDetails.toolbar.deleted,
});
const mapDispatchToProps = {
  tryFetchClientDetails,
  reset,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ObjectDetails));
