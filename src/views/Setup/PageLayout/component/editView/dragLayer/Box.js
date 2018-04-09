import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowEqual from './shallowEqual';
import { Panel } from 'components/ui/index';
import { Button } from 'antd';

import { ItemTypes } from '../../../flow/edit/itemType';

const styles = {
  padding: '0.5rem 1rem',
  cursor: 'move',
};

class Box extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)
    );
  }
  getPreviewImg(operateType, title, theme) {
    switch (operateType) {
      case ItemTypes.TOOL:
      case ItemTypes.SECTION_FIELD:
        return (<Button size="small" className={`${theme}-theme-btn`} >{title}</Button>);
      case ItemTypes.MODULE:
      default:
        return (<Panel panelClasses={`${theme}-theme-panel`} panelTitle={title} />);
    }
  }
  render() {
    const {
      title, canDrop, type, theme,
    } = this.props;
    const backgroundColor = canDrop ? 'green' : 'red';

    return <div>{this.getPreviewImg(type, title, theme)}</div>;
  }
}
Box.propTypes = {
  title: PropTypes.string.isRequired,
  canDrop: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(Object.keys(ItemTypes)).isRequired,
  theme: PropTypes.string.isRequired,
};
export default Box;
