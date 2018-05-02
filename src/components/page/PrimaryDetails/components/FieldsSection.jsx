/* eslint arrow-parens: ["error", "as-needed"] */
import { Col, Row } from 'antd';
import { CustomField, Section } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Enums from 'utils/EnumsManager';
import {
  setActiveField,
  resetActiveField,
  setFieldValue,
  resetFieldValue,
  tryFetchFieldOptions,
} from '../flow/actions';

const { FieldTypes } = Enums;
const { DateOnly, Display } = FieldTypes;

const propTypes = {
  code: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  columns: PropTypes.number.isRequired,
};


class FieldsSection extends Component {
  // TOGGLE FIELD STATE
  handleDoubleClick = id => this.props.setActiveField(id, this.props.code)
  handleBlur = id => this.props.resetActiveField(id, this.props.code)

  handleChange = (id, value) => this.props.setFieldValue(id, this.props.code, value)

  handleDropdownOpen = (id, options) => {
    if (!options || options.length < 1) {
      const { code, tryFetchFieldOptions } = this.props;
      tryFetchFieldOptions(code, id);
    }
  }

  handleRevertClick = id => this.props.resetFieldValue(id, this.props.code)

  render() {
    const {
      code,
      title,
      fields,
      columns,
    } = this.props;

    const colLayout = {
      sm: Enums.AntdGridMax / columns,
      xs: Enums.AntdGridMax,
    };

    // TODO: refactor to adapt to other column numbers
    const colArray = columns === 2 ? [0, 1] : [0];
    // TODO: will be replaced shortly by props
    const dateFormat = 'YYYY-MM-DD';
    const timeFormat = 'YYYY-MM-DD HH:mm:ss';
    return (
      <Section
        key={code}
        title={title}
        collapsible
      >
        <Row>
          {colArray.map((col, i) => (
            <Col key={i} {...colLayout}>
              {fields.map(field => {
                if (field.position[1] === col) {
                  return (
                    <CustomField
                      key={field.key}
                      {...field}
                      lookupDisplayKey={field.lookupDisplayKey}
                      format={field.type === DateOnly ? dateFormat : timeFormat}
                      type={field.active ? field.type : Display}
                      onBlur={this.handleBlur}
                      onDoubleClick={this.handleDoubleClick}
                      onChange={this.handleChange}
                      onDropdownOpen={this.handleDropdownOpen}
                      onRevertClick={this.handleRevertClick}
                    />
                  );
                }
                return null;
              }, this)}
            </Col>
          ), this)}
        </Row>
      </Section>
    );
  }
}


FieldsSection.propTypes = propTypes;
const mapStateToProps = () => ({});
const mapDispatchToProps = {
  setActiveField,
  resetActiveField,
  setFieldValue,
  resetFieldValue,
  tryFetchFieldOptions,
};
export default connect(mapStateToProps, mapDispatchToProps)(FieldsSection);
