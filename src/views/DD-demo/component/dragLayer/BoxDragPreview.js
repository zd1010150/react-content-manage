import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from './Box';
import shallowEqual from './shallowEqual';

class BoxDragPreview extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)
    );
  }
  getStyle() {
    return {
      display: 'inline-block',
      transform: 'translateY(1px)',
      WebkitTransform: 'translateY(1px)',
    };
  }
  render() {
    const { title, canDrop } = this.props;
    return (
      <div style={this.getStyle()}>
        <Box title={title} canDrop={canDrop} />
      </div>
    );
  }
}

BoxDragPreview.propTypes = {
  title: PropTypes.string.isRequired,
  canDrop: PropTypes.bool,
};

export default BoxDragPreview;
