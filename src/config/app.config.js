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
export const SUCCESS_HTTP_CODE = [200, 201];

export const UNPAIED_ORDER_STATUS = 0; // 未支付的发货单的状态是1
export const CURRENCY_SYMBOL = {
  [CHINA_RMB_CODE]: '￥',
  [AUS_DOLLER_CODE]: '$',
};
export const DEFAULT_DATE_SETTING = {
  OFFSET: '+1100',
  DATE_FORMAT: 'DD-MM-YYYY',
  TIME_FORMAT: 'DD-MM-YYYY HH:mm:ss',
  END_DATE_FORMAT: 'YYYY-MM-DD', // 后端需要的日期格式
  END_TIME_FORMAT: 'YYYY-MM-DD, HH:mm:ss', // 后端需要的时间格式
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
    sm: { span: 6, offset: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
};

export const FORM_FOOTER_CONFIG = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 8,
      offset: 8,
    },
  },
};
export const MINIMUM_YEAR = 1990;
export const DEFAULT_DEPAREMTN = { id: -1, name: 'No Department' };

/* 后端定义 */
export const OBJECT_TYPES = {
  leads: 'leads',
  accounts: 'accounts',
  opportunities: 'opportunities',
};
/* 定义objType和css 样式的映射关系 */
export const objTypeAndClassTypeMap = {
  leads: 'lead',
  accounts: 'account',
  opportunities: 'opport',
};
export const PICKLIST_FIELD_TYPE = 'picklist';
export const MAX_UPLOAD_FILE_SIZE = {
  COMPANY_LOGO: 500 * 1024, // company logo 500 k
  USER_LOGO: 1024 * 1024, // user logo 1m
  DEFAULT: 2 * 1024 * 1024, // 默认2m
};
