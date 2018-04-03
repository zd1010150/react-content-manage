import { OBJECT_TYPES } from 'config/app.config';


const { leads, accounts, opportunities } = OBJECT_TYPES;

export const objectTypeRelations = { // define the relationship
  [leads]: {
    to: [accounts, opportunities],
    from: [],
  },
  [accounts]: {
    from: [leads],
    to: [opportunities],
  },
  [opportunities]: {
    from: [leads, accounts],
    to: [],
  },
};

export const types = {
  picklist: {
    label: 'Picklist',
    describe: {
      en: 'Field allows to be picked in selected value',
      zh: '字段取值只能是枚举类型',
    },
  },
  text: {
    label: 'Text',
    describe: {
      en: 'Fields to be in form of letters and numbers',
      zh: '文本',
    },
  },
  email: {
    label: 'Email',
    describe: {
      zh: '邮件地址',
      en: 'Automatically detects email format',
    },
  },
  datetime: {
    label: 'Date/Time',
    describe: {
      zh: '所在国家的时间格式，24小时制',
      en: 'Date within accordance with country format, time is in 24 hours',
    },
  },
  date: {
    label: 'Date',
    describe: {
      zh: '所在国家的时间格式',
      en: 'Date within accordance with country format',
    },
  },
  number: {
    label: 'Number',
    describe: {
      zh: '数字',
      en: 'Field to be in form of numbers',
    },
  },
  long_text: {
    label: 'Long Text',
    describe: {
      zh: '长文本',
      en: 'Field for description',
    },
  },
};
export const fieldCategory = {
  MAIN: 'main',
  CUSTOM: 'cstm',
};
