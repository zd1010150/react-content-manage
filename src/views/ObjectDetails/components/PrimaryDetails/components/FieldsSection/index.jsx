import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

import { Section, CustomField } from 'components/ui/index';
import Enums from 'utils/EnumsManager';
const { DateOnly, Display } = Enums.FieldTypes;
import {
  setActiveField,
  resetActiveField,
  setFieldValue,
  resetFieldValue,
  tryFetchFieldOptions,
} from '../../flow/actions';

const defaultProps = {
  code: 'code',
  title: 'Default Section Title',
  fields: [],
  columns: 1,
};
const propTypes = {
  code: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  columns: PropTypes.number.isRequired,
};


class FieldsSection extends Component {
  handleBlur = $ => this.props.resetActiveField()

  handleChange = (id, value) => this.props.setFieldValue(this.props.code, id, value)

  handleDoubleClick = id => this.props.setActiveField(this.props.code, id)

  handleDropdownOpen = (id, options) => {
    if (!options || options.length < 1) {
      const { code, tryFetchFieldOptions } = this.props;
      tryFetchFieldOptions(code, 1);
    }
  }

  handleRevertClick = id => this.props.resetFieldValue(this.props.code, id)

  render() {
    const { code, title, fields, columns } = this.props;
    const colLayout = {
      sm: Enums.AntdGridMax / columns,
      xs: Enums.AntdGridMax,
    };

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
          {fields.map((field, i) => (
            <Col key={field.key} {...colLayout}>
              <CustomField
                key={field.key}
                {...field}
                lookupDisplayKey={'name'}
                format={field.type === DateOnly ? dateFormat : timeFormat}
                type={field.active ? field.type : Display}
                onChange={this.handleChange}
                onDoubleClick={this.handleDoubleClick}
                onDropdownOpen={this.handleDropdownOpen}
                onRevertClick={this.handleRevertClick}
                onBlur={this.handleBlur}
              />
            </Col>
          ), this)}
        </Row>
      </Section>
    );
  }
}


FieldsSection.defaultProps = defaultProps;
FieldsSection.propTypes = propTypes;
const mapStateToProps = ({ global, objectDetails }) => ({
  language: global.language,
  data: objectDetails.primaryDetails.data,
  // TODO: find global setting / companyinfo for date/datetime format
});
const mapDispatchToProps = {
  setActiveField,
  resetActiveField,
  setFieldValue,
  resetFieldValue,
  tryFetchFieldOptions,
};
export default connect(mapStateToProps, mapDispatchToProps)(FieldsSection);