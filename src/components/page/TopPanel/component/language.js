/* eslint-disable no-script-url */
import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Icon } from 'antd';
import { intlShape, injectIntl } from 'react-intl';
import classNames from 'classnames/bind';
import styles from '../TopPanel.less';

const cx = classNames.bind(styles);

const languageView = ({ intl, onChange, language }) => {
  const { formatMessage } = intl;
  const menu = (
    <Menu>
      <Menu.Item>
        <button className={cx('ant-dropdown-link')} onClick={() => onChange('zh')}>{formatMessage({ id: 'global.language.zh' })}</button>
      </Menu.Item>
      <Menu.Item>
        <button className={cx('ant-dropdown-link')} onClick={() => onChange('en')}>{formatMessage({ id: 'global.language.en' })}</button>
      </Menu.Item>

    </Menu>);
  return (
    <div data-role="language">
      <Dropdown overlay={menu}>
        <button className={cx('ant-dropdown-link')}>
          {formatMessage({ id: `global.language.${language}` })} <Icon type="down" />
        </button>
      </Dropdown>
    </div>
  );
};


languageView.propTypes = {
  language: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

const Language = injectIntl(languageView);
export default Language;
