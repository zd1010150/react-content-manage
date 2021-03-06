import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './index.less';
const cx = classNames.bind(styles);

import { SectionTitle, SectionBody } from './index';

const defaultProps = {
  collapsible: false,
};
const propTypes = {
  collapsible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  body: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func, // After being wrapped by HoC, the node will become a function type
  ]),
};

class Section extends Component {
  state = {
    collapsed: false,
  }

  handleClick = e => {
    e.stopPropagation();
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    const { collapsed } = this.state;
    const { title, body, collapsible, style, titleStyle, children } = this.props;
    
    const ChildrenNode = children;
    return (
      <div className={cx('section')} style={style}>
        <SectionTitle
          title={title}
          style={titleStyle}
          onClick={this.handleClick}
          collapsed={collapsed}
          collapsible={collapsible}
        />
        {children && !collapsed && (
          <div className={cx('body')}>
            {typeof children === 'function'
              ? <ChildrenNode />
              : ChildrenNode }
          </div>
        )}
      </div>
    );
  }
};

Section.defaultProps = defaultProps;
Section.propTypes = propTypes;
export default Section;