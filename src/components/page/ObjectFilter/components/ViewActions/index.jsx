import { notification } from 'antd';
import { SubmitButtons } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
import { trySave, trySaveNew } from './flow/actions';

const { PhantomId } = Enums;


const defaultProps = {
  trySave: null,
  trySaveNew: null,
};
const propTypes = {
  intl: intlShape.isRequired,
  objectView: PropTypes.shape({
    name: PropTypes.object.isRequired,
    filterCriteria: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    visibilities: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  }).isRequired,
  trySave: PropTypes.func,
  trySaveNew: PropTypes.func,
};

class ViewActions extends Component {
  componentDidUpdate() {
    const { hasSuccessfullySaved, history, objectType } = this.props;
    if (hasSuccessfullySaved) {
      history.push(`/${objectType}`);
    }
  }

  checkValidation = (data) => {
    const { intl } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.errors';

    const { name, filterCriteria, fields } = data;
    // check name
    if (_.isEmpty(name.view_name)) {
      notification.error({
        duration: 3,
        message: formatMessage({ id: `${i18n}.nameRequired` }),
      });
      return false;
    }
    // check criteria
    const { condition_logic, filters } = filterCriteria;
    if (filters.length > 0) {
      if (_.isEmpty(condition_logic)) {
        notification.error({
          duration: 3,
          message: formatMessage({ id: `${i18n}.filterNumRequired` }),
        });
        return false;
      }
      if (this.isMissingFieldOrConditionValue(filters)) {
        notification.error({
          duration: 3,
          message: formatMessage({ id: `${i18n}.fieldOrConditionRequired` }),
        });
        return false;
      }
      // TODO: backend finish the validation check about which filter num is missing from condition logic. The front end will implement this as well later.
    }
    // check selection
    const { selectedFields } = fields;
    if (selectedFields.length < 1) {
      notification.error({
        duration: 3,
        message: formatMessage({ id: `${i18n}.selectionRequired` }),
      });
      return false;
    }
    return true;
  }

  isMissingFieldOrConditionValue = data => data.every(record => (record.conditionId === PhantomId || record.fieldId === PhantomId))

  handleSaveClick = () => {
    const {
      model,
      objectType,
      objectView,
      viewId,
    } = this.props;
    // TODO: Add notification when view_name field is empty
    // Add validation check
    const isValid = this.checkValidation(objectView);
    if (!isValid) return;

    const funcKey = viewId === PhantomId ? 'trySaveNew' : 'trySave';
    this.props[funcKey](model[objectType], objectView, viewId);
  }

  render() {
    const { objectType, theme } = this.props;

    return <SubmitButtons theme={theme} objectType={objectType} onSaveClick={this.handleSaveClick} />;
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
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(injectIntl(ViewActions)));
