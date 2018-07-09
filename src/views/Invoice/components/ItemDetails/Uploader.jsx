import { InstantUpload } from 'components/ui/index';
import React, { Component } from 'react';
import Enums from 'utils/EnumsManager';
import { connect } from 'react-redux';

const { FileExtensions } = Enums;
const { Images, Pdf } = FileExtensions;

class Uploader extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <InstantUpload
        uploadProps={{
          accept: `${Images}, ${Pdf}`,
        }}
      />
    );
  }  
}


const mapStateToProps = () => ({

});
const mapDispatchToProps = {

};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Uploader);
