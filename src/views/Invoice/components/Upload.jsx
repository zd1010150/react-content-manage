import React, { Fragment, Component } from 'react';
import { ManualFileUpload } from 'components/ui/index';

class Upload extends Component {
  componentWillMount() {
  }

  handleBeforeUpload = (file) => {
    console.log(file.uid);
  }

  handleRemove = (file) => {
    console.log(file.uid);
  }

  render() {
    return (
      <Fragment>
        <label>Attachment</label>
        <ManualFileUpload
          wrapperCls="horizontal"
          onBeforeUpload={this.handleBeforeUpload}
          onRemove={this.handleRemove}
        />
      </Fragment>
    );
  }
}


export default Upload;
