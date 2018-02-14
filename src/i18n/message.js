import global from './global/index';
import page from './page/index';
import { deconstructLanguage } from '../utils/languageHelper';

export default {
  zh: { ...deconstructLanguage(global, 'zh', 'global'), ...deconstructLanguage(page, 'zh', 'page') },
  en: { ...deconstructLanguage(global, 'en', 'global'), ...deconstructLanguage(page, 'en', 'page') },
};
