import formField from 'i18n/global/form';
import { phoneReg, zipCodeReg, idNumberReg, passwordReg } from 'utils/regex';
// 定义所有校验规则的错误信息
const errorMessages = (() => {
  const zhMessages = {
    default: field => `${field} 校验失败`,
    after: (field, [target]) => ` ${field}必须在${target}之后`,
    alpha_dash: field => ` ${field}能够包含字母数字字符，包括破折号、下划线`,
    alpha_num: field => `${field} 只能包含字母数字字符.`,
    alpha_spaces: field => ` ${field} 只能包含字母字符，包括空格.`,
    alpha: field => ` ${field} 只能包含字母字符.`,
    before: (field, [target]) => ` ${field} 必须在${target} 之前.`,
    confirmed: (field, [confirmedField]) => ` ${field} 不能和${confirmedField}匹配.`,
    date_between: (field, [min, max]) => ` ${field}必须在${min}和${max}之间.`,
    date_format: (field, [format]) => ` ${field}必须在在${format}格式中.`,
    decimal: (field, [decimals] = ['*']) => ` ${field} 必须是数字的而且能够包含${decimals === '*' ? '' : decimals} 小数点.`,
    digits: (field, [length]) => ` ${field} 必须是数字，且精确到 ${length}数`,
    dimensions: (field, [width, height]) => ` ${field}必须是 ${width} 像素到 ${height} 像素.`,
    email: field => ` ${field} 必须是有效的邮箱.`,
    ext: field => ` ${field} 必须是有效的文件.`,
    image: field => ` ${field} 必须是图片.`,
    in: field => ` ${field} 必须是一个有效值.`,
    ip: field => ` ${field} 必须是一个有效的地址.`,
    max: (field, [length]) => ` ${field} 不能大于${length}字符.`,
    mimes: field => ` ${field} 必须是有效的文件类型.`,
    min: (field, [length]) => ` ${field} 必须至少有 ${length} 字符.`,
    not_in: field => ` ${field}必须是一个有效值.`,
    numeric: field => ` ${field} 只能包含数字字符.`,
    regex: field => ` ${field}格式无效.`,
    required: field => `${field}是必须的.`,
    size: (field, [size]) => ` ${field} 必须小于 ${size} KB.`,
    url: field => ` ${field}不是有效的url.`,
  };
  const enMessages = {
    default: field => `${field} validated fail`,
    after: (field, [target]) => ` ${field}必须在${target}之后`,
    alpha_dash: field => ` ${field}能够包含字母数字字符，包括破折号、下划线`,
    alpha_num: field => `${field} 只能包含字母数字字符.`,
    alpha_spaces: field => ` ${field} 只能包含字母字符，包括空格.`,
    alpha: field => ` ${field} 只能包含字母字符.`,
    before: (field, [target]) => ` ${field} 必须在${target} 之前.`,
    confirmed: (field, [confirmedField]) => ` ${field} 不能和${confirmedField}匹配.`,
    date_between: (field, [min, max]) => ` ${field}必须在${min}和${max}之间.`,
    date_format: (field, [format]) => ` ${field}必须在在${format}格式中.`,
    decimal: (field, [decimals] = ['*']) => ` ${field} 必须是数字的而且能够包含${decimals === '*' ? '' : decimals} 小数点.`,
    digits: (field, [length]) => ` ${field} 必须是数字，且精确到 ${length}数`,
    dimensions: (field, [width, height]) => ` ${field}必须是 ${width} 像素到 ${height} 像素.`,
    email: field => ` ${field} should be valid email address.`,
    ext: field => ` ${field} 必须是有效的文件.`,
    image: field => ` ${field} 必须是图片.`,
    in: field => ` ${field} 必须是一个有效值.`,
    ip: field => ` ${field} 必须是一个有效的地址.`,
    max: (field, [length]) => ` ${field} can't more than ${length} characters.`,
    mimes: field => ` ${field} 必须是有效的文件类型.`,
    min: (field, [length]) => ` ${field} at least includes ${length} characters.`,
    not_in: field => ` ${field}必须是一个有效值.`,
    numeric: field => ` ${field} 只能包含数字字符.`,
    regex: field => ` ${field}格式无效.`,
    required: field => `${field} is required.`,
    size: (field, [size]) => ` ${field} 必须小于 ${size} KB.`,
    url: field => ` ${field}不是有效的url.`,
  };
  const setMessage = (ruleName, zhMsg, enMsg) => {
    Object.assign(zhMessages, zhMsg);
    Object.assign(enMessages, enMsg);
  };
  const getMessages = language => (language === 'zh' ? zhMessages : enMessages);
  return {
    setMessage,
    getMessages,
  };
})();


/**
 * 注册rule错误信息
 * @param ruleName
 * @param zhMsg
 * @param enMsg
 */
