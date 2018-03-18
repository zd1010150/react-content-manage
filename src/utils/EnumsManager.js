const BaseEnums = Object.freeze({
  
  FieldTypes: Object.freeze({
    Date: 'date',
    DateTime: 'datetime',
    Email: 'email',
    LongText: 'longtext',
    Lookup: 'lookup',
    Number: 'number',
    PickList: 'picklist',
    Text: 'text',
    // for display only field
    Display: 'display',
  }),

});

const EnumsManager = Object.freeze({
  LocalStorageKey: 'crmLoginUser',

  PhantomID: '0000-0000',

  DefaultPageConfigs: Object.freeze({
    PageSizeSmall: 10,
    PageSize: 5,
    Options: ['10', '25', '50', '100', '200', '300'],
  }),

  DataType: Object.freeze([
    'datepicker',
    'timepicker',
    'picklist',
  ]),

  ThemeTypes: Object.freeze(['lead', 'account', 'opport']),

  SortOrders: Object.freeze({
    ascend: 'asc',
    descend: 'desc',
  }),

  FieldTypes: Object.freeze(BaseEnums.FieldTypes),

  // this will be used in propTypes checking props is one of values
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

  ObjectTypes: Object.freeze(['leads', 'accounts', 'opportunities']),
});

export default EnumsManager;
