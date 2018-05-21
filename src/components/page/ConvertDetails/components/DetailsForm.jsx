/* eslint-disable */
import React, { Component } from 'react';
import { Form, Input, Select, Row, Col, Checkbox } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';

const { Option } = Select;
const { createFormField } = Form;
const FormItem = Form.Item;
const colLayout = {
  xs: 24,
  sm: 12,
};


const propTypes = {
  intl: intlShape.isRequired,
  accountStatuses: PropTypes.array.isRequired,
};


class DetailsForm extends Component {
  render() {
    const { intl, form, accountStatuses } = this.props;
    const { formatMessage } = intl;
    const i18n = 'page.convertDetails.labels';
    const i18nPh = 'global.ui.placeholders';
    const i18nErr = 'global.errors';
    const { getFieldDecorator } = form;
    const requiredRule = {
      required: true,
      message: formatMessage({ id: `${i18nErr}.required` }),
    };

    return (
      <Form layout="vertical">
        <Row gutter={24}>
          <Col {...colLayout}>
            <FormItem
              label={formatMessage({ id: `${i18n}.owner` })}
            >
              {getFieldDecorator('owner', {
                rules: [
                  { required: true, message: 'Please select your favourite colors!', type: 'array' },
                ],
              })(
                <Select mode="multiple" placeholder="Please select favourite colors">
                  <Option value="red">Red</Option>
                  <Option value="green">Green</Option>
                  <Option value="blue">Blue</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              label={formatMessage({ id: `${i18n}.opportName` })}
              colon={false}
            >              
              {getFieldDecorator('opportunityName', {
                rules: [requiredRule],
              })(
                <Input placeholder={formatMessage({ id: 'test' })} />
              )}
            </FormItem>
            <FormItem
              label=""
              colon={false}
            >              
              {getFieldDecorator('withNewOpportunity', {})(
                <Checkbox style={{ fontSize: 11 }}>
                  {formatMessage({ id: `${i18n}.noNewOpport` })}
                </Checkbox>
              )}
            </FormItem>
            <FormItem
              label={formatMessage({ id: `${i18n}.acctStatus` })}
              colon={false}
            >              
              {getFieldDecorator('accountStatus', {
                rules: [requiredRule],
              })(
                <Select
                  placeholder=""
                >
                  {accountStatuses.map(st => <Option key={st.id} value={st.id}>{st.value}</Option>)}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col {...colLayout}>
            <FormItem label="Field A" colon={false} required>
              <Input placeholder="input placeholder" />
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}


const mapPropsToFields = (props) => ({
  opportunityName: createFormField({
    ...props.opportunityName,
    value: props.opportunityName.value,
  }),
  withNewOpportunity: createFormField({
    ...props.withNewOpportunity,
    value: props.withNewOpportunity.value,
  }),
  accountStatus: createFormField({
    ...props.accountStatus,
    value: props.accountStatus.value,
  }),
});
const onFieldsChange = (props, fields) => {
  console.dir(fields);
};
const DetailsFormWrapper = Form.create({
  // mapPropsToFields,
  onFieldsChange,
})(injectIntl(DetailsForm));
export default DetailsFormWrapper;
