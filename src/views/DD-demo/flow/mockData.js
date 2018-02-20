const defaultFields = [{
  id: 'name',
  is_layout_required: true,
  label: 'Name',
  type: 'text',
  position: [0, 0],
}, {
  id: 'email',
  is_layout_required: false,
  label: 'Email',
  type: 'text',
  position: [1, 0],
}, {
  id: 'account_type',
  is_layout_required: false,
  label: 'Account Type',
  type: 'select',
  position: [2, 0],
}];
export const allFields = [{
  id: 'name',
  is_layout_required: true,
  label: 'Name',
  type: 'text',
}, {
  id: 'email',
  is_layout_required: false,
  label: 'Email',
  type: 'text',
}, {
  id: 'account_type',
  is_layout_required: false,
  label: 'Account Type',
  type: 'select',
}, {
  id: 'language',
  is_layout_required: true,
  label: 'Language',
  type: 'select',
}, {
  id: 'os_type',
  is_layout_required: false,
  label: 'OS Type',
  type: 'text',
}, {
  id: 'region',
  is_layout_required: false,
  label: 'Region',
  type: 'text',
}, {
  id: 'zip',
  is_layout_required: false,
  label: 'Zip',
  type: 'text',
}, {
  id: 'gender',
  is_layout_required: false,
  label: 'Gender',
  type: 'text',
}, {
  id: 'address',
  is_layout_required: false,
  label: 'Address',
  type: 'text',
}, {
  id: 'school',
  is_layout_required: false,
  label: 'School',
  type: 'text',
}, {
  id: 'hobbies',
  is_layout_required: false,
  label: 'Hobbies',
  type: 'text',
}, {
  id: 'company_name',
  is_layout_required: false,
  label: 'Company Name',
  type: 'text',
}, {
  id: 'language2',
  is_layout_required: false,
  label: 'language2',
  type: 'select',
}, {
  id: 'language3',
  is_layout_required: false,
  label: 'language3',
  type: 'select',
}, {
  id: 'language4',
  is_layout_required: false,
  label: 'language4',
  type: 'select',
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
    id: 'region',
    is_layout_required: false,
    label: 'Region',
    type: 'text',
    position: [0, 1],
  }, {
    id: 'language',
    is_layout_required: true,
    label: 'Language',
    type: 'select',
    position: [0, 0],
  }, {
    id: 'language2',
    is_layout_required: false,
    label: 'Language2',
    type: 'select',
    position: [1, 1],
  }, {
    id: 'language3',
    is_layout_required: false,
    label: 'Language3',
    type: 'select',
    position: [2, 0],
  }, {
    id: 'language4',
    is_layout_required: false,
    label: 'Language4',
    type: 'select',
    position: [1, 0],
  }],
}];
