/* eslint-disable react/prop-types,react/jsx-closing-tag-location,import/extensions */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import { getExistRule, validator } from 'utils/validateMessagesUtil';
import styles from '../users.less';


const cx = classNames.bind(styles);
class userForm extends React.Component {
  render() {
    const { language } = this.props;
    const { Item: FormItem } = Form;
    const { Option } = Select;
    const { formatMessage } = this.props.intl;
    const { getFieldDecorator } = this.props.form;
    const {
      editObject,
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
    const groupSelector = getFieldDecorator('group', { initialValue: editObject.group || group[0].id })(<Select disabled={disabled} key="group">{group.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)}</Select>);
    return (
      <Form onSubmit={this.props.onSubmit}>
        <FormItem>
          {
                        getFieldDecorator('id', {
                            initialValue: editObject.id || '',
                        })(<Input type="hidden" />)
                    }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.lastName' })}
        >
          {
                        getFieldDecorator('lastName', {
                            initialValue: editObject.lastName || '',
                            rules: [
                                getExistRule('required', 'lastName', language, { required: true }),
                                {
                                    validator: validator.between(1, 50, language),
                                },
                            ],
                        })(<Input disabled={disabled} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.firstName' })}
        >
          {
                        getFieldDecorator('firstName', {
                            initialValue: editObject.firstName || '',
                            rules: [
                                getExistRule('required', 'firstName', language, { required: true }),
                                {
                                    validator: validator.between(1, 50, language),
                                },
                            ],
                        })(<Input disabled={disabled} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.phone' })}
        >
          {
                        getFieldDecorator('phone', {
                            initialValue: editObject.phone || '',
                            rules: [
                                getExistRule('required', 'phone', language, { required: true }),
                                {
                                    validator: validator.phone(language),
                                }],
                        })(<Input disabled={disabled} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.email' })}
        >
          {
                        getFieldDecorator('email', {
                            initialValue: editObject.email || '',
                            rules: [getExistRule('email', 'email', language)],
                        })(<Input disabled={disabled} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.address' })}
        >
          {
                        getFieldDecorator('address', {
                            initialValue: editObject.address || '',
                            rules: [
                                {
                                    validator: validator.between(1, 150, language),
                                }],
                        })(<Input disabled={disabled} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.city' })}
        >
          {
                        getFieldDecorator('city', {
                            initialValue: editObject.city || '',
                            rules: [{
                                validator: validator.between(1, 150, language),
                            }],
                        })(<Input disabled={disabled} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.state' })}
        >
          {
                        getFieldDecorator('state', {
                            initialValue: editObject.state || '',
                            rules: [{
                                validator: validator.between(1, 150, language),
                            }],
                        })(<Input disabled={disabled} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.country' })}
        >
          { countriesEl}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.zipCode' })}
        >
          {
                        getFieldDecorator('zipCode', {
                            initialValue: editObject.zipCode || '',
                            rules: [{
                                validator: validator.zipCode(language),
                            }],
                        })(<Input disabled={disabled} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.idNumber' })}
        >
          {
                        getFieldDecorator('idNumber', {
                            initialValue: editObject.idNumber || '',
                            rules: [
                                getExistRule('required', 'idNumber', language, { required: this.state.checkIdNumber }),
                                {
                                    validator: validator.idNumber(language),
                                }],
                        })(<Input disabled={disabled} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.socialMedia' })}
        >
          {getFieldDecorator('socialMediaNumber', {
                        initialValue: editObject.socialMediaNumber || '',
                        rules: [{
                            validator: validator.between(3, 80, language),
                        }],
                    })(<Input addonBefore={socialMediaTypeSelector} style={{ width: '100%' }} disabled={disabled} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.group' })}
        >
          { groupSelector }
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={formatMessage({ id: 'global.form.interests' })}
        >
          { interestsSelector }
        </FormItem>
        <div className={classNames(cx('id-wrapper'), showID ? 'show' : 'hidden')}>
          <FormItem
            className={cx('id-front')}
            {...formItemLayout}
            label={formatMessage({ id: 'global.ui.button.upload' })}
          >
            { getFieldDecorator('idFront', {
                            initialValue: editObject.idFront || '',
                        })(<Upload disabled={disabled} file={editObject.idFront || null} pictureQuantity={1} uploadText={formatMessage({ id: 'page.Leads.uploadIDFront' })} />) }

          </FormItem>
          <FormItem
            className={cx('id-back')}
          >
            { getFieldDecorator('idBack', {
                            initialValue: editObject.idBack || '',
                        })(<Upload disabled={disabled} file={editObject.idBack || null} pictureQuantity={1} uploadText={formatMessage({ id: 'page.Leads.uploadIDBack' })} />) }
          </FormItem>
        </div>
      </Form>
    );
  }
}
userForm.defaultProps = {
  editObject: {},
  canEdit: false,
  showID: false,
  interests: [],
  group: [],
  countries: [],
};
userForm.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
  editObject: PropTypes.object,
  canEdit: PropTypes.bool,
  interests: PropTypes.array,
  group: PropTypes.array,
  countries: PropTypes.array,
  showID: PropTypes.bool,
};


class WrapperForm extends React.Component {
  render() {
    // const lang = this.props.language || 'zh';
    const AddForm = Form.create()(injectIntl(userForm));
    return <AddForm {...this.props} ref={(instance) => { this.instance = instance; }} />;
  }
}

export default WrapperForm;
