/**
 * 配置后端
 */

import { domainReg } from 'utils/regex';

// http://api.finlogixtest.com/v1/admin/login?email=steven.hu@zerologix.com&password=acy11111111&captcha=jh4hn
// "http://api.cloudhubpanellocal.com/api/v1"

const baseUrl = process.env.__API_URL__;
const apiDomain = domainReg.exec(baseUrl)[0];
const cmsUrl = `${window.location.host}/admin/CMS?id=`;
export {
  baseUrl,
  apiDomain,
  cmsUrl,
};
