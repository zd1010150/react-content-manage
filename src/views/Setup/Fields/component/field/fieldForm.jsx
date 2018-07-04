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
  onCancel() {
    const { onCancel } = this.props;
    onCancel();
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
      action, form,
    } = this.props;

    if (action === ADD && _.isEmpty(form.getFieldValue('originName'))) {
      form.setFieldsValue({
        field_name: `${toSnakeCase(value)}`,
        originName: `${toSnakeCase(value)}`,
      });
      this.checkName();
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
  checkName() {
    const {
      objType, checkLabelDuplicate, form, prefix, setFieldLableisDuplicate,
    } = this.props;
    checkLabelDuplicate(objType, `${prefix}${form.getFieldValue('field_name')}`, (isLabelDuplicate, suggestion) => {
      setFieldLableisDuplicate(isLabelDuplicate);
      if (isLabelDuplicate) {
        const _suggestion = suggestion.slice(prefix.length);
        form.setFieldsValue({
          field_name: _suggestion,
          originName: _suggestion,
        });
        setFieldLableisDuplicate(false);
      }
    });
  }


  render() {
    const {
      editObject, action, intl, isDuplicate, prefix, form, setFieldAttr,
    } = this.props;
    const { formatMessage, locale } = intl;
    const { Item: FormItem } = Form;
    const { getFieldDecorator } = this.props.form;
    const isEdit = action === EDIT;
    const isCustom = editObject.category === fieldCategory.CUSTOM;
    return (
      <Form ref={(instance) => { this.instance = instance; }}>
        <FormItem>
          {
                getFieldDecorator('id', {
                    initialValue: editObject.id || '',
                })(<Input type="hidden" />)
          }
        </FormItem>
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
              })(<Input size="small" addonBefore={editObject.category === fieldCategory.CUSTOM ? prefix : ''} disabled={isEdit} onChange={e => this.nameChange(e)} onBlur={() => this.checkName()} />)
            }
          {
              isDuplicate ? <span className="error-msg"> {formatMessage({ id: 'page.fields.nameDuplicate' }, { value: form.getFieldValue('field_name') }) }</span> : ''
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
                    {       getFieldDecorator('length', {
                                initialValue: 255,
                            })
                           (<InputNumber disabled />)
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
                            getFieldDecorator('precision', {
                                initialValue: editObject.precision || '',
                            })(<InputNumber disabled={isEdit} min={0} max={100} />)
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
                            getFieldDecorator('scale', {
                                initialValue: editObject.scale || '',
                            })(<InputNumber disabled={isEdit} min={0} max={100} />)
                        }
                  </FormItem> : ''
            }
        <FormItem
          {...FORM_LAYOUT_CONFIG}
          label={formatMessage({ id: 'page.fields.helpText' })}
        >
          {
                    getFieldDecorator('helper_text', {
                        initialValue: editObject.helpText || '',
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
                  getFieldDecorator('notnull')(<Checkbox disabled={isEdit} checked={editObject.notnull} onChange={e => setFieldAttr({ notnull: e.target.checked })}>
                    <span>{ formatMessage({ id: 'page.fields.notNullTip1' }) }</span>
                    <span className="error-msg">({ formatMessage({ id: 'page.fields.notNullTip2' }) })</span>
                  </Checkbox>)
              }

        </FormItem>
        {
            isEdit ?
              <FormItem {...FORM_FOOTER_CONFIG}>
                <Button type="danger" size="small" className="mr-lg" onClick={() => { this.onCancel(); }}><Icon type="close" />{ formatMessage({ id: 'global.ui.button.cancel' })}</Button>
                <Button type="primary" size="small" htmlType="submit" onClick={() => { this.onSubmit(); }}><Icon type="save" />{ formatMessage({ id: 'global.ui.button.save' })}</Button>
              </FormItem> :
                ''
          }

      </Form>
    );
  }
}
FieldForm.defaultProps = {
  onSubmit: () => {},
  onCancel: () => {},
  setFieldAttr: () => {},
};
FieldForm.propTypes = {
  intl: intlShape.isRequired,
  objType: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  editObject: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  checkLabelDuplicate: PropTypes.func,
  prefix: PropTypes.string.isRequired,
  setFieldLableisDuplicate: PropTypes.func.isRequired,
  setFieldAttr: PropTypes.func,
  isDuplicate: PropTypes.bool.isRequired,
};

export default Form.create()(injectIntl(FieldForm));

