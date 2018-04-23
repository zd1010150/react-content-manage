import { Row } from 'antd';
import { DetailTopButtons } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Enums from 'utils/EnumsManager';
import { tryDeleteEntity } from './flow/actions';

const { ObjectTypesInArray } = Enums;


const defaultProps = {
  tools: [],
};
const propTypes = {
  objectType: PropTypes.oneOf(ObjectTypesInArray).isRequired,
  objectId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  tools: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    sequence: PropTypes.number.isRequired,
  })),
};


class Toolbar extends Component {
  handleDelete = id => this.props.tryDeleteEntity(this.props.objectType, id)

  render() {
    const { objectId, objectType, tools } = this.props;
    return (
      <Row style={{ textAlign: 'right', marginBottom: 5 }}>
        <DetailTopButtons
          id={objectId}
          type={objectType}
          tools={tools}
          onDelete={this.handleDelete}
        />
      </Row>
    );
  }
}


Toolbar.defaultProps = defaultProps;
Toolbar.propTypes = propTypes;
const mapStateToProps = ({ global }) => ({
  language: global.language,
});
const mapDispatchToProps = {
  tryDeleteEntity,
};
export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
