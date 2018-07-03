import React from 'react';
import { Form, Input, Row, Col, Select } from 'antd';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

const FormItem = Form.Item;
const { TextArea } = Input;
const { Option, OptGroup } = Select;


const defaultProps = {};
const propTypes = {
  intl: intlShape.isRequired,
  statuses: PropTypes.array.isRequired,
  relatedOptions: PropTypes.object.isRequired,
};


const ItemInfoForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      idStatus: Form.createFormField(props.idStatus),
      idRelateTo: Form.createFormField(props.idRelateTo),
      idLastModifiedDate: Form.createFormField(props.idLastModifiedDate),
      idModefiedBy: Form.createFormField(props.idModefiedBy),
      idDescription: Form.createFormField(props.idDescription),
    };
  },
})(({
  intl,
  form,
  statuses,
  relatedOptions,
}) => {
  const { formatMessage } = intl;
  const labelI18n = 'global.ui.table';

  const { getFieldDecorator } = form;

  return (
    <Form className="normalLabel">
      <Row gutter={24}>
        <Col xs={24} sm={6}>
          <FormItem
            label={formatMessage({ id: `${labelI18n}.status` })}
            colon={false}
          >
            {getFieldDecorator('idStatus')(
              <Select>
                {statuses.map(s =>
                  <Option key={s.id} value={s.id}>{s.display_value}</Option>)}
              </Select>
            )}
          </FormItem>
        </Col>
        <Col xs={24} sm={6}>
          <FormItem
            label={formatMessage({ id: `${labelI18n}.relateTo` })}
            colon={false}
          >
            {getFieldDecorator('idRelateTo')(
              <Select>
                <OptGroup
                  label={
                    <span className="account-theme-text">
                      <b>{formatMessage({ id: 'global.properNouns.accounts' })}</b>
                    </span>
                  }
                >
                  {relatedOptions.accounts.map(acct => (
                    <Option
                      key={acct.id}
                      value={acct.id}
                      className="account-theme-text"
                    >
                      {acct.name}
                    </Option>
                  ))}
                </OptGroup>
                <OptGroup
                  label={
                    <span className="opport-theme-text">
                      <b>{formatMessage({ id: 'global.properNouns.opportunities' })}</b>
                    </span>
                  }
                >
                  {relatedOptions.opportunities.map(o => (
                    <Option
                      key={o.id}
                      value={o.id}
                      className="opport-theme-text"
                    >
                      {o.name}
                    </Option>
                  ))}
                </OptGroup>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col xs={24} sm={6}>
          <FormItem
            label={formatMessage({ id: `${labelI18n}.lastModifiedAt` })}
            colon={false}
          >
            {getFieldDecorator('idLastModifiedDate', {
            })(<Input readOnly />)}
          </FormItem>
        </Col>
        <Col xs={24} sm={6}>
          <FormItem
            label={formatMessage({ id: `${labelI18n}.modifiedBy` })}
            colon={false}
          >
            {getFieldDecorator('idModefiedBy', {
            })(<Input readOnly />)}
          </FormItem>
        </Col>
      </Row>
      <Row>
        <FormItem
          label={formatMessage({ id: `${labelI18n}.invoiceDescription` })}
          colon={false}
        >
          {getFieldDecorator('idDescription', {
          })(<TextArea autosize={{ minRows: 6, maxRows: 10 }} />)}
        </FormItem>
      </Row>
    </Form>
  );
});


ItemInfoForm.defaultProps = defaultProps;
ItemInfoForm.propTypes = propTypes;
export default injectIntl(ItemInfoForm);
