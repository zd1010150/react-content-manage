import React, { Component } from 'react';
import { connect } from 'react-redux';
import ConvertDetailsView from './view';
import { tryFetchOwner } from '../flow/actions';


const propTypes = {
};


class ConvertDetails extends Component {
  componentDidMount() {
    const { objectId, tryFetchOwner } = this.props;
    tryFetchOwner(objectId);
  }

  render() {
    return (
      <ConvertDetailsView />
    );
  }
}


const mapStateToProps = ({ global }) => ({
  language: global.language,
});
const mapDispatchToProps = {
  tryFetchOwner,
};
ConvertDetails.propTypes = propTypes;
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConvertDetails);
