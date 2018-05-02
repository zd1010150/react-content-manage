import { PrimaryDetails } from 'components/page/index';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { getThemeByType } from 'utils/common';

class ObjectDetails extends Component {
  componentDidMount() {
    console.log('testing');
  }

  render() {
    const {
      accountId,
      objectId,
      objectType,
    } = this.props;
    const theme = getThemeByType(objectType);

    const commonProps = {
      objectType,
      objectId,
      theme,
    };

    return (
      <Fragment>
        <PrimaryDetails {...commonProps} accountId={accountId} />
        {/* <Toolbar {...commonProps} tools={tools} />
        <TaskPanels {...commonProps} modules={modules} /> */}
      </Fragment>
    );
  }
}


const mapStateToProps = ({ clientDetails }) => ({
  tools: clientDetails.tools,
  modules: clientDetails.modules,
});
const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(ObjectDetails);
