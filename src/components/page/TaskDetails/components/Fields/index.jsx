import { Col, DatePicker, Icon, Input, Row, Select } from 'antd';
import classNames from 'classnames/bind';
import { AssigneeModal, SubjectsModal } from 'components/ui/index';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import Enums from 'utils/EnumsManager';
import styles from './index.less';
import {
  setAssignee,
  setFieldValue,
  tryDeleteSubject,
  tryFetchTask,
  trySaveNewSubject,
  tryFetchAssignees,
  tryFetchRecentAssignees,
  tryFetchTaskSubjects,
} from '../../flow/actions';

const { TextArea } = Input;
const { Option, OptGroup } = Select;
const cx = classNames.bind(styles);

const { PhantomId } = Enums;
// presets
const colLayout = {
  sm: 12,
  xs: 24,
};


const defaultProps = {
  priorities: [],
  statuses: [],
};
const propTypes = {
  intl: intlShape.isRequired,
  priorities: PropTypes.array.isRequired,
  statuses: PropTypes.array.isRequired,
};


class TaskFields extends Component {
  state = {
    assigneeModalVisible: false,
    subjectModalVisible: false,
  }

  componentDidMount() {
    const {
      defaultStateId,
      objectId,
      objectType,
      taskId,
      tryFetchTask,
      tryFetchAssignees,
      tryFetchRecentAssignees,
      tryFetchTaskSubjects,
    } = this.props;
    
    if (taskId !== PhantomId) {
      tryFetchTask(taskId, objectId, objectType, defaultStateId);
    } else {
      // TODO: refactor to move those fetch methods to field separately
      tryFetchAssignees(objectId, objectType);
      tryFetchRecentAssignees(objectType);
      tryFetchTaskSubjects();
    }
  }

  handleAssigneeModalCancel = $ => this.setState({ assigneeModalVisible: false })

  handleAssigneeModalOpen = $ => this.setState({ assigneeModalVisible: true })

  handleSaveSubject = value => this.props.trySaveNewSubject(value)

  handleSubjectDelete = id => this.props.tryDeleteSubject(id)

  handleSubjectModalCancel = $ => this.setState({ subjectModalVisible: false })

  handleSubjectModalOpen = $ => this.setState({ subjectModalVisible: true })

  handleSubjectSelect = name => {
    this.props.setFieldValue('subject', name);
    return this.setState({ subjectModalVisible: false });
  }

  handleFieldChange = (field, value) => this.props.setFieldValue(field, value)

  handleRowClick = id => {
    this.props.setAssignee(Number(id));
    return this.setState({ assigneeModalVisible: false });
  }
  
