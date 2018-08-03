// Just for make jest happy!
import _ from 'lodash';

const BaseEnums = Object.freeze({

  FieldTypes: Object.freeze({
    DateOnly: 'date',
    DateTime: 'datetime',
    Email: 'email',
    LongText: 'long_text',
    Lookup: 'lookup',
    NumberInput: 'number',
    PickList: 'picklist',
    TextInput: 'text',
    // for display only field
    Display: 'display',
    // temp fix, should be removed if backend fix the problem, see more for Issue#55
    ApiError: 'apiError',
  }),

  ObjectTypes: Object.freeze({
    Leads: 'leads',
    Accounts: 'accounts',
    Opportunities: 'opportunities',
    Reports: 'reports',
    Email: 'email',
  }),

  ThemeTypes: Object.freeze({
    Leads: 'lead',
    Accounts: 'account',
    Opportunities: 'opport',
    Report: 'report',
    Email: 'email',
  }),

  DetailTools: Object.freeze({
    Convert: 'Convert',
    Delete: 'Delete',
    Sharing: 'Sharing',
    FindDuplicates: 'FindDuplicates',
  }),

  DetailModules: Object.freeze({
    Opportunities: 'Opportunities',
    TaskOpen: 'TaskOpen',
    TaskHistory: 'TaskHistory',
    EmailSent: 'EmailSent',
    Attachments: 'Attachments',
    Logs: 'Logs',
  }),

  DateTimeSubTypes: Object.freeze({
    SpecificDate: 'SpecificDate',
    Range: 'Range',
    // TODO: This is comment out right now, but will eventually added as a feature in future.
    // CustomRange: 'CustomRange',
  }),

  DateTimeRanges: Object.freeze({
    Today: 'TODAY',
    ThisWeek: 'THIS_WEEK',
    ThisMonth: 'THIS_MONTH',
  }),

  DateTimePeriodPrefixs: Object.freeze({
    Next: 'Next',
    Last: 'Last',
  }),

  DateTimePeriodTypes: Object.freeze({
    Days: 'Days',
    Weeks: 'Weeks',
    Months: 'Months',
  }),

  Conditions: Object.freeze({
    StartsWith: 'starts_with',
    Contains: 'contains',
    Equals: 'equals',
    NotEquals: 'not_equals',
    NotContains: 'not_contains',
    LessThan: 'less_than',
    GreaterThan: 'greater_than',
    LessOrEquals: 'less_or_equals',
    GreaterOrEquals: 'greater_or_equals',
    WithIn: 'within',
    IsNull: 'is_null',
    IsNotNull: 'is_not_null',
    HasRelation: 'has_relation',
  }),

  InvoiceItemsListColumns: Object.freeze({
    Action: 'action',
    Description: 'description',
    Code: 'code',
    Quantity: 'quantity',
    UnitPrice: 'unitPrice',
    Total: 'total',
  }),

  InvoiceSummaryColumns: Object.freeze({
    SDescription: 'sDescription',
    SAddition: 'sAddition',
    STotal: 'sTotal',
  }),

  InvoiceSummaryRows: Object.freeze({
    Subtotal: 'subtotal',
    Tax: 'tax',
    GrandTotal: 'grandTotal',
  }),

});

const tableIntl = 'global.ui.table';

