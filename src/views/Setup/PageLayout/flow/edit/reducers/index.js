import { combineReducers } from 'redux';
import fields from './fields';
import sections from './sections';
import ui from './ui';

export default combineReducers({
  fields, sections, ui,
});
