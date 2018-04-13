import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { FindDuplicates } from 'components/page/index';


class FindDuplicatesWrapper extends Component {
  render() {
    const { match } = this.props;
    const { url } = match;

    return (
      <FindDuplicates withConvert={url.indexOf('/convert/find') !== -1}/>
    );
  }
}


export default FindDuplicatesWrapper;