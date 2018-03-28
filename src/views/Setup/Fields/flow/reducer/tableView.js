// import { combineReducers } from 'redux';
// import _ from 'lodash';
// import { SETUP_FIELDS_SET_CURRENT_OBJECT, SETUP_FIELDS_SET_OTHER_OBJECT_FILEDS } from '../actionType';
// import { LEADS, ACCOUNTS, OPPORTUNITIES, objectTypeRelations } from '../objectTypeHelper';
//
//
// const currentObject = (state = { objType: LEADS, fields: { main: [], cstm: [] } }, action) => {
//   const { type, ...payload } = action;
//   switch (type) {
//     case SETUP_FIELDS_SET_CURRENT_OBJECT:
//       return Object.assign({}, state, { ...payload });
//     default:
//       return state;
//   }
// };
//
// const filterRelativeFields = (objectType, data) => {
//   const { from, to } = objectTypeRelations[objectType];
//   const fromFields = from.map((type) => {
//     if (!_.isEmpty(data[type])) {
//       return { [type]: data[type].data };
//     } return { [type]: [] };
//   });
//   const toFields = to.map((type) => {
//     if (!_.isEmpty(data[type])) {
//       return { [type]: data[type].data };
//     } return { [type]: [] };
//   });
//   return {
//     from: fromFields,
//     to: toFields,
//   };
// };
// const relativeFields = (state = { from: [], to: [] }, action) => {
//   const { type, ...payload } = action;
//   switch (type) {
//     case SETUP_FIELDS_SET_OTHER_OBJECT_FILEDS:
//       filterRelativeFields(payload.objectType, payload.data);
//   }
// };
// export default combineReducers({
//   currentObject,
//   relativeFields,
// });
