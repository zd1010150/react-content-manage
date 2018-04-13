import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from './Box';
import shallowEqual from './shallowEqual';

class BoxDragPreview extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = {
      tickTock: false,
    };
  }
  componentDidMount() {
    this.interval = setInterval(this.tick, 500);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)
    );
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getStyle() {
    return {
      display: 'inline-block',
      transform: 'rotate(-7deg)',
      WebkitTransform: 'rotate(-7deg)',
    };
  }
  tick() {
    this.setState({
      tickTock: !this.state.tickTock,
    });
  }
  render() {
    const { title, canDrop } = this.props;
    const { tickTock } = this.state;

    return (
      <div style={this.getStyle()}>
        <Box title={title} yellow={tickTock} canDrop={canDrop} />
      </div>
    );
  }
}

BoxDragPreview.propTypes = {
  title: PropTypes.string.isRequired,
  canDrop: PropTypes.bool,
};

export default BoxDragPreview;
