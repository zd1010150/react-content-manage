
import _ from 'lodash';
import {
  SETUP_LAYOUT_EDIT_SET_TOOLS,
  SETUP_LAYOUT_EDIT_ADD_TOOLS,
  SETUP_LAYOUT_EDIT_SORT_TOOLS,
  SETUP_LAYOUT_EDIT_DELETE_TOOLS,
} from '../actionType';

const initTools = modules => _.sortBy(modules, ['sequence']).map(m => m.code);
const addTools = (state, sequence, code) => {
  const newState = state.slice();
  sequence = sequence > state.length ? state.length : sequence;
  newState.splice(sequence, 0, code);
  return newState;
};
const deleteTool = (state, code) => {
  const newState = state.slice();
  return newState.filter(m => m !== code);
};
const sortTool = (state, code, sequence) => {
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
const tools = (state = [], action) => {
  const { type, ...payload } = action;
  switch (type) {
    case SETUP_LAYOUT_EDIT_SET_TOOLS:
      return initTools(payload.tools);
    case SETUP_LAYOUT_EDIT_ADD_TOOLS:
      return addTools(state, payload.sequence, payload.code);
    case SETUP_LAYOUT_EDIT_DELETE_TOOLS:
      return deleteTool(state, payload.code);
    case SETUP_LAYOUT_EDIT_SORT_TOOLS:
      return sortTool(state, payload.code, payload.sequence);
    default:
      return state;
  }
};

export default tools;
