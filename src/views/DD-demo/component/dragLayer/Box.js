import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowEqual from './shallowEqual';

const styles = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  cursor: 'move',
};

class Box extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)
    );
  }

  render() {
    const { title, canDrop } = this.props;
    const backgroundColor = canDrop ? 'green' : 'red';

    return <div style={{ ...styles, backgroundColor }}>{title}</div>;
  }
}
Box.propTypes = {
  title: PropTypes.string.isRequired,
  canDrop: PropTypes.bool,
};
export default Box;
