import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Icon, Popconfirm } from 'antd';
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

import { StyledModal, FloatingLabelInput } from 'components/ui/index';


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
  onCancel: PropTypes.func,
};


class SubjectsModal extends Component {
  state = {
    newSubject: '',
  }

  handleChange = value => this.setState({ newSubject: value })

  _onCancel = $ => {
    const { onCancel } = this.props;
    if (_.isFunction(onCancel)) {
      this.setState({newSubject: ''});
      onCancel();
    }
  }

  _onSaveNewSubject = $ => {
    const { newSubject } = this.state;
    const { globalSubjects, mySubjects, onSaveSubject } = this.props;
    // check if newSubject name is existed or is empty, then skip the save
    if (_.isFunction(onSaveSubject)) {   
      if (_.isEmpty(newSubject)
          || globalSubjects.find(subject => subject.name === newSubject)
          || mySubjects.find(subject => subject.name === newSubject)) {
        return;
      }
      return onSaveSubject(newSubject);
    }
  }

  _onSubjectDelete = id => {
    const {onSubjectDelete} = this.props;
    if (_.isFunction(onSubjectDelete)) {
      onSubjectDelete(id);
    }
  }

  render() {
    const { newSubject } = this.state;    
    const {
      intl,
      visible,
      globalSubjects,
      mySubjects
    } = this.props;
    const { formatMessage } = intl;
    const i18nPrefix = 'page.subjectsModal';

    return (
      <StyledModal
        footer={false}
        onCancel={this._onCancel}
        title={formatMessage({ id: `${i18nPrefix}.title` })}
        visible={visible}
      >
        <div className={cx('hint')}>
          {formatMessage({ id: `${i18nPrefix}.hint` })}
        </div>
        <ul className={cx('subjectsList')}>
          {globalSubjects.map(subject => (
            <li
              key={subject.id}
              className={cx('subject')}
            >
              {subject.name}
            </li>
          ))}
          {mySubjects.map(subject => (
            <li
              key={subject.id}
              className={`${cx('subject')}`}
            >
              {subject.name}
              <Popconfirm
                cancelText={formatMessage({ id: `global.ui.button.cancel` })}
                okText={formatMessage({ id: `global.ui.button.ok` })}
                onConfirm={e => this._onSubjectDelete(subject.id)}
                title={formatMessage({ id: `global.ui.dialog.deleteTitle` })}
              >
                <Icon
                  className={cx('deleteIcon')}
                  size="small"
                  type="delete"
                />
              </Popconfirm>
            </li>
          ))}
        </ul>
        <FloatingLabelInput
          addonAfter={<Icon className="cursor-pointer" size="small" type="save" onClick={this._onSaveNewSubject} />}
          handleChange={this.handleChange}
          labelColor="#000"
          labelText={formatMessage({ id: `${i18nPrefix}.label` })}          
          placeholder={formatMessage({ id: `${i18nPrefix}.placeholder` })}
          value={newSubject}          
        />
      </StyledModal>
    );
  }
}


SubjectsModal.defaultProps = defaultProps;
SubjectsModal.propTypes = propTypes;
export default injectIntl(SubjectsModal);