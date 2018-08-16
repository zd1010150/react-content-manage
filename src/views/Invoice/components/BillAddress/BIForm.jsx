import React from 'react';
import { Form, Input, Row, Col, Select } from 'antd';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

const FormItem = Form.Item;
const { Option } = Select;


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
  countries: PropTypes.array.isRequired,
};


const BIForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      biName: Form.createFormField(props.biName),
      biAddress: Form.createFormField(props.biAddress),
      biCountry: Form.createFormField(props.biCountry),
      biPhone: Form.createFormField(props.biPhone),
    };
  },
})((props) => {
  const { getFieldDecorator } = props.form;

  return (
    <Form className="normalLabel">
      <Row gutter={24}>
        <Col xs={24} sm={12}>
          <FormItem label="Name" colon={false}>
            {getFieldDecorator('biName', {
            })(<Input size="small" />)}
          </FormItem>
        </Col>
        <Col xs={24} sm={12}>
          <FormItem label="Address" colon={false}>
            {getFieldDecorator('biAddress', {
            })(<Input size="small" />)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xs={24} sm={12}>
          <FormItem label="Country" colon={false}>
            {getFieldDecorator('biCountry', {
            })(
              <Select size="small" >
                {props.countries.map(c =>
                  <Option key={c.id} value={c.id}>{c.display_value}</Option>)}
              </Select>
            )}
          </FormItem>
        </Col>
        <Col xs={24} sm={12}>
          <FormItem label="Phone" colon={false}>
            {getFieldDecorator('biPhone', {
            })(<Input size="small" />)}
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
});


BIForm.defaultProps = defaultProps;
BIForm.propTypes = propTypes;
export default injectIntl(BIForm);
