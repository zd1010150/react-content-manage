import { get, patch, post, httpDelete } from 'store/http/httpAction';
import _ from 'lodash';
import {
  SETUP_LAYOUT_EDIT_SET_ALL_FIELDS,
  SETUP_LAYOUT_EDIT_SET_ALL_SECTIONS,
  SETUP_LAYOUT_EDIT_ADD_FIELD_TO_SECTION,
  SETUP_LAYOUT_EDIT_DELETE_FROM_SECTION,
  SETUP_LAYOUT_EDIT_MOVE_BETWEEN_SECTION,
  SETUP_LAYOUT_EDIT_ADD_SECTION,
  SETUP_LAYOUT_EDIT_DELETE_SECTION,
  SETUP_LAYOUT_EDIT_UPDATE_SECTION,
  SETUP_LAYOUT_EDIT_MOVE_SECTION,
  SETUP_LAYOUT_EDIT_TOGGLE_SECTION_ADD_EDIT_DIALOG,
  SETUP_LAYOUT_EDIT_SET_SECTION_ATTRIBUTE,
  SETUP_LAYOUT_EDIT_SET_CAN_DROP,
  SETUP_LAYOUT_EDIT_SET_CURRENT_TAB,
  SETUP_LAYOUT_EDIT_SET_MODULES,
  SETUP_LAYOUT_EDIT_ADD_MODULES,
  SETUP_LAYOUT_EDIT_SORT_MODULES,
  SETUP_LAYOUT_EDIT_DELETE_MODULES,
  SETUP_LAYOUT_EDIT_SET_TOOLS,
  SETUP_LAYOUT_EDIT_ADD_TOOLS,
  SETUP_LAYOUT_EDIT_SORT_TOOLS,
  SETUP_LAYOUT_EDIT_DELETE_TOOLS,
  SETUP_LAYOUT_EDIT_SET_CURRENT_LAYOUT,
  SETUP_LAYOUT_EDIT_FIELD,
} from './actionType';
/* sider draglayer action */
export const setCanDrop = canDrop => ({
  type: SETUP_LAYOUT_EDIT_SET_CAN_DROP,
  canDrop,
});

export const setCurrentTab = tab => ({
  type: SETUP_LAYOUT_EDIT_SET_CURRENT_TAB,
  tab,
});

export const setCurrentLayout = args => ({
  type: SETUP_LAYOUT_EDIT_SET_CURRENT_LAYOUT,
  ...args,
});

/* modules action */
export const setModules = modules => ({
  type: SETUP_LAYOUT_EDIT_SET_MODULES,
  modules,
});
export const addModule = args => ({
  type: SETUP_LAYOUT_EDIT_ADD_MODULES,
  ...args,
});
export const deleteModule = args => ({
  type: SETUP_LAYOUT_EDIT_DELETE_MODULES,
  ...args,
});
export const sortModules = args => ({
  type: SETUP_LAYOUT_EDIT_SORT_MODULES,
  ...args,
});

/* tools action */
export const setTools = tools => ({
  type: SETUP_LAYOUT_EDIT_SET_TOOLS,
  tools,
});
export const addTool = args => ({
  type: SETUP_LAYOUT_EDIT_ADD_TOOLS,
  ...args,
});
export const deleteTool = args => ({
  type: SETUP_LAYOUT_EDIT_DELETE_TOOLS,
  ...args,
});
export const sortTools = args => ({
  type: SETUP_LAYOUT_EDIT_SORT_TOOLS,
  ...args,
});

/* sections action */
export const addFieldToSection = args => ({
  type: SETUP_LAYOUT_EDIT_ADD_FIELD_TO_SECTION,
  ...args,
});
export const deleteFromSection = args => ({
  type: SETUP_LAYOUT_EDIT_DELETE_FROM_SECTION,
  ...args,
});

export const moveFieldsBetweenSection = args => ({
  type: SETUP_LAYOUT_EDIT_MOVE_BETWEEN_SECTION,
  ...args,
});

export const addSection = args => ({
  type: SETUP_LAYOUT_EDIT_ADD_SECTION,
  ...args,
});

export const deleteSection = args => ({
  type: SETUP_LAYOUT_EDIT_DELETE_SECTION,
  ...args,
});

export const updateSection = args => ({
  type: SETUP_LAYOUT_EDIT_UPDATE_SECTION,
  ...args,
});

export const moveSection = args => ({
  type: SETUP_LAYOUT_EDIT_MOVE_SECTION,
  ...args,
});

export const toggleSectionAddEditDialog = args => ({
  type: SETUP_LAYOUT_EDIT_TOGGLE_SECTION_ADD_EDIT_DIALOG,
  ...args,
});

export const setSectionAttr = args => ({
  type: SETUP_LAYOUT_EDIT_SET_SECTION_ATTRIBUTE,
  ...args,
});

export const setAllSections = sections => ({
  type: SETUP_LAYOUT_EDIT_SET_ALL_SECTIONS,
  sections,
});

export const setEditField = args => ({
  type: SETUP_LAYOUT_EDIT_FIELD,
  ...args,
});
export const setAllFields = (fields, sections) => ({
  type: SETUP_LAYOUT_EDIT_SET_ALL_FIELDS,
  fields,
  sections,
});
export const fetchLayoutDetail = id => dispatch => get(`/admin/page_layouts/${id}`, {}, dispatch).then((data) => {
  if (!_.isEmpty(data && data.page_layout && data.all_fields)) {
    const { modules, tools, sections } = data.page_layout.data.structure;
    dispatch(setModules(modules));
    dispatch(setTools(tools));
    dispatch(setAllSections(sections));
    dispatch(setAllFields(data.all_fields.data, sections));
  }
});

