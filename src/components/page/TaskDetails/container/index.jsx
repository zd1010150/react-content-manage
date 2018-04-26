import { Row } from 'antd';
import { Panel } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
import { toUtc } from 'utils/dateTimeUtils';
import { Actions, Fields } from '../components/index';
import { reset, setSuccess, trySaveNewTask, tryUpdateTask } from '../flow/actions';

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
  // Convert only date pass a empty time offset
  due_date: toUtc(dueTime, '', 'YYYY-MM-DD'),
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
    } = this.props;
    if (synced) {
      history.push(`/${objectType}/${objectId}`);
    }
  }

  componentWillUnmount() {
    this.props.reset();
  }

  handleCancel = () => this.props.setSuccess()

  handleSave = (saveAndAddNew) => {
    const {
      objectId,
      objectType,
      taskDetails,
      taskId,
      trySaveNewTask,
      tryUpdateTask,
    } = this.props;

    const targetData = mapStoreToRequest(taskDetails, objectId, objectType);
    if (taskId === PhantomId) {
      trySaveNewTask(taskId, targetData, saveAndAddNew);
    } else {
      tryUpdateTask(taskId, targetData, saveAndAddNew);
    }
  }

  handleSaveAndNew = () => this.handleSave(true)

  render() {
    const {
      intl,
      objectId,
      objectType,
      taskId,
      theme,
    } = this.props;

    const { formatMessage } = intl;
    const i18nPrefix = 'page.taskDetails';
    const titleKey = taskId === PhantomId ? 'newTitle' : 'editTitle';

    return (
      <Panel
        panelTitle={formatMessage({ id: `${i18nPrefix}.${titleKey}` })}
        panelClasses={`${theme}-theme-panel`}
      >
        <Row style={{ margin: '10px 15px' }}>
          <Fields
            objectId={objectId}
            objectType={objectType}
            taskId={taskId}
          />
        </Row>
        <Row style={{ margin: '10px 15px' }}>
          <Actions
            objectId={objectId}
            objectType={objectType}
            onCancel={this.handleCancel}
            onDelete={this.handleDelete}
            onSave={this.handleSave}
            onSaveAndNew={this.handleSaveAndNew}
          />
        </Row>
      </Panel>
    );
  }
}


TaskDetails.propTypes = propTypes;
const mapStateToProps = ({ global, taskDetails }) => ({
  language: global.language,
  taskDetails,
  synced: taskDetails.synced,
});
const mapDispatchToProps = {
  reset,
  setSuccess,
  trySaveNewTask,
  tryUpdateTask,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(TaskDetails)));