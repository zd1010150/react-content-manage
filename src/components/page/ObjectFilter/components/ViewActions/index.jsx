import { notification, Row, Icon, Button } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { PopDeleteConfirm } from 'components/ui/index';
import Enums from 'utils/EnumsManager';
import { trySave, trySaveNew, tryDeleteView } from './flow/actions';
import { setActiveView, tryFetchDataByView } from 'views/ObjectList/flow/actions';

const { PhantomId, DefaultPageConfigs } = Enums;
const { PageSize } = DefaultPageConfigs;


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

  showNotificationByKey = key => notification.error({
    duration: 3,
    message: this.getI18nMessageByKey(key),
  })

  checkCriteria = (criteria) => {
    if (!_.isArray(criteria)) {
      // this.showNotificationByKey('testing');
      return false;
    }
    const isAnyInvalid = criteria.some(c => !c.isValid());
    if (isAnyInvalid) {
      this.showNotificationByKey('fieldAndConditionRequired');
      return false;
    }
    return true;
  }
  checkLogic = (logic, criteria) => {
    if (criteria.length > 0 && !logic) {
      this.showNotificationByKey('filterNumRequired');
      return false;
    }
    // TODO: Add further validation to test if each display num has appeared in logic at least once.
    //       It's not necessary because backend has implemented this validation.
    return true;
  }
  checkCriteriaAndLogic = () => {
    const { criteriaAndLogic } = this.props;
    const { criteria, logic } = criteriaAndLogic;
    return this.checkCriteria(criteria.criteria) && this.checkLogic(logic, criteria.criteria);
  }

  checkValidationBySection = () => {
    const { objectView } = this.props;
    const { name, fields } = objectView;
    // check name
    if (_.isEmpty(name.view_name)) {
      this.showNotificationByKey('nameRequired');
      return false;
    }
    
    const isCriteriaValid = this.checkCriteriaAndLogic();
    if (!isCriteriaValid) {
      return false;
    }

    const { selectedFields } = fields;
    if (selectedFields.length < 1) {
      this.showNotificationByKey('selectionRequired');
      return false;
    }
    return true;
  }

  isMissingFieldOrConditionValue = data => data.every(record => (record.conditionId === PhantomId || record.fieldId === PhantomId))

  getViewID = (id) => {
    const { setActiveView, objectType, tryFetchDataByView } = this.props;
    setActiveView(id, objectType);
    tryFetchDataByView(
      objectType,
      id,
      { page: 1, per_page: PageSize },
    );
  }

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
    this.props[funcKey](model[objectType], objectView, viewId, this.getViewID);
  }

  handleDeleteClick = () => {
    const {
      tryDeleteView,
      viewId,
      setActiveView,
      objectType
    } = this.props;
    tryDeleteView(viewId);
    setActiveView(PhantomId, objectType);
    tryFetchDataByView(
      objectType,
      PhantomId,
      { page: 1, per_page: PageSize },
    );
  }

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
  criteriaAndLogic: FilterCriteria__REFACTORED,
});
const mapDispatchToProps = {
  tryDeleteView,
  trySave,
  trySaveNew,
  setActiveView,
  tryFetchDataByView,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(injectIntl(ViewActions)));