const EnumsManager = Object.freeze({
  // !!!deprecated, update in LocalStorageKeys pls
  LocalStorageKey: 'crmLoginUser',
  LocalStorageEmails: 'crmEmails',

  LocalStorageKeys: Object.freeze({
    User: 'crmLoginUser',
    Email: 'crmEmails',
    Timezone: 'crmTimezone',
    LanguaegOfApp: 'crmAppLanguage',
  }),

  PhantomId: '0000-0000',

  DefaultPageConfigs: Object.freeze({
    PageSizeSmall: 10,
    PageSize: 25,
    Options: ['10', '25', '50', '100', '200', '300'],
  }),

  // !!!deprecated, update in FieldTypes pls
  DataType: Object.freeze([
    'datepicker',
    'timepicker',
    'picklist',
  ]),

  ThemeTypes: BaseEnums.ThemeTypes,

  // Transfer to array will facilitate the proptypes checking by oneof and use JS array methods
  // The following xxInArray properties serve the same purpose like this one.
  ThemeTypesInArray: Object.freeze(_.values(BaseEnums.ThemeTypes)),

  SortOrders: Object.freeze({
    ascend: 'asc',
    descend: 'desc',
  }),

  FieldTypes: BaseEnums.FieldTypes,

  FieldTypesInArray: Object.freeze(_.values(BaseEnums.FieldTypes)),

  FieldOperationTypes: Object.freeze({
    Edit: 'edit',
    Delete: 'delete',
    Deactivate: 'deactivate',
  }),

  ObjectTypes: BaseEnums.ObjectTypes,

  ObjectTypesInArray: Object.freeze(_.values(BaseEnums.ObjectTypes)),

  ObjectTypesThemesMapping: Object.freeze({
    [BaseEnums.ObjectTypes.Leads]: BaseEnums.ThemeTypes.Leads,
    [BaseEnums.ObjectTypes.Accounts]: BaseEnums.ThemeTypes.Accounts,
    [BaseEnums.ObjectTypes.Opportunities]: BaseEnums.ThemeTypes.Opportunities,
    [BaseEnums.ObjectTypes.Report]: BaseEnums.ThemeTypes.Report,
    [BaseEnums.ObjectTypes.Email]: BaseEnums.ThemeTypes.Email,
  }),

  // This is used to avoid conflicts and make each one become unique in global action types pool
  ReduxActionTypePrefix: Object.freeze({
    VIEWFILTER: 'VIEW_FILTER_',
    VIEWDETAILS: 'VIEW_DETAILS_',
    DUPLICATES: 'DUPLICATES_',
    MERGE: 'MERGE_',
    OBJECTLIST: 'OBJECTLIST_',
    OBJECTSHARE: 'OBJECTSHARE',
    OBJECTDETAILS: 'OBJECTDETAILS',
    CONVERSION: 'CONVERSION',
    INVOICE: 'INVOICE',
    CRITERIA: 'CRITERIA',
  }),

  ViewVisibilityIds: Object.freeze({
    Me: 1,
    GroupsAndUsers: 3,
  }),

  RootTeamId: 0,

  NoTeamId: -1,

  DetailActions: Object.freeze([
    {
      key: 'convert',
      path: 'convert',
    },
    {
      key: 'delete',
      path: '',
    },
    {
      key: 'sharing',
      path: 'sharing',
    },
    {
      key: 'findDuplicates',
      path: 'find',
    },
  ]),

  AntdGridMax: 24,

  DetailTools: BaseEnums.DetailTools,
  DetailToolsByObjectType: {
    [BaseEnums.ObjectTypes.Leads]: {
      ...BaseEnums.DetailTools,
    },
    [BaseEnums.ObjectTypes.Accounts]: {
      Delete: 'Delete',
      Sharing: 'Sharing',
    },
    [BaseEnums.ObjectTypes.Opportunities]: {
      Delete: 'Delete',
    },
  },

  DetailToolsInArray: Object.freeze(_.values(BaseEnums.DetailTools)),

  DetailModules: BaseEnums.DetailModules,
  DetailModulesByObjectType: {
    [BaseEnums.ObjectTypes.Leads]: {
      TaskOpen: 'TaskOpen',
      TaskHistory: 'TaskHistory',
      EmailSent: 'EmailSent',
      Attachments: 'Attachments',
      Logs: 'Logs',
    },
    [BaseEnums.ObjectTypes.Accounts]: {
      Opportunities: 'Opportunities',
      TaskOpen: 'TaskOpen',
      TaskHistory: 'TaskHistory',
      EmailSent: 'EmailSent',
      Attachments: 'Attachments',
      Logs: 'Logs',
    },
    [BaseEnums.ObjectTypes.Opportunities]: {
      TaskOpen: 'TaskOpen',
      TaskHistory: 'TaskHistory',
      EmailSent: 'EmailSent',
      Attachments: 'Attachments',
      Logs: 'Logs',
    },
  },

  DetailModulesInArray: Object.freeze(_.values(BaseEnums.DetailModules)),

  ColumnsByModule: {
    [BaseEnums.DetailModules.Opportunities]: [
      {
        dataIndex: 'action',
        titleId: `${tableIntl}.action`,
      },
      {
        dataIndex: 'target_account_id.id',
        titleId: `${tableIntl}.acctName`,
      },
      {
        dataIndex: 'created_at',
        titleId: `${tableIntl}.createDate`,
      },
      {
        dataIndex: 'created_by_user_id',
        titleId: `${tableIntl}.createBy`,
      },
      {
        dataIndex: 'name',
        titleId: `${tableIntl}.opportName`,
      },
    ],
    [BaseEnums.DetailModules.TaskOpen]: [
      {
        dataIndex: 'action',
        titleId: `${tableIntl}.action`,
      },
      {
        dataIndex: 'subject',
        titleId: `${tableIntl}.subject`,
      },
      {
        dataIndex: 'status_code',
        titleId: `${tableIntl}.status`,
      },
      {
        dataIndex: 'priority_code',
        titleId: `${tableIntl}.priority`,
      },
      {
        dataIndex: 'due_date',
        titleId: `${tableIntl}.dueOn`,
      },
      {
        dataIndex: 'updated_at',
        titleId: `${tableIntl}.lastModifiedAt`,
      },
    ],
    [BaseEnums.DetailModules.TaskHistory]: [
      {
        dataIndex: 'subject',
        titleId: `${tableIntl}.subject`,
      },
      {
        dataIndex: 'status_code',
        titleId: `${tableIntl}.status`,
      },
      {
        dataIndex: 'priority_code',
        titleId: `${tableIntl}.priority`,
      },
      {
        dataIndex: 'due_date',
        titleId: `${tableIntl}.dueOn`,
      },
      {
        dataIndex: 'updated_at',
        titleId: `${tableIntl}.lastModifiedAt`,
      },
    ],
    [BaseEnums.DetailModules.EmailSent]: [
      {
        dataIndex: 'subject',
        titleId: `${tableIntl}.subject`,
      },
      {
        dataIndex: 'created_at',
        titleId: `${tableIntl}.sentDate`,
      },
      {
        dataIndex: 'open_date',
        titleId: `${tableIntl}.openDate`,
      },
      {
        dataIndex: 'open_times',
        titleId: `${tableIntl}.openTimes`,
      },
      {
        dataIndex: 'updated_at',
        titleId: `${tableIntl}.lastModifiedAt`,
      },
    ],
    [BaseEnums.DetailModules.Attachments]: [
      {
        dataIndex: 'action',
        titleId: `${tableIntl}.action`,
      },
      {
        dataIndex: 'category',
        titleId: `${tableIntl}.category`,
      },
      {
        dataIndex: 'type',
        titleId: `${tableIntl}.type`,
      },
      {
        dataIndex: 'created_at',
        titleId: `${tableIntl}.uploadAt`,
      },
      {
        dataIndex: 'created_by',
        titleId: `${tableIntl}.createBy`,
      },
      {
        dataIndex: 'comment',
        titleId: `${tableIntl}.comment`,
      },
    ],
    [BaseEnums.DetailModules.Logs]: [
      {
        dataIndex: 'updated_at',
        titleId: `${tableIntl}.date`,
      },
      {
        dataIndex: 'causer.name',
        titleId: `${tableIntl}.user`,
      },
      {
        dataIndex: 'description',
        titleId: `${tableIntl}.action`,
      },
    ],
  },

  MaxDisplayResults: 20,

  FindDupConfigs: Object.freeze({
    BaseFields: Object.freeze([
      'name',
      'lastName',
      'email',
      'company',
      'phone',
    ]),
    MaxSelection: 4,
  }),

  MasterKey: 'master_record_id',

  DateTimeConfigs: Object.freeze({
    // Both belows shoud be consist with format stored in database
    DefaultApiDateFormat: 'YYYY-MM-DD',
    DefaultApiTimeFormat: 'YYYY-MM-DD HH:mm:ss',
    // Following settings are requested in Issue#103 refer to -> http://c7git.acy.svr/LogixCRM/fe_logix_crm/issues/103
    // Both belows are used as default for display
    DefaultDateFormat: 'DD-MM-YYYY',
    DefaultTimeFormat: 'DD-MM-YYYY HH:mm:ss',
    // Used sydney timezone as default for display
    DefaultOffset: '+1100',
    DateFormatKey: 'dateFormat',
    TimeFormatKey: 'timeFormat',

    TimeRangePrefix: 'VAR__',

    SubTypes: BaseEnums.DateTimeSubTypes,
    SubTypesInArray: Object.freeze(_.values(BaseEnums.DateTimeSubTypes)),

    Ranges: BaseEnums.DateTimeRanges,
    RangesInArray: Object.freeze(_.values(BaseEnums.DateTimeRanges)),

    PeriodPrefixs: BaseEnums.DateTimePeriodPrefixs,
    PeriodPrefixsInArray: Object.freeze(_.values(BaseEnums.DateTimePeriodPrefixs)),

    PeriodTypes: BaseEnums.DateTimePeriodTypes,
    PeriodTypesInArray: Object.freeze(_.values(BaseEnums.DateTimePeriodTypes)),

  }),

  Conditions: BaseEnums.Conditions,

  EditViewType: Object.freeze({
    ReadOnly: 'readOnly',
    Required: 'required',
  }),

  FileExtensions: Object.freeze({
    Images: '.jpg, .png, .gif, .jpeg',
    Pdf: '.pdf',
  }),

  Invoice: Object.freeze({
    ItemsList: Object.freeze({
      Columns: BaseEnums.InvoiceItemsListColumns,
      ColumnsInArray: Object.freeze(_.values(BaseEnums.InvoiceItemsListColumns)),
    }),
    Summary: Object.freeze({
      Columns: BaseEnums.InvoiceSummaryColumns,
      ColumnsInArray: Object.freeze(_.values(BaseEnums.InvoiceSummaryColumns)),
      Rows: BaseEnums.InvoiceSummaryRows,
      RowsInArray: Object.freeze(_.values(BaseEnums.InvoiceSummaryRows)),
    }),
  }),

});

export default EnumsManager;
