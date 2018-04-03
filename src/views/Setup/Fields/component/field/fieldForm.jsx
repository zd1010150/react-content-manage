/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import _ from 'lodash';
import { toSnakeCase } from 'utils/string';
import PropTypes from 'prop-types';
import { Form, Input, Button, Icon, Checkbox, InputNumber } from 'antd';
import { FORM_LAYOUT_CONFIG, FORM_FOOTER_CONFIG } from 'config/app.config.js';
import { intlShape, injectIntl } from 'react-intl';
import { PAGE_ACTION } from 'config/app.config';
import { fieldCategory } from '../../flow/objectTypeHelper';
import { getExistRule, validator } from 'utils/validateMessagesUtil';

const { ADD, EDIT } = PAGE_ACTION;

class FieldForm extends React.Component {
  componentWillUnmount() {
    this.props.setFieldLableisDuplicate(false);
  }
  onSubmit() {
    const { onSubmit } = this.props;
    this.getAllValue((formData) => {
      onSubmit(formData);
    });
  }
  getAllValue(cb) {
    const { form, isDuplicate } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err && !isDuplicate) {
        cb(values);
      }
    });
  }
  labelBlur(e) {
    const { value } = e.target;
    const {
      action, prefix, form,
    } = this.props;
    if (action === ADD && _.isEmpty(form.getFieldValue('originName'))) {
      form.setFieldsValue({
        field_name: `${prefix}${toSnakeCase(value)}`,
        originName: `${prefix}${toSnakeCase(value)}`,
      });
      this.checkName((isLabelDuplicate, recommendation) => {
        if (isLabelDuplicate) {
          form.setFieldsValue({
            field_name: recommendation,
            originName: recommendation,
          });
        }
      });
    }
  }
  labelChange(e) {
    this.props.form.setFieldsValue({
      field_label: e.target.value,
    });
  }
  nameChange(e) {
    this.props.form.setFieldsValue({
      field_name: e.target.value,
      originName: e.target.value,
    });
  }
  checkName(cb) {
    this.props.checkLabelDuplicate(this.props.objType, this.props.form.getFieldValue('field_name'), (isLabelDuplicate, recommendation) => {
      this.props.setFieldLableisDuplicate(isLabelDuplicate);
      if (_.isFunction(cb)) {
        cb(isLabelDuplicate, recommendation);
      }
    });
  }


  render() {
    const {
      editObject, action, intl, isDuplicate,
    } = this.props;
    const { formatMessage, locale } = intl;
    const { Item: FormItem } = Form;
    const { getFieldDecorator } = this.props.form;
    const isEdit = action === EDIT;
    const isCustom = editObject.category === fieldCategory.CUSTOM;
    return (
      <Form ref={(instance) => { this.instance = instance; }}>

        <FormItem
          {...FORM_LAYOUT_CONFIG}
          label={formatMessage({ id: 'page.fields.label' })}
        >


          {
                  getFieldDecorator('field_label', {
                      initialValue: editObject.label || '',
                      rules: [
                          getExistRule('required', 'field_label', locale, { required: true }),
                      ],
                  })(<Input size="small" disabled={isEdit && (!isCustom)} onChange={e => this.labelChange(e)} onBlur={e => this.labelBlur(e)} />)
              }
        </FormItem>
        <FormItem
          {...FORM_LAYOUT_CONFIG}
          label={formatMessage({ id: 'page.fields.api' })}
        >
          {
              getFieldDecorator('field_name', {
                  initialValue: editObject.name || '',
                  rules: [
                      getExistRule('required', 'field_name', locale, { required: true }),
                  ],
              })(<Input size="small" disabled={isEdit} onChange={e => this.nameChange(e)} onBlur={() => this.checkName()} />)
            }
          {
              isDuplicate ? formatMessage('page.fields.nameDuplicate') : ''
            }

        </FormItem>
        <FormItem>
          {
                    getFieldDecorator('originName', {
                        initialValue: editObject.name || '',
                    })(<Input type="hidden" />)
                }
        </FormItem>
        {
                editObject.type === 'text' ?
                  <FormItem
                    {...FORM_LAYOUT_CONFIG}
                    label={formatMessage({ id: 'page.fields.length' })}
                  >
                    {
                            getFieldDecorator('formatMessage', {
                                initialValue: editObject.length || '',
                            })(<InputNumber disabled={isEdit} />)
                        }
                  </FormItem> : ''
            }
        {
                editObject.type === 'number' ?
                  <FormItem
                    {...FORM_LAYOUT_CONFIG}
                    label={formatMessage({ id: 'page.fields.length' })}
                  >
                    {
                            getFieldDecorator('formatMessage', {
                                initialValue: editObject.precision || '',
                            })(<InputNumber disabled={isEdit} />)
                        }
                  </FormItem> : ''
            }
        {
                editObject.type === 'number' ?
                  <FormItem
                    {...FORM_LAYOUT_CONFIG}
                    label={formatMessage({ id: 'page.fields.scale' })}
                  >
                    {
                            getFieldDecorator('formatMessage', {
                                initialValue: editObject.scale || '',
                            })(<InputNumber disabled={isEdit} />)
                        }
                  </FormItem> : ''
            }
        <FormItem
          {...FORM_LAYOUT_CONFIG}
          label={formatMessage({ id: 'page.fields.helpText' })}
        >
          {
                    getFieldDecorator('helper_text', {
                        initialValue: editObject.helper_text || '',
                    })(<Input.TextArea />)
                }
        </FormItem>
        <FormItem
          {...FORM_LAYOUT_CONFIG}
          label={formatMessage({ id: 'page.fields.description' })}
        >
          {
                    getFieldDecorator('description', {
                        initialValue: editObject.description || '',
                    })(<Input.TextArea />)
                }
        </FormItem>
        <FormItem {...FORM_FOOTER_CONFIG}>
          {
                  getFieldDecorator('notnull', {
                      initialValue: editObject.notnull || '',
                  })(<Checkbox disabled={isEdit} >
                    <span>{ formatMessage({ id: 'page.fields.notNullTip1' }) }</span>
                    <span className="error-msg">({ formatMessage({ id: 'page.fields.notNullTip2' }) })</span>
                  </Checkbox>)
              }

        </FormItem>
        {
            isEdit ?
              <FormItem {...FORM_FOOTER_CONFIG}>
                <Button type="primary" size="small" htmlType="submit" onClick={() => { this.onSubmit(); }}><Icon type="save" />{ formatMessage({ id: 'global.ui.button.save' })}</Button>
                <Button type="danger" size="small" className="ml-sm"><Icon type="close" />{ formatMessage({ id: 'global.ui.button.cancel' })}</Button>
              </FormItem> :
                ''
          }

      </Form>
    );
  }
}
FieldForm.defaultProps = {
  onSubmit: () => {},
};
FieldForm.propTypes = {
  intl: intlShape.isRequired,
  objType: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  editObject: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  checkLabelDuplicate: PropTypes.func,
  prefix: PropTypes.string.isRequired,
  setFieldLableisDuplicate: PropTypes.func.isRequired,
  isDuplicate: PropTypes.bool.isRequired,
};

export default Form.create()(injectIntl(FieldForm));

