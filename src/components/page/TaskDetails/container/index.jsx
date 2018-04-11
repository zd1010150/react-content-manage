import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'antd';

import { Panel } from 'components/ui/index';
import { toUtc } from 'utils/dateTimeUtils';
import Enums from 'utils/EnumsManager';
const { PhantomId, ThemeTypes, ThemeTypesInArray } = Enums;
import { Actions, Fields } from '../components/index';
import { trySaveNewTask, tryUpdateTask } from '../flow/actions';
//
const mapStoreToRequest = ({
  assigneeId,
  comments,
  dueTime,
  priorityCode,
  statusCode,
  subject,
}, type) => {

  return {
    assign_to_user_id: assigneeId,
    subject,
    status_code: statusCode,
    priority_code: priorityCode,
    due_datetime: toUtc(dueTime, '+1100', 'YYYY-MM-DD HH:mm:ss'),
    // TODO: backend needs to save this column, now the api doesn't accept value from this column
    // comments,
    taskable_type: type,
  }
};


const defaultProps = {
  objectId: PhantomId,
  theme: ThemeTypes.Lead,
};
const propTypes = {
  intl: intlShape.isRequired,
  objectId: PropTypes.string.isRequired,
  theme: PropTypes.oneOf(ThemeTypesInArray).isRequired,
};


class TaskDetails extends Component {
  handleCancel = $ => this.props.history.goBack()

  handleSave = (id, type) => {
    const { taskDetails, trySaveNewTask, tryUpdateTask } = this.props;
    if (id === PhantomId) {      
      trySaveNewTask(id, type, mapStoreToRequest(taskDetails, type));
    } else {
      tryUpdateTask(id, type, mapStoreToRequest(taskDetails, type));
    }
  }

  handleSaveAndNew = (id, type) => {
    
  }

  render() {
    const { intl, objectId, objectType, theme } = this.props;

    const { formatMessage } = intl;
    const i18nPrefix = 'page.taskDetails';
    const titleKey = objectId === PhantomId ? 'newTitle' : 'editTitle';

    return (
      <Panel
        panelTitle={formatMessage({ id: `${i18nPrefix}.${titleKey}` })}
        panelClasses={`${theme}-theme-panel`}
      >
        <Row style={{ margin: '10px 15px' }}>
          <Fields
            objectId={objectId}
            objectType={objectType}
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


TaskDetails.defaultProps = defaultProps;
TaskDetails.propTypes = propTypes;
const mapStateToProps = ({ global, taskDetails }) => ({
  language: global.language,
  taskDetails,
});
const mapDispatchToProps = {
  trySaveNewTask,
  tryUpdateTask,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(TaskDetails)));