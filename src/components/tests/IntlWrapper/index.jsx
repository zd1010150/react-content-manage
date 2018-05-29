import { LocaleProvider } from 'antd';
import en from 'antd/lib/locale-provider/en_US';
import zh from 'antd/lib/locale-provider/zh_CN';
import message from 'i18n/message';
import React from 'react';
import { IntlProvider } from 'react-intl';

const IntlWrapper = ({ locale, children }) => (
  <LocaleProvider locale={locale === 'zh' ? zh : en}>
    <IntlProvider locale={locale} messages={message[locale]}>
      { ...children }
    </IntlProvider>
  </LocaleProvider>
);

export default IntlWrapper;
