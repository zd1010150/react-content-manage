import React from 'react';

import { Icon } from 'antd';
import classNames from 'classnames/bind';
import styles from '../Footer.less';

import payment from 'assets/images/payment.png';

const cx = classNames.bind(styles);
const Footer = () => {
  const footerImformation = [
    { id: 'global.magento.footerInformation.return', href: '/return' },
    { id: 'global.magento.footerInformation.delivery', href: '/delivery' },
  ];
  const footerOurOffers = [
    { id: 'global.magento.footerOurOffers.newProduct', href: '/newProduct' },
    { id: 'global.magento.footerOurOffers.topSeller', href: '/topSeller' },
    { id: 'global.magento.footerOurOffers.special', href: '/special' },
  ];
  return (
    <div className={classNames('row', cx('footer-container'))}>
      <div className="col-sm-3 col-md-3">
        <div className="section">
          <div className="section-title">
            <h2 className={cx('footer-title')}>About Breakable</h2>
          </div>
          <div className="section-content">
            <p>
              Founded in Sydney Australia in 2017, Breakable provides an end to end e-commerce
              and fast goods supply solutions to retailers and consumers Australia
              wide and globally.
              Breakable prides itself in delivering the highest standards in the procurement
              of Australia’s leading Beauty,
              Healthcare, Skin Care, and Baby Products, ensuring that only the
              best products are delivered directly to our
              end-consumers.
            </p>
          </div>
        </div>
      </div>
      <div className="col-sm-3 col-md-3">
        <div className="section">
          <div className="section-title">
            <h2 className={cx('footer-title')}>Information</h2>
          </div>
          <div className="section-content">
            <ul className={cx('footer-ul')}>
              {
                footerImformation.map((item, index) => (
                  <li key={index}><a href={item.href} >{item.id}</a> </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
      <div className="col-sm-3 col-md-3">
        <div className="section">
          <div className="section-title">
            <h2 className={cx('footer-title')}>Information</h2>
          </div>
          <div className="section-content">
            <ul className={cx('footer-ul')}>
              {
                footerOurOffers.map((item, index) => (
                  <li key={index}><a href={item.href} >{item.id}</a></li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
      <div className="col-sm-3 col-md-3">
        <div className="section">
          <div className="section-title">
            <h2 className={cx('footer-title')}>Get in touch</h2>
          </div>
          <div className="section-content">
            <p><Icon type="home" /> Unit 4, Level 4 436-484 Victoria Road Gladesville NSW 2111</p>
            <p> <Icon type="phone" /> +61 2 8188 2488</p>
            <p>
              <Icon type="mail" /> <a href="mailto:info@breakable.com">info@breakable.com</a>
            </p>
            <p><img src={payment} alt="" /></p>
          </div>
        </div>

      </div>
    </div>
  );
};
export default Footer;
