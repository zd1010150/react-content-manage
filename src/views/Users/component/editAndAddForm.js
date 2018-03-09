/* eslint-disable react/prop-types,react/jsx-closing-tag-location,import/extensions */
import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Form, Input, Select, Button } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import { FORM_LAYOUT_CONFIG, FORM_FOOTER_CONFIG} from 'config/app.config.js';
import { getExistRule, validator } from 'utils/validateMessagesUtil';
import styles from '../users.less';

const { Search } = Input;
const cx = classNames.bind(styles);
class userForm extends React.Component {
  onSubmit() {
    const {
      editObj, addUsers, updateUsers, form, selectedDepartmentId,
    } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      const submitFormData = Object.assign({}, values, { team_id: selectedDepartmentId });
      if (!err) {
        if (_.isEmpty(editObj)) {
          addUsers(submitFormData);
        } else {
          updateUsers(submitFormData);
        }
      }
    });
  }
  toggleDepartment() {
    const { toggleDepartmentDialog } = this.props;
    toggleDepartmentDialog(true);
  }
  render() {
    const { Item: FormItem } = Form;
    const { Option } = Select;
    const { formatMessage, locale } = this.props.intl;
    const { getFieldDecorator } = this.props.form;
    const {
      editObject,
      timeZones,
      moments,
      selectedDepartmentText,
      selectedDepartmentId,
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };

    const timeZoneSelector = getFieldDecorator('time_zone', {
      initialValue: editObject.time_zone || timeZones[0].id,
    })(<Select>{
            timeZones.map(item => <Option value={item.id} key={item.id}>{item.text}</Option>)
        }
    </Select>);
    const momentsEl = (<Select>{moments.map(item => <Option value={item} key={item}>{item}</Option>)}</Select>);
    return (

      <Form onSubmit={this.onSubmit}>
        <FormItem>
          {
                        getFieldDecorator('id', {
                            initialValue: editObject.id || '',
                        })(<Input type="hidden" />)
                    }
        </FormItem>
        <FormItem>
          {
                  getFieldDecorator('team_id', {
                      initialValue: selectedDepartmentId || '',
                  })(<Input type="hidden" />)
              }
        </FormItem>
        <FormItem
          {...FORM_LAYOUT_CONFIG}
          label={formatMessage({ id: 'global.form.userName' })}
        >
          {
                        getFieldDecorator('name', {
                            initialValue: editObject.name || '',
                            rules: [
                                getExistRule('required', 'userName', locale, { required: true }),
                                {
                                    validator: validator.between(2, 100, locale),
                                },
                            ],
                        })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.email' })}
        >
          {
                  getFieldDecorator('email', {
                      initialValue: editObject.email || '',
                      rules: [
                          getExistRule('required', 'email', locale, { required: true }),
                          getExistRule('email', 'email', locale),
                      ],
                  })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.password' })}
        >
          {
                        getFieldDecorator('password', {
                            initialValue: editObject.password || '',
                            rules: [
                                getExistRule('required', 'password', locale, { required: true }),
                                {
                                    validator: validator.password(locale),
                                }],
                        })(<Input type="password" />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.department' })}
        >
          {/* { */}
          {/* getFieldDecorator('team_text', { */}
          {/* initialValue: selectedDepartmentText, */}
          {/* })(<Search readOnly  onClick={() => { () => { debugger; this.toggleDepartment(); }; }} />)} */}
          <Search readOnly onClick={() => { this.toggleDepartment(); }} defaultValue={selectedDepartmentText} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.timeZone' })}
        >
          { timeZoneSelector }
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.workingHourStart' })}
        >
          {getFieldDecorator('start_work_time', {
                        initialValue: editObject.start_work_time || '',
                    })(momentsEl)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.workingHourEnd' })}
        >
          {getFieldDecorator('end_work_time ', {
                  initialValue: editObject.end_work_time || '',
              })(momentsEl)}
        </FormItem>
        <FormItem {...formItemLayout}>
          <Button type="primary" htmlType="submit">save</Button>
          <Button type="danger">cancel</Button>
        </FormItem>
      </Form>
    );
  }
}
userForm.defaultProps = {
  editObject: {},
  selectedDepartment: '',
};
userForm.propTypes = {
  intl: intlShape.isRequired,
  editObj: PropTypes.object,
  addUsers: PropTypes.func.isRequired,
  updateUsers: PropTypes.func.isRequired,
  toggleDepartmentDialog: PropTypes.func.isRequired,
  timeZones: PropTypes.array.isRequired,
  moments: PropTypes.array.isRequired,
  selectedDepartmentText: PropTypes.string,
  selectedDepartmentId: PropTypes.string,
};


class WrapperForm extends React.Component {
  render() {
    const AddForm = Form.create()(injectIntl(userForm));
    return <AddForm {...this.props} ref={(instance) => { this.instance = instance; }} />;
  }
}

export default WrapperForm;
