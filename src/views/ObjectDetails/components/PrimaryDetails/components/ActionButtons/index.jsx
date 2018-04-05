import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FloatingActionButtons } from 'components/ui/index';
import Enums from 'utils/EnumsManager';
import {
  trySaveClient,
  tryUpdateClient,
  trySaveAndAddNewClient,
  revertAllFields,
} from '../../flow/actions';

const defaultProps = {
};
const propTypes = {
  revertAllFields: PropTypes.func,
  trySaveAndAddNewClient: PropTypes.func,
  trySaveClient: PropTypes.func,
  tryUpdateClient: PropTypes.func,
};


class ActionButtonsWrapper extends Component {
  handleRevert = $ => this.props.revertAllFields()

  handleSave = $ => {
    const { data, objectId, objectType, trySaveClient, tryUpdateClient } = this.props;
    if (objectId === Enums.PhantomID) {
      return trySaveClient(objectId, objectType, data);
    }
    return tryUpdateClient(objectId, objectType, data);
  }
  
  handleSaveAndNew = $ => {
    console.log('savenadd');
  }  

  render() {
    const { theme } = this.props;

    return (
      <FloatingActionButtons
        theme={theme}
        onSaveClick={this.handleSave}
        onSaveAndNewClick={this.handleSaveAndNew}
        onRevertClick={this.handleRevert}
      />
    );
  }
}


ActionButtonsWrapper.defaultProps = defaultProps;
ActionButtonsWrapper.propTypes = propTypes;
const mapStateToProps = ({ global, objectDetails }) => ({  
  language: global.language,
  data: objectDetails.primaryDetails.data,
});
const mapDispatchToProps = {
  trySaveClient,
  tryUpdateClient,
  trySaveAndAddNewClient,
  revertAllFields,
};
export default connect(mapStateToProps, mapDispatchToProps)(ActionButtonsWrapper);