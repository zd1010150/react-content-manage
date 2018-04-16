import { get, patch, post, httpDelete } from 'store/http/httpAction';
import _ from 'lodash';
import {
  SETUP_LAYOUT_SET_CURRENT_OBJECT,
  SETUP_LAYOUT_SET_ALL_LAYOUTS,
  SETUP_LAYOUT_SET_EDIT,
  SETUP_LAYOUT_ADD_LAYOUT,
  SETUP_LAYOUT_SET_LAYOUT_TEAM,
} from './actionType';


export const setCurrentObject = objType => ({
  type: SETUP_LAYOUT_SET_CURRENT_OBJECT,
  objType,
});
export const setAllLayout = args => ({
  type: SETUP_LAYOUT_SET_ALL_LAYOUTS,
  ...args,
});
export const setEditLayout = args => ({
  type: SETUP_LAYOUT_SET_EDIT,
  ...args,
});
export const setAddLayout = args => ({
  type: SETUP_LAYOUT_ADD_LAYOUT,
  ...args,
});


export const setLayoutTeam = (teamId, layoutId) => ({
  type: SETUP_LAYOUT_SET_LAYOUT_TEAM,
  teamId,
  layoutId,
});
export const fetchAllLayouts = objType => dispatch => get(`/admin/page_layouts/object/${objType}`, {}, dispatch).then((data) => {
  dispatch(setAllLayout({ layouts: data.data || [] }));
});

export const saveLayoutName = (objType, form, cb) => dispatch => post(`/admin/page_layouts/object/${objType}`, { ...form }, dispatch).then((data) => {
  if ((!_.isEmpty(data && data.data)) && _.isFunction(cb)) {
    cb(data.data);
  }
});

export const saveAssigment = (objType, assign_data, cb) => dispatch => patch(`/admin/page_layouts/object/${objType}/assign`, { assign_data }, dispatch).then((data) => {
  if (_.isFunction(cb)) {
    cb();
  }
});

export const deleteLayout = (layoutId, cb) => dispatch => httpDelete(`/admin/page_layouts/${layoutId}`, {}, dispatch).then((data) => {
  if (_.isFunction(cb)) {
    cb();
  }
});

