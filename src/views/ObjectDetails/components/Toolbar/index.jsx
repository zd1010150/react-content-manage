import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row } from 'antd';

import Enums from 'utils/EnumsManager';
import { DetailTopButtons } from 'components/ui/index';
import { setTools, tryDelete } from './flow/actions';


const defaultProps = {
  objectType: Enums.ObjectTypes.Leads,
  objectId: Enums.PhantomID,
  tools: [],
};
const propTypes = {
  objectType: PropTypes.oneOf(Enums.ObjectTypesInArray).isRequired,
  objectId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  tools: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      sequence: PropTypes.number.isRequired,
    })
  ).isRequired,
};


class Toolbar extends Component {
  handleDelete = id => {
    console.log(`deleting id is ${id}`);
    this.props.tryDelete(id, this.props.objectType);
  }

  render () {
    const { objectId, objectType, tools } = this.props;
    return (
      <Row style={{ textAlign:'right', marginBottom: 5 }}>
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
const mapStateToProps = ({ global, objectDetails }) => ({
  language: global.language,
  tools: objectDetails.toolbar.tools,
});
const mapDispatchToProps = {
  tryDelete,
};
export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);