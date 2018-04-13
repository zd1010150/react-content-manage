/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

import styles from '../HeaderNav.less';

const cx = classNames.bind(styles);
const navView = ({ }) => {
  const category = [{
    title: 'dd-demo',
    url: '/dd-demo',
  }];

  const getChildrenTree = (item) => {
    return (
      <Menu.Item key={item.url}>
        <NavLink to={item.url}>{ item.title }</NavLink>
      </Menu.Item>);
  };
  return (
    <Menu mode="horizontal" className={cx('nav')}>
      {
        category.map(item => getChildrenTree(item))
      }
    </Menu>
  );
};


navView.propTypes = {
  language: PropTypes.string.isRequired,

};


export default navView;
