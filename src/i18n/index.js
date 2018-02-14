import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LocaleProvider } from 'antd';
import en from 'antd/lib/locale-provider/en_US';
import zh from 'antd/lib/locale-provider/zh_CN';

import { addLocaleData, IntlProvider } from 'react-intl';
import zhLocaleData from 'react-intl/locale-data/zh';
import message from './message';

addLocaleData(zhLocaleData);
const i18n = ({ children, locale }) => <LocaleProvider locale={locale === 'zh' ? zh : en}><IntlProvider locale={locale} key={locale} messages={message[locale]}>{ children }</IntlProvider></LocaleProvider>;


i18n.propTypes = {
  children: PropTypes.element.isRequired,
  locale: PropTypes.string.isRequired,
};
function mapStateToProps(state) {
  // const { lang, messages } = state.locales;

  return { locale: state.global.language };
}
const I18n = connect(mapStateToProps)(i18n);
export default I18n;
