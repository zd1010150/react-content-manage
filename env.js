// 不同环境需要配置不同的URL
module.exports = {
  // API_URL  : "http://api.cloudhubpanellocal.com/v1",
  //API_URL: 'http://api.breakabletest.com/v1', // 测试环境
  API_URL : "https://api.staging.breakable.com/v1",//staging环境
  // API_URL : "https://api.cloudhubpanel.com/v1"//线上环境
  //MAGENTO_DOMAIN: 'http://affiliate.breakabletest.com', // 本地开发环境
  // MAGENTO_DOMAIN: "http://breakabletest.com", // 测试环境
  MAGENTO_DOMAIN: "https://affiliate.staging.breakable.com", // staging环境
  // MAGENTO_DOMAIN: "http://www.breakable.com", // 线上环境

};

