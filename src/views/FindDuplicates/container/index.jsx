import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { FindDuplicates } from 'components/page/index';


class FindDuplicatesWrapper extends Component {
  render() {
    const { url, params } = this.props.match;
    const { objectId } = params;
    
    return (
      <FindDuplicates
        objectId={objectId}
        withConvert={url.indexOf('/convert/find') !== -1}
      />
    );
  }
}


export default FindDuplicatesWrapper;