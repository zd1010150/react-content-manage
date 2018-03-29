/* eslint-disable react/prop-types,no-shadow */
import React from 'react';
import _ from 'lodash';
import { toSnakeCase } from 'js-snakecase';
import PropTypes from 'prop-types';
import { Form, Input, Button, Icon, Checkbox, InputNumber } from 'antd';
import { FORM_LAYOUT_CONFIG, FORM_FOOTER_CONFIG } from 'config/app.config.js';
import { intlShape, injectIntl } from 'react-intl';
import { PAGE_ACTION } from 'config/app.config';
import { fieldCategory } from '../../flow/objectTypeHelper';
import { getExistRule } from 'utils/validateMessagesUtil';

const { ADD, EDIT } = PAGE_ACTION;

class FieldForm extends React.Component {
    state = {
      isLabelDuplicate: false,
      label: this.props.editObject.label,
      originName: this.props.editObject.name,
      name: this.props.editObject.name,
      checked: this.props.editObject.notnull,
    }
    componentWillReceiveProps(nextProps) {
      this.setState({
        label: nextProps.editObject.label,
        originName: nextProps.editObject.name,
        name: nextProps.editObject.name,
        checked: nextProps.editObject.notnull,
      });
    }
    getAllValue(cb) {
      const { form, editObject } = this.props;
      let validateResult = true;
      form.validateFieldsAndScroll((err, values) => {
        validateResult = validateResult && !err;
        validateResult = validateResult && this.state.isLabelDuplicate;
        if (validateResult) {
          cb({
            ...values,
            field_name: this.state.name,
            field_label: this.state.label,
            crm_data_type: editObject.type,
            notnull: this.state.checked,
          });
        }
      });
    }
    onSubmit() {
      const { onSubmit } = this.props;
      this.getAllValue((formData) => {
        onSubmit(formData);
      });
    }
    labelBlur(e) {
      const { value } = e.target;
      const { action, prefix } = this.props;
      if (action === ADD && _.isEmpty(this.state.originName)) {
        this.setState({
          name: `${prefix}${toSnakeCase(value)}`,
        });
        this.checkName((isLabelDuplicate, recommendation) => {
          this.setState({
            name: recommendation,
          });
        });
      }
    }
    labelChange(e) {
      this.setState({
        label: e.target.value,
      });
    }
    nameChange(e) {
      this.setState({
        name: e.target.value,
      });
    }
    checkName(cb) {
      this.props.checkLabelDuplicate(this.props.objType, this.state.name, (isLabelDuplicate, recommendation) => {
        if (_.isFunction(cb)) {
          cb(isLabelDuplicate, recommendation);
        } else {
          this.setState({
            isLabelDuplicate,
          });
        }
      });
    }
    notNullChange(e) {
      this.setState({
        checked: e.target.checked,
      });
    }
    render() {
      const { editObject, action, intl } = this.props;
      const { formatMessage } = intl;
      const { Item: FormItem } = Form;
      const { getFieldDecorator } = this.props.form;
      const isEdit = action === EDIT;
      const isCustom = editObject.category === fieldCategory.CUSTOM;
      return (
        <Form>

          <FormItem
            {...FORM_LAYOUT_CONFIG}
            label={formatMessage({ id: 'page.fields.label' })}
          >
            <Input size="small" disabled={isEdit && (!isCustom)} value={this.state.label} onChange={e => this.labelChange(e)} onBlur={e => this.labelBlur(e)} />
          </FormItem>
          <FormItem
            {...FORM_LAYOUT_CONFIG}
            label={formatMessage({ id: 'page.fields.api' })}
          >
            <Input size="small" disabled={isEdit} value={this.state.name} onChange={e => this.nameChange(e)} onBlur={() => this.checkName()} />
            {
                  this.state.isLabelDuplicate ? formatMessage('page.fields.nameDuplicate') : ''
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
                        initialValue: editObject.name || '',
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
            <Checkbox checked={this.state.checked} onChange={e => this.notNullChange(e)} disabled={isEdit} >
              <span>{ formatMessage({ id: 'page.fields.notNullTip1' }) }</span>
              <span className="error-msg">({ formatMessage({ id: 'page.fields.notNullTip2' }) })</span>
            </Checkbox>
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
};

export default Form.create()(injectIntl(FieldForm));

