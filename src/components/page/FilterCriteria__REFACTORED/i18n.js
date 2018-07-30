export default {
  zh: {
    field: '字段',
    condition: '条件',
    value: '字段值',
    valueTip: '使用逗号可以分隔多个筛选条件，但不适用于日期或时间选择器',
    condTip: '不同条件适用于不同类型的字段',
    emptyMsg: '请先从左侧选择任一字段',
    logic: '筛选逻辑',
    errors: {
      incorrectType: '筛选逻辑或筛选规则类型有误！',
      displayNumMissing: '缺少相应的筛选规则编号！',
      incorrectLetter: '包含非法字符！只能由数字，空格，AND，OR以及小括号组成',
    },
  },
  en: {
    field: 'Field',
    condition: 'Condition',
    value: 'Value',
    valueTip: 'Use comma to separate filter rules except for Date or Datetime field.',
    condTip: 'Different type of fields work with different conditions set.',
    emptyMsg: 'Please select a field firstly on the left-hand side.',
    logic: 'Condition Logic',
    errors: {
      incorrectType: 'Logic or Criteria are with incorrect type!',
      displayNumMissing: 'Some display nums are absent from the logic!',
      incorrectLetter: 'Invalid Letter! Only digit, space, AND, OR and brackets are allowed.',
    },
  },
};