  render() {
    const { assigneeModalVisible, subjectModalVisible } = this.state;
    const {
      intl,
      assigneeId,
      assignees,
      comments,
      dueTime,
      globalSubjects,
      mySubjects,
      priorityCode,
      priorities,
      recentAssignees,
      statusCode,
      statuses,
      subject,
    } = this.props;

    const { formatMessage } = intl;
    const i18nPrefix = 'page.taskDetails.labels';

    const labelCls = cx('label');
    const rowCls = cx('row');

    return (
      <Fragment>
        <Row className={rowCls} gutter={24}>
          <Col {...colLayout}>
            <div className={labelCls}>
              {formatMessage({ id: `${i18nPrefix}.assignTo` })}
            </div>
            <Select
              onChange={value => {
                if (value === 'moreOptions') {
                  return this.handleAssigneeModalOpen();
                }
                return this.handleFieldChange('assigneeId', value)
              }}
              style={{ width: '100%' }}
              value={assigneeId}
            >
              <OptGroup label={formatMessage({ id: `${i18nPrefix}.recentOptions` })}>
                {recentAssignees.map(assignee => <Option key={assignee.id} value={assignee.id}>{assignee.name}</Option>)}
              </OptGroup>
              <Option className={cx('moreOptions')} value="moreOptions">
                <a>{formatMessage({ id: `${i18nPrefix}.moreOptions` })}</a>
              </Option>
            </Select>
            <AssigneeModal
              data={assignees}
              onCancel={this.handleAssigneeModalCancel}
              onRowClick={this.handleRowClick}
              value={assigneeId}
              visible={assigneeModalVisible}
            />
          </Col>
          <Col {...colLayout}>
            <div className={labelCls}>
              {formatMessage({ id: `${i18nPrefix}.status` })}
            </div>
            <Select
              onChange={value => this.handleFieldChange('statusCode', value)}
              style={{ width: '100%' }}
              value={statusCode}
            >
              {statuses.map(status => <Option key={status.id} value={status.id}>{status.display_value}</Option>)}
            </Select>
          </Col>
        </Row>
        <Row className={rowCls} gutter={24}>
          <Col {...colLayout}>
            <div className={labelCls}>
              {formatMessage({ id: `${i18nPrefix}.subject` })}
            </div>
            <Input
              addonAfter={<Icon className="cursor-pointer" onClick={this.handleSubjectModalOpen} size="small" type="bars" />}
              onChange={e => this.handleFieldChange('subject', e.target.value)}
              placeholder="Please select or add a new value from the list"
              value={subject}
            />
            <SubjectsModal              
              globalSubjects={globalSubjects}
              mySubjects={mySubjects}
              onCancel={this.handleSubjectModalCancel}
              onSaveSubject={this.handleSaveSubject}
              onSubjectDelete={this.handleSubjectDelete}
              onSubjectSelect={this.handleSubjectSelect}
              visible={subjectModalVisible}
            />
          </Col>
          <Col {...colLayout}>
            <div className={labelCls}>
              {formatMessage({ id: `${i18nPrefix}.priority` })}
            </div>
            <Select
              style={{ width: '100%' }}
              onChange={value => this.handleFieldChange('priorityCode', value)}
              value={priorityCode}
            >
              {priorities.map(priority => <Option key={priority.id} value={priority.id}>{priority.display_value}</Option>)}
            </Select>
          </Col>
        </Row>
        <Row className={rowCls} gutter={24}>
          <Col {...colLayout}>
            <div className={labelCls}>
              {formatMessage({ id: `${i18nPrefix}.dueDate` })}
            </div>
            <DatePicker
              allowClear={false}
              format="YYYY-MM-DD"
              onChange={(date, dateString) => this.handleFieldChange('dueTime', dateString)}
              placeholder={formatMessage({ id: 'global.ui.input.datetimepicker.placeholder' })}
              style={{ width: '100%' }}
              value={moment(dueTime)}
            />
          </Col>
        </Row>
        <Row className={rowCls}>
          <div style={{ fontWeight: 700 }}>
            {formatMessage({ id: `${i18nPrefix}.comments` })}
          </div>
          <TextArea
            autosize={{ minRows: 10, maxRows: 30 }}
            onChange={e => this.handleFieldChange('comments', e.target.value)}
            value={comments}
          />
        </Row>
      </Fragment>
    );
  }
}


TaskFields.defaultProps = defaultProps;
TaskFields.propTypes = propTypes;
const mapStateToProps = ({ global, taskDetails }) => ({
  language: global.language,
  priorities: global.settings.priorities,
  statuses: global.settings.statuses,

  assigneeId: taskDetails.assigneeId,
  assignees: taskDetails.assignees,
  comments: taskDetails.comments,
  dueTime: taskDetails.dueTime,
  globalSubjects: taskDetails.globalSubjects,
  mySubjects: taskDetails.mySubjects,
  priorityCode: taskDetails.priorityCode,
  recentAssignees: taskDetails.recentAssignees,
  statusCode: taskDetails.statusCode,
  subject: taskDetails.subject,
});
const mapDispatchToProps = {
  setAssignee,
  setFieldValue,
  tryDeleteSubject,
  tryFetchTask,
  trySaveNewSubject,
  tryFetchAssignees,
  tryFetchRecentAssignees,
  tryFetchTaskSubjects,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TaskFields));
