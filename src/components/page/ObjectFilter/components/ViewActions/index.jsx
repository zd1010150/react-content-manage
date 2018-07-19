import { notification, Row, Icon, Button } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { PopDeleteConfirm } from 'components/ui/index';
import Enums from 'utils/EnumsManager';
import { trySave, trySaveNew, tryDeleteView } from './flow/actions';

const { PhantomId } = Enums;
const { Lookup } = Enums.FieldTypes;


const defaultProps = {
  trySave: null,
  trySaveNew: null,
  tryDeleteView: null,
};
const propTypes = {
  intl: intlShape.isRequired,
  viewId: PropTypes.string.isRequired,
  objectView: PropTypes.shape({
    name: PropTypes.object.isRequired,
    filterCriteria: PropTypes.object.isRequired,
    fields: PropTypes.object.isRequired,
    visibilities: PropTypes.object.isRequired,
    actions: PropTypes.bool.isRequired,
  }).isRequired,
  trySave: PropTypes.func,
  trySaveNew: PropTypes.func,
  tryDeleteView: PropTypes.func,
};

class ViewActions extends Component {
  componentDidUpdate() {
    const { done, history, objectType } = this.props;
    if (done) {
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

    const isValid = this.checkValidation(objectView);
    if (!isValid) return;

    const funcKey = viewId === PhantomId ? 'trySaveNew' : 'trySave';
    this.props[funcKey](model[objectType], objectView, viewId);
  }

  handleDeleteClick = () => this.props.tryDeleteView(this.props.viewId)

  render() {
    const {
      intl,
      viewId,
      objectType,
      theme,
    } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.ui.button';

    return (
      <Row className="mt-xlg mb-xlg mr-lg ml-lg">
        <Button className={`${theme}-theme-btn`} onClick={this.handleSaveClick}>
          <Icon className="font-sm" type="save" />
          {formatMessage({ id: `${i18n}.save` })}
        </Button>
        <Link to={`/${objectType}`}>
          <Button className="ml-sm">
            <Icon className="font-sm" type="close" />
            {formatMessage({ id: `${i18n}.cancel` })}
          </Button>
        </Link>
        {viewId !== PhantomId && (
          <PopDeleteConfirm onConfirm={this.handleDeleteClick}>
            <Button className="ml-sm">
              <Icon className="font-sm" type="delete" />
              {formatMessage({ id: `${i18n}.delete` })}
            </Button>
          </PopDeleteConfirm>
        )}
      </Row>
    );
  }
}


ViewActions.defaultProps = defaultProps;
ViewActions.propTypes = propTypes;
const mapStateToProps = ({ global, objectView }) => ({
  model: global.settings.model,
  done: objectView.actions,
  objectView,
});
const mapDispatchToProps = {
  tryDeleteView,
  trySave,
  trySaveNew,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(injectIntl(ViewActions)));
