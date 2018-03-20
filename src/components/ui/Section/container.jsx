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

  handleClick = () => this.setState({
    collapsed: !this.state.collapsed
  })

  render() {
    const { collapsed } = this.state;
    const { title, body, collapsible } = this.props;
    
    return (
      <div className={cx('section')}>
        <SectionTitle
          title={title}
          onClick={this.handleClick}
          collapsed={collapsed}
          collapsible={collapsible}
        />
        {body && !collapsed && <SectionBody body={body} />}
      </div>
    );
  }
};

Section.defaultProps = defaultProps;
Section.propTypes = propTypes;
export default Section;