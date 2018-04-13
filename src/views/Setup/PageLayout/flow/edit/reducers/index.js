import { combineReducers } from 'redux';
import fields from './fields';
import sections from './sections';
import ui from './ui';
import modules from './modules';
import tools from './tools';
import layout from './layout';

export default combineReducers({
  fields, sections, ui, modules, tools, layout,
});
