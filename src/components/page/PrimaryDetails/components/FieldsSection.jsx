/* eslint arrow-parens: ["error", "as-needed"] */
import { Col, Row } from 'antd';
import { CustomField, Section } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Enums from 'utils/EnumsManager';

const { FieldTypes } = Enums;
const { DateOnly, Display } = FieldTypes;

const propTypes = {
  code: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  columns: PropTypes.number.isRequired,
};


class FieldsSection extends Component {
  // handleBlur = () => this.props.resetActiveField()

  // handleChange = (id, value) => this.props.setFieldValue(this.props.code, id, value)

  // handleDoubleClick = id => this.props.setActiveField(this.props.code, id)

  // handleDropdownOpen = (id, options) => {
  //   if (!options || options.length < 1) {
  //     const { code, tryFetchFieldOptions } = this.props;
  //     tryFetchFieldOptions(code, id);
  //   }
  // }

  // handleRevertClick = id => this.props.resetFieldValue(this.props.code, id)

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
                      onChange={this.handleChange}
                      onDoubleClick={this.handleDoubleClick}
                      onDropdownOpen={this.handleDropdownOpen}
                      onRevertClick={this.handleRevertClick}
                      onBlur={this.handleBlur}
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
  // setActiveField,
  // resetActiveField,
  // setFieldValue,
  // resetFieldValue,
  // tryFetchFieldOptions,
};
export default connect(mapStateToProps, mapDispatchToProps)(FieldsSection);
