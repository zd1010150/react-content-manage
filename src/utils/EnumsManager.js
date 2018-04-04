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

});

// map object to array
// TODO: extract to utils/common
// const ThemeTypesInArray = BaseEnums.ThemeTypes.

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
  ThemeTypesInArray: Object.freeze([
    BaseEnums.ThemeTypes.Leads,
    BaseEnums.ThemeTypes.Accounts,
    BaseEnums.ThemeTypes.Opportunities,
    BaseEnums.ThemeTypes.Report,
    BaseEnums.ThemeTypes.Email,
  ]),

  SortOrders: Object.freeze({
    ascend: 'asc',
    descend: 'desc',
  }),

  FieldTypes: BaseEnums.FieldTypes,

  FieldTypesInArray: Object.freeze([
    BaseEnums.FieldTypes.Date,
    BaseEnums.FieldTypes.DateTime,
    BaseEnums.FieldTypes.Email,
    BaseEnums.FieldTypes.LongText,
    BaseEnums.FieldTypes.Lookup,
    BaseEnums.FieldTypes.Number,
    BaseEnums.FieldTypes.PickList,
    BaseEnums.FieldTypes.Text,
    BaseEnums.FieldTypes.Display,
  ]),

  FieldOperationTypes: Object.freeze({
    Edit: 'edit',
    Delete: 'delete',
    Deactivate: 'deactivate',
  }),

  ObjectTypes: BaseEnums.ObjectTypes,
  
  ObjectTypesInArray: Object.freeze([
    BaseEnums.ObjectTypes.Leads,
    BaseEnums.ObjectTypes.Accounts,
    BaseEnums.ObjectTypes.Opportunities,
    BaseEnums.ObjectTypes.Email,
    BaseEnums.ObjectTypes.Report,
  ]),

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

  AntGridMax: 24,
});

export default EnumsManager;
