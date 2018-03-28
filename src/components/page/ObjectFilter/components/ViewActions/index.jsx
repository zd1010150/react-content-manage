import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import Enums from 'utils/EnumsManager';
import { SubmitButtons } from 'components/ui/index';
import { trySave, trySaveNew } from './flow/actions';

const defaultProps = {};
const propTypes = {
  trySave: PropTypes.func,
  trySaveNew: PropTypes.func,
  objectView: PropTypes.shape({
    name: PropTypes.object.isRequired,
    filterCriteria: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    visibilities: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }).isRequired,
};

class ViewActions extends Component {
  handleSaveClick = e => {
    const { model, match, objectView } = this.props;
    // TODO: Add notification when view_name field is empty
    if (_.isEmpty(objectView.name.view_name)) return;

    const { object, viewId } = match.params;
    const objectType = model[object];
    const funcKey = viewId === Enums.PhantomID ? 'trySaveNew' : 'trySave';
    this.props[funcKey](objectType, objectView, viewId);
  }

  render () {
    const { hasSuccessfullySaved, match } = this.props;
    const { object } = match.params;
    if (hasSuccessfullySaved) {
      return <Redirect to={`/${object}`} />;
    }
    return <SubmitButtons onSaveClick={this.handleSaveClick} />;
  }
}

ViewActions.defaultProps = defaultProps;
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ViewActions));