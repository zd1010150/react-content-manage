import React from 'react';
import classNames from 'classnames/bind';
import { MagentoStaticLink } from 'components/ui/index';
import styles from '../TopPanel.less';

const cx = classNames.bind(styles);
const topStaticNav = () => {
  const nav = [
    { id: 'global.magento.topNav.home', href: '/home' },
    { id: 'global.magento.topNav.contactUs', href: '/contact' },
  ];
  return (<ul className={cx('top-static-nav')}> {nav.map((item, index) => <li key={index}><MagentoStaticLink href={item.href} titleId={item.id} /></li>)}</ul>);
};

export default topStaticNav;
