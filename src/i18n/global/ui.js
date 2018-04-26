import Enums from 'utils/EnumsManager';

const {
  Convert,
  Delete,
  Sharing,
  FindDuplicates,
} = Enums.DetailTools;
const {
  Opportunities,
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
      saveAndNew: '保存并新建',
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
      preview: '预览',
      selectFile: '选择文件',
      upload: '开始上传',
      uploading: '正在上传',
      mergeLead: '合并选中的潜在客户',
      convert: '进行转化',
      merge: '进行合并',
      convertToAccount: '升级为客户',
      [TaskOpen]: '新任务',
      [Attachments]: '新附件',
      [Opportunities]: 'New Opportunities',
      selectFileAndUpload: '选择文件并上传',
    },
    input: {
      searchStore: '在此搜索全站商品...',
      searchUser: '输入用户名搜索...',
      inputIdNumber: '请输入合法的身份证号',
      datepicker: {
        placeholder: '请选择日期',
      },
      datetimepicker: {
        placeholder: '请选择日期和时间',
      },
    },
    table: {
      action: '操作',
      createBy: '创建人',
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
      email: '电子邮件',
      company: '公司',
      phone: '电话号码',
      selectedItems: '条记录被选中',
      priority: '优先级',
      category: '所属类别',
    },
    select: {
      label: '视图',
      all: '全部',
    },
    dialog: {
      info: '提示',
      warning: '警告',
      deleteTitle: '确定删除这条记录？',
      revertTitle: '所有修改后的值将会被重置，您确定吗？',
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
      saveAndNew: 'Save and Add New',
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
      preview: 'Preview',
      selectFile: 'Select File',
      upload: 'Start Upload',
      uploading: 'Uploading...',
      mergeLead: 'Merge Leads',
      convert: 'Continue to Convert',
      merge: 'Merge',
      convertToAccount: 'Convert to Account',
      [Opportunities]: 'New Opportunities',
      [TaskOpen]: 'New Task',
      [Attachments]: 'New Attachment',
      selectFileAndUpload: 'Select File And Upload',
    },
    input: {
      searchStore: 'Search entire store here...',
      searchUser: 'Search user name here...',
      inputIdNumber: 'Please input correct id number',
      datepicker: {
        placeholder: 'Please select a date',
      },
      datetimepicker: {
        placeholder: 'Please select date and time',
      },
    },
    table: {
      action: 'Actions',
      createBy: 'Created By',
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
    },
    select: {
      label: 'View',
      all: 'All',
    },
    dialog: {
      info: 'Info',
      warning: 'Warning',
      deleteTitle: 'Are you sure to delete this record ?',
      revertTitle: 'Are you sure to revert all values ?',
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
      [Convert]: 'Convert',
      [Delete]: 'Delete',
      [Sharing]: 'Sharing',
      [FindDuplicates]: 'Find Duplicates',
    },
    detailModules: {
      [Opportunities]: 'Opportunities',
      [TaskOpen]: 'Task Open',
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
  },
};
