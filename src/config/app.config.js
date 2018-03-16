export const MAX_FETCH_TIMEOUT = 300 * 1000;// 超时时间为30s
export const HTTP_STATUS_CODE = 200;
export const MAX_PAYABLE_PRICE = 300;

export const CHINA_CODE = 'CN';

export const CHINA_RMB_CODE = 'CNY';
export const AUS_DOLLER_CODE = 'AUD';

export const CHINESE_CODE = 'zh';

export const UNAUTHENTICATION = { // Unauthentication rewrite url
  CODE: 401,
  LOGIN_URL: '/',
  REDIRECT_KEY: 'success_url',
};

export const UNPAIED_ORDER_STATUS = 0; // 未支付的发货单的状态是1
export const CURRENCY_SYMBOL = {
  [CHINA_RMB_CODE]: '￥',
  [AUS_DOLLER_CODE]: '$',
};
export const PAGE_ACTION = {
  ADD: 'add',
  EDIT: 'edit',
  VIEWALL: 'viewAll',
  VIEWDETAIL: 'viewDetail',
};
export const URL_PREFIX = '/admin'; // 配置的url前缀，在magento中,本应用的所有的访问路径前缀


export const FORM_LAYOUT_CONFIG = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

export const FORM_FOOTER_CONFIG = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 6,
    },
  },
};
export const MINIMUM_YEAR = 1990;
export const DEFAULT_DEPAREMTN = { id: -1, name: 'No Department' };