const registerMessage = (ruleName, zhMsg, enMsg) => {
  errorMessages.setMessage(ruleName, zhMsg, enMsg);
};
/**
 * 根据字段名获取错误信息
 * @param ruleName 所有的在errorMessage中定义的rule名
 * @param args errormsg中除了字段名以外的其他参数，创给errormessage调用的
 * @param field 字段名，都定义在'src/i18n/global/form'中
 * @param language 语言
 */
const getErrorMsg = (ruleName, field, language, args = {}) => {
  const messages = errorMessages.getMessages(language);
  const formFields = formField[language];
  const filedName = formFields[field];
  return messages[ruleName](filedName, ...args);
};
/**
 * 获取已有校验规则的local化错误信息
 * @param ruleName https://ant.design/components/form-cn/#校验规则
 * @param args errormsg中除了字段名以外的其他参数，创给errormessage调用的,或者校验规则本身的一些参数，例如pattern需要一个正则表达式等，在需要的情况下自己补充getExistRule
 * @param field 字段名，都定义在'src/i18n/global/form'中
 * @param language 语言
 * @returns {*}
 */
const getExistRule = (ruleName, field, language, args) => {
  const messages = errorMessages.getMessages(language);
  const formFields = formField[language];
  const filedName = formFields[field];
  switch (ruleName) {
    case 'required':
      return {
        required: args.required,
        message: messages.required(filedName),
      };
    case 'min':
      return {
        min: args.min,
        message: messages.min(filedName, args.min),
      };
    case 'email':
      return {
        type: 'email',
        message: messages.email(filedName),
      };
    default:
      return {
        message: messages.default(filedName),
      };
  }
};

const registerRule = ({
  ruleName, zhMsg, enMsg, validator,
}) => {
  registerMessage(ruleName, zhMsg, enMsg);
  return validator;
};
const between = (() => {
  const zhMsg = { between: (field, min, max) => ` ${field} 必须在${min} 到 ${max}字符之间.` };
  const enMsg = { between: (field, min, max) => ` ${field} should between ${min} and ${max}.` };
  return {
    zhMsg,
    enMsg,
    ruleName: 'between',
    validator: (min, max, language) => (rule, value = '', callback) => {
      const val = value.trim();
      if (val.length < 1) {
        callback();
      } else if (val.length < min || val.length > max) {
        callback(getErrorMsg('between', rule.field, language, [min, max]));
      } else {
        callback();
      }
    },
  };
})();
const phone = (() => {
  const zhMsg = { phone: () => '电话号码不合法.' };
  const enMsg = { phone: () => 'it is invalid phone number.' };
  return {
    zhMsg,
    enMsg,
    ruleName: 'phone',
    validator: language => (rule, value = '', callback) => {
      const val = value.trim();
      if (val.length < 1) {
        callback();
      } else if (!phoneReg.test(val)) {
        callback(getErrorMsg('phone', rule.field, language));
      } else {
        callback();
      }
    },
  };
})();
const zipCode = (() => {
  const zhMsg = { zipCode: () => '邮政编码不合法.' };
  const enMsg = { zipCode: () => 'it is invalid ZIP Code.' };
  return {
    zhMsg,
    enMsg,
    ruleName: 'zipCode',
    validator: language => (rule, value = '', callback) => {
      const val = value.trim();
      if (val.length < 1) {
        callback();
      } else if (!zipCodeReg.test(val)) {
        callback(getErrorMsg('zipCode', rule.field, language));
      } else {
        callback();
      }
    },
  };
})();
const idNumber = (() => {
  const zhMsg = { idNumber: () => '身份证号码不合法.' };
  const enMsg = { idNumber: () => 'it is invalid ID Number.' };
  return {
    zhMsg,
    enMsg,
    ruleName: 'idNumber',
    validator: language => (rule, value = '', callback) => {
      const val = value.trim();
      if (val.length < 1) {
        callback();
      } else if (!idNumberReg.test(val)) {
        callback(getErrorMsg('idNumber', rule.field, language));
      } else {
        callback();
      }
    },
  };
})();
const password = (() => {
  const zhMsg = { password: () => '密码必须包含大小写字母, 数字,至少8个字符' };
  const enMsg = { password: () => 'Should include upper and lower letters and numbers.At least 8 letters.' };
  return {
    zhMsg,
    enMsg,
    ruleName: 'password',
    validator: language => (rule, value = '', callback) => {
      const val = value.trim();
      if (val.length < 1) {
        callback();
      } else if (val.length < 8 || (!passwordReg.test(val))) {
        callback(getErrorMsg('password', rule.field, language));
      } else {
        callback();
      }
    },
  };
})();

const validator = {
  between: registerRule(between),
  phone: registerRule(phone),
  zipCode: registerRule(zipCode),
  idNumber: registerRule(idNumber),
  password: registerRule(password),
};
export { getExistRule, getErrorMsg, validator };
