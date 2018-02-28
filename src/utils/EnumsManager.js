const EnumsManager = Object.freeze({
  LocalStorageKey: 'crmLoginUser',
  
  PhantomID: '0000-0000',

  DefaultPageConfigs: Object.freeze({
    PageSize: 10,
  }),

  DataType: Object.freeze([
    'datepicker',
    'timepicker',
    'picklist'
  ]),
});

export default EnumsManager;