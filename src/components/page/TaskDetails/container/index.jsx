import { Row, notification } from 'antd';
import { Panel } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
import { toUtc } from 'utils/dateTimeUtils';
import { Actions, Fields } from '../components/index';
import { reset, setSuccess, trySaveNewTask, tryUpdateTask, setRouteInfo } from '../flow/actions';

const { PhantomId, ThemeTypesInArray } = Enums;

const mapStoreToRequest = ({
  assigneeId,
  comments,
  dueTime,
  priorityCode,
  statusCode,
  subject,
}, objectId, objectType) => ({
  assign_to_user_id: assigneeId,
  subject,
  status_code: statusCode,
  priority_code: priorityCode,
  due_date: toUtc(dueTime),
  comments,
  taskable_type: objectType,
  taskable_id: objectId,
});


const propTypes = {
  intl: intlShape.isRequired,
  objectId: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(ThemeTypesInArray).isRequired,
};


class TaskDetails extends Component {
  componentDidUpdate() {
    const {
      history,
      objectId,
      objectType,
      synced,
      routeInfo,
      setRouteInfo,
    } = this.props;
    if (synced === 'save' || (synced === 'cancel' && routeInfo !== 'dashboard')) {
      history.push(`/${objectType}/${objectId}`);
    }
    if (synced === 'cancel' && routeInfo === 'dashboard') {
      history.push('/dashboard');
    }
    if (synced === 'saveAndNew') {
      this.props.reset();
      setRouteInfo(objectType);
      history.push(`/${objectType}/${objectId}/tasks/${PhantomId}`);
    }
  }

  componentWillUnmount() {
    this.props.reset();
  }

  handleCancel = () => this.props.setSuccess('cancel')

  handleSave = (saveAndAddNew) => {
    const {
      objectId,
      objectType,
      taskDetails,
      taskId,
      trySaveNewTask,
      tryUpdateTask,
    } = this.props;

    const isValid = this.checkValidation(taskDetails);
    if (!isValid) return;

    const targetData = mapStoreToRequest(taskDetails, objectId, objectType);
    if (taskId === PhantomId) {
      trySaveNewTask(taskId, targetData, saveAndAddNew);
    } else {
      tryUpdateTask(taskId, targetData, saveAndAddNew);
    }
  }

  handleSaveAndNew = () => this.handleSave(true)

  showNotification = message => notification.error({ duration: 3, message })

  checkValidation = (data) => {
    const { intl } = this.props;
    const { formatMessage } = intl;
    const i18n = 'global.errors';
    const {
      assigneeId,
      dueTime,
      priorityCode,
      statusCode,
      subject,
    } = data;

    if (assigneeId === '') {
      this.showNotification(formatMessage({ id: `${i18n}.assigneeRequired` }));
      return false;
    }
    if (dueTime === '') {
      this.showNotification(formatMessage({ id: `${i18n}.dateRequired` }));
      return false;
    }
    if (priorityCode === '') {
      this.showNotification(formatMessage({ id: `${i18n}.priorityRequired` }));
      return false;
    }
    if (statusCode === '') {
      this.showNotification(formatMessage({ id: `${i18n}.statusRequired` }));
      return false;
    }
    if (_.isEmpty(subject)) {
      this.showNotification(formatMessage({ id: `${i18n}.subjectRequired` }));
      return false;
    }
    return true;
  }

  render() {
    const {
      intl,
      defaultStateId,
      objectId,
      objectType,
      taskId,
      theme,
      disableActions,
      isHistoryTask,
    } = this.props;

    const { formatMessage } = intl;
    const i18nPrefix = 'page.taskDetails';
    let titleKey = '';
    if (isHistoryTask) {
      titleKey = 'viewTitle';
    } else if (taskId === PhantomId) {
      titleKey = 'newTitle';
    } else {
      titleKey = 'editTitle';
    }
    
    return (
      <Panel
        panelTitle={formatMessage({ id: `${i18nPrefix}.${titleKey}` })}
        panelClasses={`${theme}-theme-panel`}
      >
        <Row className="mt-md mb-md ml-lg mr-lg">
          <Fields
            defaultStateId={defaultStateId}
            objectId={objectId}
            objectType={objectType}
            taskId={taskId}
            isHistoryTask={isHistoryTask}
          />
        </Row>
        {!disableActions && (
          <Row className="mt-md mb-md ml-lg mr-lg">
            <Actions
              objectId={objectId}
              objectType={objectType}
              onCancel={this.handleCancel}
              onDelete={this.handleDelete}
              onSave={this.handleSave}
              onSaveAndNew={this.handleSaveAndNew}
              isHistoryTask={isHistoryTask}
            />
          </Row>
        )}
      </Panel>
    );
  }
}


TaskDetails.propTypes = propTypes;
const mapStateToProps = ({ global, taskDetails }) => ({
  language: global.language,
  taskDetails,
  synced: taskDetails.synced,
  resetTask: taskDetails.resetTask,
  routeInfo: taskDetails.routeInfo,
});
const mapDispatchToProps = {
  reset,
  setSuccess,
  trySaveNewTask,
  tryUpdateTask,
  setRouteInfo,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(injectIntl(TaskDetails)));
