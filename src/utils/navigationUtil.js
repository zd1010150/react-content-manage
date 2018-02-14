export const navLanguage = (function () {
  const language = navigator.language || navigator.browserLanguage;
  return language.indexOf('zh') > -1 ? 'zh' : 'en';
}());
