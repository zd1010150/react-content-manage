
import _ from 'lodash';
import {
  SETUP_LAYOUT_EDIT_SET_MODULES,
  SETUP_LAYOUT_EDIT_ADD_MODULES,
  SETUP_LAYOUT_EDIT_SORT_MODULES,
  SETUP_LAYOUT_EDIT_DELETE_MODULES,
} from '../actionType';

const initModules = modules => _.sortBy(modules, ['sequence']).map(m => m.code);
const addModules = (state, sequence, code) => {
  const newState = state.slice();
  sequence = sequence > state.length ? state.length : sequence;
  newState.splice(sequence, 0, code);
  return newState;
};
const deleteModule = (state, code) => {
  const newState = state.slice();
  return newState.filter(m => m !== code);
};
const sortModule = (state, code, sequence) => {
  const index = state.indexOf(code);
  const newState = state.slice();
  if (sequence === index) { return state; }
  if (sequence > state.length) {
    newState.splice(index, 1);
    newState.push(code);
    return newState;
  } else if (sequence <= 0) {
    newState.splice(index, 1);
    newState.unshift(code);
    return newState;
  }

  if (index > sequence) {
    const right = state.slice(index + 1);
    const left = state.slice(0, index);
    left.splice(sequence, 0, code);
    return [...left, ...right];
  }
  const left = state.slice(0, index);
  const right = state.slice(index + 1);
  right.splice(sequence - left.length - 1, 0, code);
  return [...left, ...right];
};
const modules = (state = [], action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_LAYOUT_EDIT_SET_MODULES:
      return initModules(payload.modules);
    case SETUP_LAYOUT_EDIT_ADD_MODULES:
      return addModules(state, payload.sequence, payload.code);
    case SETUP_LAYOUT_EDIT_DELETE_MODULES:
      return deleteModule(state, payload.code);
    case SETUP_LAYOUT_EDIT_SORT_MODULES:
      return sortModule(state, payload.code, payload.sequence);
    default:
      return state;
  }
};

export default modules;
