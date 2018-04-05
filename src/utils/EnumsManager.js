const BaseEnums = Object.freeze({
  
  FieldTypes: Object.freeze({
    Date: 'date',
    DateTime: 'datetime',
    Email: 'email',
    LongText: 'long_text',
    Lookup: 'lookup',
    Number: 'number',
    PickList: 'picklist',
    Text: 'text',
    // for display only field
    Display: 'display',
  }),

  ObjectTypes: Object.freeze({
    Leads: 'leads',
    Accounts: 'accounts',
    Opportunities: 'opportunities',
    Report: 'report',
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
    Convert: 'convert',
    Delete: 'delete',
    Sharing: 'sharing',
    FindDuplicates: 'findDuplicates',
  }),

  DetailModules: Object.freeze({
    Opportunities: 'opportunities',
    TaskOpen: 'taskOpen',
    TaskHistory: 'taskHistory',
    EmailSent: 'emailSent',
    Attachments: 'attachments',
    Logs: 'logs',
  }),

});

const EnumsManager = Object.freeze({
  LocalStorageKey: 'crmLoginUser',

  PhantomID: '0000-0000',

  DefaultPageConfigs: Object.freeze({
    PageSizeSmall: 10,
    PageSize: 25,
    Options: ['10', '25', '50', '100', '200', '300'],
  }),

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
  }),

  ViewVisibilityIds: Object.freeze({
    Me: 1,
    GroupsAndUsers: 3,
  }),

  RootTeamId: 0,

  NoTeamId: -1,

  DetailTools: BaseEnums.DetailTools,

  DetailToolsInArray: Object.freeze(_.values(BaseEnums.DetailTools)),

  DetailModules: BaseEnums.DetailModules,

  DetailModulesInArray: Object.freeze(_.values(BaseEnums.DetailModules)),

});

export default EnumsManager;
