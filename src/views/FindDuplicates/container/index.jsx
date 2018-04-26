import { FindDuplicates } from 'components/page/index';
import React, { Component } from 'react';
import { getThemeByType } from 'utils/common';


class FindDuplicatesWrapper extends Component {
  render() {
    const { url, params } = this.props.match;
    const { objectId, objectType } = params;
    const theme = getThemeByType(objectType);

    return (
      <FindDuplicates
        objectId={objectId}
        objectType={objectType}
        theme={theme}
        withConvert={url.indexOf('/convert/find') !== -1}
      />
    );
  }
}


export default FindDuplicatesWrapper;
