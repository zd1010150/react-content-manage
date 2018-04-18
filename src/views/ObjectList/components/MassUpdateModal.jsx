import { Col, Row, Select } from 'antd';
import { CustomField, StyledModal } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import Enums from 'utils/EnumsManager';
import { setOptions, tryFetchOptionsById } from '../flow/actions';
const { Option } = Select;
const { FieldTypes, PhantomId } = Enums;
const { Lookup, PickList } = FieldTypes;


const defaultProps = {
};
const propTypes = {
  intl: intlShape.isRequired,
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
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

  _onCancel = $ => {
    const { onCancel } = this.props;
    if (_.isFunction(onCancel)) {
      onCancel();
    }
  }

  _onOk = $ => {
    const { onOk, selectedFieldOptions } = this.props;
    if (_.isFunction(onOk)) {
      let { fieldName, lookupDisplayKey, type, value } = this.state;
      if (type === Lookup) {
        const option = selectedFieldOptions.find(option => option[lookupDisplayKey] === value);
        value = option.id;
      }
      onOk(fieldName, value);
    }
  }

  handleFieldChange = fieldId => {
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
    return this.setState({
      fieldId: column.id,
      fieldName: column.field_name,
      type: column.crm_data_type,
      value: '',
    });
  }

  handleValueChange = (id, value) => this.setState({ value })

  render () {
    const { fieldId, fieldName, lookupDisplayKey, type, value } = this.state;
    const { intl, visible, columns, selectedFieldOptions } = this.props;
    const { formatMessage } = intl;

    return (
      <StyledModal
        title={formatMessage({ id: `global.ui.button.massUpdate` })}
        visible={visible}
        onOk={this._onOk}
        onCancel={this._onCancel}
      >
        <Row className="mb-md">
          <Col
            {...labelCol}
            style={{
              textAlign: 'right',
              lineHeight: 2,
              paddingRight: 24,
            }}
          >
            {formatMessage({ id: `global.form.field` })}
          </Col>
          <Col {...valueCol}>
            <Select
              className="full-width"
              placeholder="Please select a field"
              size="small"
              onChange={this.handleFieldChange}
            >
              {columns.map(col =>
                <Option key={col.id} value={col.id}>
                  {col.field_label}
                </Option>
              )}
            </Select>
          </Col>
        </Row>
        {fieldId !== PhantomId && (
          <CustomField
            id={fieldId}
            label={formatMessage({ id: `global.form.value` })}
            lookupDisplayKey={lookupDisplayKey}
            name={fieldName}
            options={selectedFieldOptions}            
            type={type}
            value={value}
            labelCol={labelCol}
            valueCol={valueCol}
            useDefaultRowCls={false}
            onChange={this.handleValueChange}            
          />
        )}
      </StyledModal>
    );
  }
};


const mapStateToProps = ({ objectList }) => ({
  columns: objectList.columns,
  selectedFieldOptions: objectList.selectedFieldOptions,
});
const mapDispatchToProps = {
  setOptions,
  tryFetchOptionsById,
};
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MassUpdateModal));