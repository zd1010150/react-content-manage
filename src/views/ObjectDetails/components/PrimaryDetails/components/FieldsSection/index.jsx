import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

import { Section, CustomField } from 'components/ui/index';
import Enums from 'utils/EnumsManager';
import { setActiveField, resetActiveField, setFieldValue, resetFieldValue } from '../../flow/actions';

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

  handleChange = (id, value) => {
    console.log(`changing fieldId: ${id} and its value -> ${value}`);
    const { code, setFieldValue } = this.props;
    setFieldValue(code, id, value);
  }

  handleDoubleClick = id => {
    const { code, setActiveField } = this.props;
    setActiveField(code, id);
  }

  handleRevertClick = id => {
    const { code, resetFieldValue } = this.props;
    resetFieldValue(code, id);
  }

  render() {
    const { code, title, fields, columns } = this.props;
    const colLayout = {
      sm: Enums.AntdGridMax / columns,
      xs: Enums.AntdGridMax,
    };

    return (
      <Section
        key={code}
        title={title}
        collapsible
      >
        <Row>
          {fields.map((field, i) => (
            <Col key={i} {...colLayout}>
              <CustomField
                {...field}
                type={field.active ? field.type : Enums.FieldTypes.Display}
                onChange={this.handleChange}
                onDoubleClick={this.handleDoubleClick}
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
const mapStateToProps = ({ objectDetails }) => ({
  data: objectDetails.primaryDetails.data,
});
const mapDispatchToProps = {
  setActiveField,
  resetActiveField,
  setFieldValue,
  resetFieldValue,
};
export default connect(mapStateToProps, mapDispatchToProps)(FieldsSection);