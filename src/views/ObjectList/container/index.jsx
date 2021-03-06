import { Panel } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import Enums from 'utils/EnumsManager';
import { getThemeByType } from 'utils/common';
import { Table, Toolbar, Topbar } from '../components/index';
const { ObjectTypesInArray } = Enums;


const propTypes = {
  objectType: PropTypes.oneOf(ObjectTypesInArray).isRequired,
};

class ObjectList extends Component {
  render() {
    const { objectType } = this.props;
    const theme = getThemeByType(objectType);

    return (
      <Fragment>
        <Topbar objectType={objectType} />
        <Panel
          panelClasses={`${theme}-theme-panel`}
          contentClasses="pb-xlg"
        >
          <Toolbar
            theme={theme}
            objectType={objectType}
          />
          <Table
            theme={theme}
            objectType={objectType}
          />
        </Panel>
      </Fragment>
    );
  }
}


ObjectList.propTypes = propTypes;
export default ObjectList;