import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { getThemeByType } from 'utils/common';
import { Toolbar, PrimaryDetails, TaskPanels } from '../components/index';


class ObjectDetails extends Component {
  render() {
    const { params } = this.props.match;
    const theme = getThemeByType(params.objectType);

    return (
      <Fragment>
        <Toolbar {...params} />
        <PrimaryDetails {...params} theme={theme} />
        <TaskPanels {...params} theme={theme} />
      </Fragment>
    );
  }
}


export default ObjectDetails;