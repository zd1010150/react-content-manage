import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from './Box';
import { MODULES, TOOLS, SECTIONS, OPERATES } from '../../../flow/edit/operateType';
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
    const {
      title, canDrop, type, theme,
    } = this.props;
    return (
      <div style={this.getStyle()}><Box title={title} canDrop={canDrop} type={type} theme={theme} /></div>
    );
  }
}

BoxDragPreview.propTypes = {
  title: PropTypes.string.isRequired,
  canDrop: PropTypes.bool,
  type: PropTypes.oneOf(OPERATES),
  theme: PropTypes.string.isRequired,
};

export default BoxDragPreview;
