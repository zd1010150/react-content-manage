import { Col, Row, Select, Tooltip, Icon } from 'antd';
import { CustomField, StyledModal } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import Enums from 'utils/EnumsManager';
import { toUtc } from 'utils/dateTimeUtils';
import { setOptions, tryFetchOptionsById } from '../flow/actions';

const { Option } = Select;
const { FieldTypes, PhantomId } = Enums;
const { DateOnly, DateTime, Lookup, PickList } = FieldTypes;


const defaultProps = {
  visible: false,
  columns: [],
  selectedFieldOptions: [],
};
const propTypes = {
  intl: intlShape.isRequired,
  columns: PropTypes.array.isRequired,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  selectedFieldOptions: PropTypes.array.isRequired,
  setOptions: PropTypes.func,
  tryFetchOptionsById: PropTypes.func,
  visible: PropTypes.bool.isRequired,
};


const labelCol = {
  sm: 6,
  xs: 24,
};
const valueCol = {
  sm: 18,
  xs: 24,
};

class MassUpdateModal extends Component {
  state = {
    fieldId: PhantomId,
    fieldName: '',
    lookupDisplayKey: '',
    type: '',
    value: '',
  }

  _onCancel = () => {
    const { onCancel } = this.props;
    if (_.isFunction(onCancel)) {
      onCancel();
    }
  }

  _onOk = () => {
    const { onOk, selectedFieldOptions } = this.props;
    if (_.isFunction(onOk)) {
      let { fieldName, type, value } = this.state;
      if (type === Lookup) {
        const { lookupDisplayKey } = this.setState;
        const option = selectedFieldOptions.find(option => option[lookupDisplayKey] === value);
        value = option.id;
      }
      if (type === DateOnly || type === DateTime) {
        value = toUtc(value, type === DateTime);
      }
      onOk(fieldName, value);
    }
  }

  handleFieldChange = (fieldId) => {
    const { columns, setOptions, tryFetchOptionsById } = this.props;
    const column = columns.find(col => col.id === fieldId);
    if (this.state.fieldId !== fieldId) {
      if (column.crm_data_type === Lookup) {
        // fetch options and set
        tryFetchOptionsById(fieldId);
        this.setState({ lookupDisplayKey: column.lookup_own_field_name });
      } else if (column.crm_data_type === PickList) {
        // set options
        setOptions(column.picklists);
      }
    }
    const isDateField = column.crm_data_type === DateOnly || column.crm_data_type === DateTime;
    const value = isDateField ? undefined : '';
    return this.setState({
      fieldId: column.id,
      fieldName: column.field_name,
      type: column.crm_data_type,
      value,
    });
  }

  handleValueChange = (id, value) => this.setState({ value })

  render() {
    const { fieldId, fieldName, lookupDisplayKey, type, value } = this.state;
    const { intl, visible, columns, selectedFieldOptions, theme } = this.props;
    const { formatMessage } = intl;

    // System auto-generate field should not be available to mass update
    const availabelColumns = columns.filter(col => col.is_sys_auto !== 1);
    return (
      <StyledModal
        title={formatMessage({ id: 'global.ui.button.massUpdate' })}
        visible={visible}
        onOk={this._onOk}
        onCancel={this._onCancel}
        okDisabled={fieldId === PhantomId}
        theme={theme}
      >
        <Row className="mb-md">
          <Col
            {...labelCol}
            style={{
              textAlign: 'right',
              lineHeight: 2,
              paddingRight: 17,
            }}
          >
            {formatMessage({ id: 'global.form.field' })}
            <Tooltip title={formatMessage({ id: 'page.objectList.tooltip.field' })}>
              <Icon className="ml-sm icon-thinner font-sm" type="exclamation-circle-o" />
            </Tooltip>
          </Col>
          <Col {...valueCol}>
            <Select
              className="full-width"
              placeholder="Please select a field"
              size="small"
              onChange={this.handleFieldChange}
            >
              {availabelColumns.map(col => (
                <Option key={col.id} value={col.id}>
                  {col.field_label}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        {fieldId !== PhantomId && (
          <CustomField
            id={fieldId}
            label={formatMessage({ id: 'global.form.value' })}
            lookupDisplayKey={lookupDisplayKey}
            name={fieldName}
            options={selectedFieldOptions}
            type={type}
            value={value}
            labelCol={labelCol}
            valueCol={valueCol}
            useDefaultRowCls={false}
            onChange={this.handleValueChange}
            format={type === DateTime
                      ? 'YYYY-MM-DD HH:mm:ss'
                      : 'YYYY-MM-DD'}
          />
        )}
      </StyledModal>
    );
  }
}


const mapStateToProps = ({ objectList }) => ({
  columns: objectList.columns,
  selectedFieldOptions: objectList.selectedFieldOptions,
});
const mapDispatchToProps = {
  setOptions,
  tryFetchOptionsById,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(MassUpdateModal));
