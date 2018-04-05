import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FloatingActionButtons } from 'components/ui/index';
import {
  trySaveLead,
  tryUpdateLead,
  trySaveAndAddNewLead,
  revertAllFields,
} from '../../flow/actions';

const defaultProps = {};
const propTypes = {

};


class ActionButtonsWrapper extends Component {
  handleSave = $ => {
    console.log('save');
  }
  
  handleSaveAndNew = $ => {
    console.log('savenadd');
  }

  handleRevert = $ => {
    console.log('rev');
    this.props.revertAllFields();
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
const mapStateToProps = ({ global }) => ({
  language: global.language,
});
const mapDispatchToProps = {
  trySaveLead,
  tryUpdateLead,
  trySaveAndAddNewLead,
  revertAllFields,
};
export default connect(mapStateToProps, mapDispatchToProps)(ActionButtonsWrapper);