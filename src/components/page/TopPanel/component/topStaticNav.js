import React from 'react';
import classNames from 'classnames/bind';
import styles from '../TopPanel.less';

const cx = classNames.bind(styles);
const topStaticNav = () => {
  const nav = [
    { id: 'global.magento.topNav.home', href: '/home' },
    { id: 'global.magento.topNav.contactUs', href: '/contact' },
  ];
  return (<ul className={cx('top-static-nav')}> {nav.map((item, index) => <li key={index}><a href={item.href} >{item.id}</a></li>)}</ul>);
};

export default topStaticNav;
