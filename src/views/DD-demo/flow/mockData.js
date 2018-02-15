const defaultFields = [{
  code: 'name',
  is_layout_required: true,
  label: 'Name',
  type: 'text',
  sequence: [0, 0],
}, {
  code: 'email',
  is_layout_required: false,
  label: 'Email',
  type: 'text',
  sequence: [1, 0],
}, {
  code: 'account_type',
  is_layout_required: false,
  label: 'Account Type',
  type: 'select',
  sequence: [2, 0],
}];
export const allFields = [{
  code: 'name',
  is_layout_required: true,
  label: 'Name',
  type: 'text',
}, {
  code: 'email',
  is_layout_required: false,
  label: 'Email',
  type: 'text',
}, {
  code: 'account_type',
  is_layout_required: false,
  label: 'Account Type',
  type: 'select',
}, {
  code: 'language',
  is_layout_required: true,
  label: 'Language',
  type: 'select',
}, {
  code: 'os_type',
  is_layout_required: false,
  label: 'OS Type',
  type: 'text',
}, {
  code: 'region',
  is_layout_required: false,
  label: 'Region',
  type: 'text',
}, {
  code: 'zip',
  is_layout_required: false,
  label: 'Zip',
  type: 'text',
}, {
  code: 'gender',
  is_layout_required: false,
  label: 'Gender',
  type: 'text',
}, {
  code: 'address',
  is_layout_required: false,
  label: 'Address',
  type: 'text',
}, {
  code: 'school',
  is_layout_required: false,
  label: 'School',
  type: 'text',
}, {
  code: 'hobbies',
  is_layout_required: false,
  label: 'Hobbies',
  type: 'text',
}, {
  code: 'company_name',
  is_layout_required: false,
  label: 'Company Name',
  type: 'text',
}];
export const allSections = [{
  code: 'default',
  sequence: 3,
  columns: 1,
  rows: 3,
  label: 'Default Section',
  fields: defaultFields,
}, {
  code: 'section_detail',
  sequence: 2,
  columns: 2,
  rows: 1,
  label: 'Detail More',
  fields: [{
    code: 'region',
    is_layout_required: false,
    label: 'Region',
    type: 'text',
    position: [0, 0],
  }, {
    code: 'language',
    is_layout_required: true,
    label: 'Language',
    type: 'select',
    position: [0, 1],
  }],
}];
