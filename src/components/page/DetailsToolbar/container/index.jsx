import { Row } from 'antd';
import { DetailTopButtons } from 'components/ui/index';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Enums from 'utils/EnumsManager';
import { reset, tryDeleteEntity } from '../flow/actions';

const { ObjectTypesInArray } = Enums;


const defaultProps = {
  tools: [],
};
const propTypes = {
  objectId: PropTypes.string.isRequired,
  objectType: PropTypes.oneOf(ObjectTypesInArray).isRequired,
  tools: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    sequence: PropTypes.number.isRequired,
  })),
};


class Toolbar extends Component {
  componentDidUpdate() {
    const {
      history,
      objectType,
      deleted,
      reset,
    } = this.props;
    if (deleted) {
      history.push(`/${objectType}`);
      reset();
    }
  }

  handleDelete = id => this.props.tryDeleteEntity(id, this.props.objectType)

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
  reset,
  tryDeleteEntity,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Toolbar));
