export const MAX_FETCH_TIMEOUT = 300 * 1000;// 超时时间为30s
export const HTTP_STATUS_CODE = 200;
export const MAX_PAYABLE_PRICE = 300;

export const CHINA_CODE = 'CN';

export const CHINA_RMB_CODE = 'CNY';
export const AUS_DOLLER_CODE = 'AUD';

export const CHINESE_CODE = 'zh';

export const UNAUTHENTICATION = { // Unauthentication rewrite url
  CODE: 401,
  REWRIRE_URL: '/customer/account/login/',
  REDIRECT_KEY: 'success_url',
};

export const UNPAIED_ORDER_STATUS = 0; // 未支付的发货单的状态是1
export const CURRENCY_SYMBOL = {
  [CHINA_RMB_CODE]: '￥',
  [AUS_DOLLER_CODE]: '$',
};

export const URL_PREFIX = '/admin'; // 配置的url前缀，在magento中,本应用的所有的访问路径前缀
