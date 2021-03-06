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


const CIForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      ciName: Form.createFormField(props.ciName),
      ciAddress: Form.createFormField(props.ciAddress),
      ciCountry: Form.createFormField(props.ciCountry),
      ciPhone: Form.createFormField(props.ciPhone),
    };
  },
})((props) => {
  const { getFieldDecorator } = props.form;

  return (
    <Form className="normalLabel">
      <Row gutter={24}>
        <Col xs={24} sm={12}>
          <FormItem label="Organization" colon={false}>
            {getFieldDecorator('ciName')(<Input size="small" />)}
          </FormItem>
        </Col>
        <Col xs={24} sm={12}>
          <FormItem label="Address" colon={false}>
            {getFieldDecorator('ciAddress')(<Input size="small" />)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xs={24} sm={12}>
          <FormItem label="Country" colon={false}>
            {getFieldDecorator('ciCountry')(
              <Select size="small">
                {props.countries.map(c =>
                  <Option key={c.id} value={c.id}>{c.display_value}</Option>
                )}
              </Select>
            )}
          </FormItem>
        </Col>
        <Col xs={24} sm={12}>
          <FormItem label="Phone" colon={false}>
            {getFieldDecorator('ciPhone')(<Input size="small" />)}
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
});


CIForm.defaultProps = defaultProps;
CIForm.propTypes = propTypes;
export default injectIntl(CIForm);
