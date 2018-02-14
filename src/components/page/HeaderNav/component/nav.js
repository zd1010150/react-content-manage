/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'antd';
import classNames from 'classnames/bind';

import styles from '../HeaderNav.less';

const cx = classNames.bind(styles);
const { SubMenu } = Menu;
const navView = ({ language }) => {
  const category = [{
    title: 'Women',
    url: '/women',
    children: [{
      title: 'Tshirt',
      url: '/women/tshirt',
    }, {
      title: 'Skirt',
      url: '/women/skirt',
      children: [{
        title: 'Long Skirt',
        url: '/women/skirt/long-skirt',
      }, {
        title: 'Short Skirt',
        url: '/women/skirt/short-skirt',
      }],
    }],
  }, {
    title: 'Men',
    url: '/men',
  }, {
    title: 'Sports',
    url: '/sports',
    children: [{
      title: 'Baskateball',
      url: '/sports/baskateball',
    }, {
      title: 'Tennis',
      url: '/sports/tennis',
    }],
  }];
  const goToSubmenu = (href) => {
    window.location.href = "";
  };
  const getChildrenTree = (item) => {
    if (item.children && item.children.length > 0) {
      return (
        <SubMenu
          title={item.title}
          key={item.url}
          onTitleClick={({ key }) => { goToSubmenu(key); }}
        >
          { item.children.map(cItem => getChildrenTree(cItem))}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={item.url}>
        <a href={item.href} >{item.id}</a>
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
