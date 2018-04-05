import Enums from 'utils/EnumsManager';
const {
  Convert,
  Delete,
  Sharing,
  FindDuplicates,
} = Enums.DetailTools;
const {
  TaskOpen,
  TaskHistory,
  EmailSent,
  Attachments,
  Logs,
} = Enums.DetailModules;

export default {
  zh: {
    button: {
      cancel: '取消',
      ok: '确认',
      submit: '提交',
      addBtn: '新增{actionType}',
      upload: '上传',
      view: '查看{actionType}',
      select: '选择',
      addGoodsToCart: '加入发货车',
      delete: '删除',
      edit: '编辑',
      addGoods: '添加商品',
      save: '保存',
      search: '搜索',
      pay: '支付',
      next: '下一步',
      previous: '上一步',
      detail: '查看详情',
      goBack: '返回',
      createNew: '添加',
      update: '更新',
      massUpdate: '批量更新',
      massDelete: '批量删除',
      addToCampaign: '添加到营销活动',
      replace: '替换',
    },
    input: {
      searchStore: '在此搜索全站商品...',
      searchUser: '输入用户名搜索...',
      inputIdNumber: '请输入合法的身份证号',
    },
    table: {
      action: '操作',
    },
    select: {
      label: '视图',
      all: '全部',
    },
    dialog: {
      info: '提示',
      warning: '警告',
      deleteTitle: '确定删除这条记录',
    },
    tree: {
      default: '默认部门',
    },
    labels: {
      viewName: '视图名称',
    },
    errors: {
      inputRequired: '必填项',
    },
    criteria: {
      field: '字段',
      condition: '条件',
      value: '值',
    },
    detailTools: {
      Convert: '转化',
      Delete: '删除',
      Sharing: '分享给其他用户',
      FindDuplicates: '查询重复客户',
    },
    detailModules: {
      TaskOpen: '未完成的任务',
      TaskHistory: '任务历史',
      EmailSent: '已发送的邮件',
      Attachments: '附件',
      Logs: '日志',
    },
  },
  en: {
    button: {
      cancel: 'Cancel',
      ok: 'OK',
      submit: 'Submit',
      addBtn: 'Add {actionType}',
      upload: 'Upload',
      view: 'View {actionType}',
      select: 'Select',
      addGoodsToCart: 'Add to Cart',
      delete: 'Delete',
      edit: 'Edit',
      addGoods: 'Add Goods',
      save: 'Save',
      search: 'Search',
      pay: 'Pay',
      next: 'Next',
      previous: 'Previous',
      detail: 'Detail',
      goBack: 'Go Back',
      createNew: 'Create New ',
      update: 'Update',
      massUpdate: 'Mass Update',
      massDelete: 'Mass Delete',
      addToCampaign: 'Add to Campaign',
      replace: 'Replace',
    },
    input: {
      searchStore: 'Search entire store here...',
      searchUser: 'Search user name here...',
      inputIdNumber: 'Please input correct id number',
    },
    table: {
      action: 'Action',
    },
    select: {
      label: 'view',
      all: 'All',
    },
    dialog: {
      info: 'Info',
      warning: 'Warning',
      deleteTitle: 'Are you sure to delete this record?',
    },
    tree: {
      default: 'No Department',
    },
    labels: {
      viewName: 'View Name',
    },
    errors: {
      inputRequired: 'The input is required.',
    },
    criteria: {
      field: 'Field',
      condition: 'Condition',
      value: 'Value',
    },
    detailTools: {
      Convert: 'Convert',
      Delete: 'Delete',
      Sharing: 'Sharing',
      FindDuplicates: 'Find Duplicates',
    },
    detailModules: {
      TaskOpen: 'Task Open',
      TaskHistory: 'Task History',
      EmailSent: 'Email Sent',
      Attachments: 'Attachments',
      Logs: 'Logs',
    },
  },
};
