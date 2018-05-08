import { SubmitButtons } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
import { trySave, trySaveNew } from './flow/actions';

const { PhantomId } = Enums;


const propTypes = {
  trySave: PropTypes.func.isRequired,
  trySaveNew: PropTypes.func.isRequired,
  objectView: PropTypes.shape({
    name: PropTypes.object.isRequired,
    filterCriteria: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    visibilities: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }).isRequired,
};

class ViewActions extends Component {
  handleSaveClick = () => {
    const {
      model,
      objectType,
      objectView,
      viewId,
    } = this.props;
    // TODO: Add notification when view_name field is empty
    if (_.isEmpty(objectView.name.view_name)) return;

    const funcKey = viewId === PhantomId ? 'trySaveNew' : 'trySave';
    this.props[funcKey](model[objectType], objectView, viewId);
  }

  render() {
    const { hasSuccessfullySaved, objectType, theme } = this.props;
    if (hasSuccessfullySaved) {
      return <Redirect to={`/${objectType}`} />;
    }
    return <SubmitButtons theme={theme} objectType={objectType} onSaveClick={this.handleSaveClick} />;
  }
}


ViewActions.propTypes = propTypes;
const mapStateToProps = ({ global, objectView }) => ({
  model: global.settings.model,
  hasSuccessfullySaved: objectView.actions.hasSuccessfullySaved,
  objectView,
});
const mapDispatchToProps = {
  trySave,
  trySaveNew,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewActions);
