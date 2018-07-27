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

  getI18nMessageByKey = key => this.props.intl.formatMessage({ id: `global.errors.${key}` })

  // TODO: testing if this will work or not
  showNotificationByKey = key => notification.error({
    duration: 3,
    message: this.getI18nMessageByKey(key),
  })

  checkCriteria = (criteria) => {
    if (!_.isArray(criteria)) {
      this.showNotificationByKey('testing');
      return false;
    }
    const isAnyInvalid = criteria.some(c => !c.isValid());
    if (isAnyInvalid) {
      this.showNotificationByKey('fieldOrConditionRequired');
      return false;
    }
    return true;
  }
  checkLogic = (logic) => {
    notification.error({
      duration: 3,
      message: this.getI18nMessageByKey('filterNumRequired'),
    });
    return false;
  }
  checkCriteriaAndLogic = () => {
    const { CriteriaAndLogic } = this.props;
    const { criteria, logic } = CriteriaAndLogic;
    return this.checkCriteria(criteria) && this.checkLogic(logic);
  }

  checkValidationBySection = () => {
    const {
      intl,
      objectView,
    } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.errors';

    const { name, fields } = objectView;
    // check name
    if (_.isEmpty(name.view_name)) {
      notification.error({
        duration: 3,
        message: formatMessage({ id: `${i18n}.nameRequired` }),
      });
      return false;
    }
    
    this.checkCriteriaAndLogic();

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

    const isAllSectionsValid = this.checkValidationBySection();
    if (!isAllSectionsValid) return;

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
const mapStateToProps = ({ global, objectView, FilterCriteria__REFACTORED }) => ({
  model: global.settings.model,
  done: objectView.actions,
  objectView,
  CriteriaAndLogic: FilterCriteria__REFACTORED,
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
