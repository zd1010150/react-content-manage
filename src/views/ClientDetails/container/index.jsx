import { DetailsSubpanels, DetailsToolbar, PrimaryDetails } from 'components/page/index';
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Enums from 'utils/EnumsManager';
import { getThemeByType } from 'utils/common';

const { PhantomId } = Enums;

class ObjectDetails extends Component {
  componentDidMount() {
    console.log('testing');
  }

  render() {
    const {
      accountId,
      objectId,
      objectType,
      tools,
      deleted,
      modules,
    } = this.props;
    const theme = getThemeByType(objectType);

    const commonProps = {
      objectId,
      objectType,
      theme,
    };

    return (
      <Fragment>
        {objectId !== PhantomId && <DetailsToolbar {...commonProps} tools={tools} deleted={deleted} />}
        <PrimaryDetails {...commonProps} accountId={accountId} />
        {objectId !== PhantomId && <DetailsSubpanels {...commonProps} modules={modules} />}
      </Fragment>
    );
  }
}


const mapStateToProps = ({ clientDetails }) => ({
  tools: clientDetails.toolbar.tools,
  deleted: clientDetails.toolbar.deleted,
  modules: clientDetails.subpanels.modules,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ObjectDetails);
