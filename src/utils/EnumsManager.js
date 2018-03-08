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
    'picklist'
  ]),

  ThemeTypes: Object.freeze(['lead', 'account', 'opport']),

  SortOrders: Object.freeze({
    ascend: 'asc',
    descend: 'desc',
  }),
});

export default EnumsManager;