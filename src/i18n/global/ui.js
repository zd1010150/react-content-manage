import Enums from 'utils/EnumsManager';

const {
  DetailTools,
  DetailModules,
  DateTimeConfigs,
  Invoice,
} = Enums;

const {
  Convert,
  Delete,
  Sharing,
  FindDuplicates,
} = DetailTools;

const {
  Opportunities,
  TaskOpen,
  TaskHistory,
  EmailSent,
  Attachments,
  Logs,
} = DetailModules;

const {
  SubTypes,
  Ranges,
  PeriodPrefixs,
  PeriodTypes,
} = DateTimeConfigs;
const {
  SpecificDate,
  Range,
  CustomRange,
} = SubTypes;
const {
  Today,
  ThisWeek,
  ThisMonth,
} = Ranges;
const {
  Days,
  Weeks,
  Months,
} = PeriodTypes;
const {
  Next,
  Last,
} = PeriodPrefixs;

const {
  SDescription,
  SAddition,
  STotal,
} = Invoice.Summary.Columns;

export default {
  zh: {
    button: {
      cancel: '取消',
      ok: '确认',
      signIn: '登录',
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
      saveAndNew: '保存并新建',
      search: '搜索',
      pay: '支付',
      next: '下一步',
      previous: '上一步',
      detail: '查看详情',
      goBack: '返回',
      update: '更新',
      massUpdate: '批量更新',
      massDelete: '批量删除',
      addToCampaign: '添加到营销活动',
      replace: '替换',
      preview: '预览',
      selectFile: '选择文件',
      uploading: '正在上传',
      mergeLead: '合并选中的Leads',
      convert: '进行转化',
      merge: '进行合并',
      convertToAccount: '升级为Account',
      [TaskOpen]: '新任务',
      [Attachments]: '新附件',
      [Opportunities]: '新Opportunity',
      [EmailSent]: '新邮件',
      selectFileAndUpload: '选择文件并上传',
      addUserToShare: '分享给其他用户',
      addUserOrTeamToShare: '分享给其他用户或群组',
      newOpport: '新Opportunity',
      viewAll: '查看全部',
      new: '新',
      saveChange: '保存修改',
      redoAll: '撤销所有修改',
      done: '完成',
      add: '添加',
      close: '关闭',
    },
    input: {
      searchStore: '在此搜索全站商品...',
      searchUser: '输入用户名搜索...',
      inputIdNumber: '请输入合法的身份证号',
    },
    placeholders: {
      datepicker: '请选择日期',
      datetimepicker: '请选择时间',
      subject: '请从列表中选择或添加新的主题',
      range: '请选择时间范围',
    },
    table: {
      action: '操作',
      complete: '完成',
      createBy: '创建人',
      createDate: '创建时间',
      date: '日期',
      dueAt: '截止时间',
      dueOn: '截止日期',
      lastModifiedAt: '最后更新时间',
      lastOpenAt: '最后开启的时间',
      openDate: '开启时间',
      openTimes: '开启的次数',
      sentDate: '发送时间',
      subject: '主题',
      status: '状态',
      title: '标题',
      type: '类型',
      uploadAt: '上传时间',
      user: '用户',
      fullName: '用户名',
      team: '所属团队',
      workHour: '工作时间',
      firstName: '名字',
      lastName: '姓氏',
      email: '电子邮箱',
      company: '公司',
      phone: '电话号码',
      selectedItems: '条记录被选中',
      priority: '优先级',
      category: '所属类别',
      acctName: 'Account姓名',
      name: '用户名',
      opportName: 'Opportunity姓名',
      comment: '备注',
      invoiceNo: '发票号',
      invoiceDate: '发票时间',
      invoiceDescription: '发票描述',
      relatedTo: '相关者',
      modifiedBy: '修改人',
      code: '货物编号',
      quantity: '数量',
      unitPrice: '单价',
      total: '总价',
      description: '描述',
      addition: '附加费用',
      [SDescription]: '描述',
      [SAddition]: '附加费用',
      [STotal]: '总价',
      descriptionOfInvoice: '发票备注',
    },
    select: {
      label: '视图',
      all: '全部',
    },
    dialog: {
      info: '提示',
      warning: '警告',
      deleteTitle: '此记录将被删除，您确定吗？',
      revertTitle: '所有修改后的值将会被重置，您确定吗？',
      massDelete: '所有选中的记录将会被删除，您确定吗？',
      multipleDnd: '按住Shift键并点击记录，可同时选择多条数据进行拖拽。',
    },
    tree: {
      default: '默认部门',
    },
    labels: {
      viewName: '视图名称',
    },
    errors: {
      inputRequired: '必填项!',
    },
    criteria: {
      field: '字段',
      condition: '条件',
      value: '值',
    },
    detailTools: {
      [Convert]: '转化',
      [Delete]: '删除',
      [Sharing]: '分享给其他用户',
      [FindDuplicates]: '查询重复记录',
    },
    detailModules: {
      [Opportunities]: 'Opportunities',
      [TaskOpen]: '未完成的任务',
      [TaskHistory]: '任务历史',
      [EmailSent]: '已发送的邮件',
      [Attachments]: '附件',
      [Logs]: '日志',
    },
    upload: {
      maxSize: '文件最大是{size}M',
      errorMax: '你的文件超过了{size}M,请重新选择',
      errorType: '文件类型不对，只允许上传 {type} 类型的文件',
    },
    DateTimeSubTypes: {
      [SpecificDate]: '精确日期/时间',
      [Range]: '时间范围',
      [CustomRange]: '自定义时间范围',
    },
    DateTimeRanges: {
      [Today]: '本日',
      [ThisWeek]: '本周',
      [ThisMonth]: '本月',
    },
    DateTimePeriodPrefixs: {
      [Next]: '未来',
      [Last]: '过去',
    },
    DateTimePeriodTypes: {
      [Days]: '天',
      [Weeks]: '周',
      [Months]: '月',
    },
  },
  en: {
    button: {
      cancel: 'Cancel',
      ok: 'OK',
      signIn: 'Sign In',
      submit: 'Submit',
      addBtn: 'Add {actionType}',
      upload: 'Upload',
      view: 'View {actionType}',
      select: 'Select',
      addGoodsToCart: 'Add to Cart',
      delete: 'Delete',
      edit: 'Edit ',
      addGoods: 'Add Goods',
      save: 'Save',
      saveAndNew: 'Save and Add New',
      search: 'Search',
      pay: 'Pay',
      next: 'Next',
      previous: 'Previous',
      detail: 'Detail',
      goBack: 'Go Back',
      update: 'Update',
      massUpdate: 'Mass Update',
      massDelete: 'Mass Delete',
      addToCampaign: 'Add to Campaign',
      replace: 'Replace',
      preview: 'Preview',
      selectFile: 'Select File',
      uploading: 'Uploading...',
      mergeLead: 'Merge Leads',
      convert: 'Continue to Convert',
      merge: 'Merge',
      convertToAccount: 'Convert to Account',
      [Opportunities]: 'New Opportunity',
      [TaskOpen]: 'New Task',
      [Attachments]: 'New Attachment',
      [EmailSent]: 'New Email',
      selectFileAndUpload: 'Select File And Upload',
      addUserToShare: 'Add User to Share',
      addUserOrTeamToShare: 'Add User or Team to Share',
      newOpport: 'New Opportunity',
      viewAll: 'View All',
      new: 'New ',
      saveChange: 'Save Changes',
      redoAll: 'Redo',
      done: 'Done',
      add: 'Add',
      close: 'Close',
    },
    input: {
      searchStore: 'Search entire store here...',
      searchUser: 'Search user name here...',
      inputIdNumber: 'Please input correct id number',
    },
    placeholders: {
      datepicker: 'Select a date',
      datetimepicker: 'Select a time',
      subject: 'Select or add a new value from the list',
      range: 'Select a range',
    },
    table: {
      action: 'Actions',
      complete: 'Complete',
      createBy: 'Created By',
      createDate: 'Create Date',
      date: 'Date',
      dueAt: 'Due Time',
      dueOn: 'Due Date',
      lastModifiedAt: 'Last Modified Date/Time',
      lastOpenAt: 'Last Open At',
      openDate: 'Date Open',
      openTimes: '# Times Opened',
      sentDate: 'Date Sent',
      subject: 'Subject',
      status: 'Status',
      title: 'Title',
      type: 'Type',
      uploadAt: 'Uploaded Date',
      user: 'User',
      fullName: 'Full Name',
      team: 'Team',
      workHour: 'Working Hour',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      company: 'Company',
      phone: 'Phone',
      selectedItems: 'items selected',
      priority: 'Priority',
      category: 'Category',
      acctName: 'Account Name',
      name: 'Name',
      opportName: 'Opportunity Name',
      comment: 'Comment',
      invoiceNo: 'Invoice Number',
      invoiceDate: 'Invoice Date',
      invoiceDescription: 'Description of Invoice',
      relatedTo: 'Related To',
      modifiedBy: 'Modified By',
      code: 'Item Code',
      quantity: 'Quantity',
      unitPrice: 'Unit Price',
      total: 'Total',
      description: 'Description',
      addition: 'Addition',
      [SDescription]: 'Description',
      [SAddition]: 'Addtion',
      [STotal]: 'Total',
      descriptionOfInvoice: 'Description of Invoice',
    },
    select: {
      label: 'View',
      all: 'All',
    },
    dialog: {
      info: 'Info',
      warning: 'Warning',
      deleteTitle: 'Are you sure to delete this record?',
      revertTitle: 'Are you sure to revert all values?',
      massDelete: 'Are you sure to delete all selected records?',
      multipleDnd: 'Drag and drop is enabled. Press shift and click on an item can select multiple items.',
    },
    tree: {
      default: 'No Department',
    },
    labels: {
      viewName: 'View Name',
    },
    errors: {
      inputRequired: 'The input is required!',
    },
    criteria: {
      field: 'Field',
      condition: 'Condition',
      value: 'Value',
    },
    detailTools: {
      [Convert]: 'Convert',
      [Delete]: 'Delete',
      [Sharing]: 'Sharing',
      [FindDuplicates]: 'Find Duplicates',
    },
    detailModules: {
      [Opportunities]: 'Opportunities',
      [TaskOpen]: 'Open Task',
      [TaskHistory]: 'Task History',
      [EmailSent]: 'Email Sent',
      [Attachments]: 'Attachments',
      [Logs]: 'Logs',
    },
    upload: {
      maxSize: 'Maximum file size is {size}M',
      errorMax: 'The file is larger than {size}M, please reselect',
      errorType: 'The type of file is error, the allowed type is {type}',
    },
    DateTimeSubTypes: {
      [SpecificDate]: 'Specific Date',
      [Range]: 'Range',
      [CustomRange]: 'Custom Range',
    },
    DateTimeRanges: {
      [Today]: 'Today',
      [ThisWeek]: 'This Week',
      [ThisMonth]: 'This Month',
    },
    DateTimePeriodPrefixs: {
      [Next]: 'Next',
      [Last]: 'Past',
    },
    DateTimePeriodTypes: {
      [Days]: 'Days',
      [Weeks]: 'Weeks',
      [Months]: 'Months',
    },
  },
};
