import { combineReducers } from "redux";
import _ from "lodash";
import EnumsManager from "utils/EnumsManager";
import {
  newTemplate,
  editTemplate
} from "../../emailTemplatesCreation/flow/reducer";
import {
  EMAIL_TEMPLATES_EDIT_FOLDER_VIEW_VISIBLE,
  EMAIL_TEMPLATES_SET_SELECTED_USER_TEAM_DIALOG_VISIBLE,
  EMAIL_TEMPLATES_PERMISSION_VIEW_VISIBLE,
  EMAIL_TEMPLATES_SHARED_BY_VISIBLE,
  EMAIL_TEMPLATES_DEPARTMENT_VISIBLE,
  EMAIL_TEMPLATES_PERMISSION_VISIBLE,
  EMAIL_TEMPLATES_SET_NEW_DEPARTMENT_NAME,
  EMAIL_TEMPLATES_RESET_NEW_DEPARTMENT,
  EMAIL_TEMPLATES_SET_SELECTED_DEPARTMENT,
  EMAIL_TEMPLATES_SET_USER,
  EMAIL_TEMPLATES_SET_SELECT_USER,
  EMAIL_TEMPLATES_SET_SORTING_TEAM,
  EMAIL_TEMPLATES_SETUP_TEMPLATES_PAGENATIONS,
  EMAIL_TEMPLATES_UPDATE_FIELD_OPTION
} from "./actionType";

import { templates } from "./emailTemplateFlow/reducer";
import {
  userFolders,
  sharedFolders,
  selectedFolder,
  editFolders,
  deletedFolders
} from "./folderFlow/reducer";
import {
  selectedPermissionDepartment,
  addedPermissionDepartment,
  addedPermissionUser
} from "./folderPermissionFlow/reducer";

const mockFolders = [
  {
    id: 0,
    belonged_user_id: 2,
    name: "user2_folder1",
    description: null,
    comment: "seeder",
    created_at: "2018-03-27 04:44:55",
    updated_at: "2018-03-27 04:44:55",
    belonged_user: {
      id: 2,
      name: "u2-t2",
      email: "admin2@acy.com",
      team_id: 2,
      time_zone: null,
      start_work_time: null,
      end_work_time: null,
      created_at: "2018-03-27 04:44:49",
      updated_at: "2018-03-27 04:44:49",
      deleted_at: null
    },
    shared_to_users: [],
    shared_to_teams: []
  },
  {
    id: 1,
    userId: 0,
    owner: "Jimmy",
    name: "private folder",
    isShared: false,
    templates: [
      {
        name: "sales",
        createdAt: "2018-01-02",
        modifiedDate: "2018-03-02",
        createBy: "Jimmy",
        Description: "for sales use"
      }
    ]
  },
  {
    id: 2,
    userId: 0,
    owner: "Jimmy",
    name: "a",
    isShared: false,
    templates: [
      {
        name: "sales",
        createdAt: "2018-01-02",
        modifiedDate: "2018-03-02",
        createBy: "Jimmy",
        Description: "for sales use"
      }
    ]
  },
  {
    id: 3,
    userId: 0,
    owner: "Jimmy",
    name: "b",
    isShared: false,
    templates: [
      {
        name: "sales",
        createdAt: "2018-01-02",
        modifiedDate: "2018-03-02",
        createBy: "Jimmy",
        Description: "for sales use"
      }
    ]
  },
  {
    id: 4,
    userId: 0,
    owner: "Jimmy",
    name: "c",
    isShared: false,
    templates: [
      {
        name: "sales",
        createdAt: "2018-01-02",
        modifiedDate: "2018-03-02",
        createBy: "Jimmy",
        Description: "for sales use"
      }
    ]
  },
  {
    id: 5,
    userId: 0,
    owner: "Jimmy",
    name: "d",
    isShared: false,
    templates: [
      {
        name: "sales",
        createdAt: "2018-01-02",
        modifiedDate: "2018-03-02",
        createBy: "Jimmy",
        Description: "for sales use"
      }
    ]
  },
  {
    id: 6,
    userId: 0,
    owner: "Jimmy",
    name: "e",
    isShared: false,
    templates: [
      {
        name: "sales",
        createdAt: "2018-01-02",
        modifiedDate: "2018-03-02",
        createBy: "Jimmy",
        Description: "for sales use"
      }
    ]
  }
];

const mockSharedFolders = [
  {
    id: 0,
    userId: 2,
    owner: "Jack",
    name: "genaral folder",
    isShared: true,
    templates: [
      {
        name: "market",
        createdAt: "2018-01-02",
        modifiedDate: "2018-03-02",
        createBy: "Jack",
        Description: "for market use"
      }
    ]
  }
];

const mockSelectedFolder = {
  id: 0,
  userId: 2,
  owner: "Jack",
  name: "genaral folder",
  isShared: false,
  templates: [
    {
      name: "market",
      createdAt: "2018-01-02",
      modifiedDate: "2018-03-02",
      createBy: "Jack",
      Description: "for market use"
    }
  ]
};

// const mockFolders = {
//     userId: 0,
//     userName: 'Jack',
//     folders: [],
//     sharedFolders: []
//
// }

const fieldOption = (state = {}, action) => {
  switch (action.type) {
    case EMAIL_TEMPLATES_UPDATE_FIELD_OPTION:
      return action.payload;
    default:
      return state;
  }
};

const templatesDataTablePagination = (
  state = {
    perPage: EnumsManager.DefaultPageConfigs.PageSize,
    currentPage: 1,
    total: 0
  },
  action
) => {
  switch (action.type) {
    case EMAIL_TEMPLATES_SETUP_TEMPLATES_PAGENATIONS:
      return {
        perPage: action.perPage,
        currentPage: action.currentPage,
        total: action.total
      };
    default:
      return state;
  }
};

const selectedDepartment = (state = { id: "" }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case EMAIL_TEMPLATES_SET_SELECTED_DEPARTMENT:
      return Object.assign({}, state, { ...payload });
    default:
      return state;
  }
};

const selectedUser = (state = { id: "", name: "" }, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case EMAIL_TEMPLATES_SET_SELECT_USER:
      return payload.user;
    default:
      return state;
  }
};
const newTeam = (
  state = { parentId: "", parentName: "", name: "" },
  action
) => {
  const { type, ...payload } = action;
  switch (type) {
    case EMAIL_TEMPLATES_SET_SELECTED_DEPARTMENT:
      return Object.assign({}, state, { parentId: payload.id });
    case EMAIL_TEMPLATES_SET_NEW_DEPARTMENT_NAME:
      return Object.assign({}, state, { name: payload.name });
    case EMAIL_TEMPLATES_RESET_NEW_DEPARTMENT:
      return Object.assign({}, state, { name: "", parentId: "" });
    default:
      return state;
  }
};

const allUsers = (state = [], action) => {
  const { type, ...payload } = action;
  switch (type) {
    case EMAIL_TEMPLATES_SET_USER:
      return payload.users;
    default:
      return state;
  }
};
const ui = (
  state = {
    isEditFolderViewVisible: false,
    isSelectTeamDialogVisible: false,
    isSharedByVisible: false,
    isDepartmentVisible: true,
    isPermissionVisible: false
  },
  action
) => {
  const { type, ...payload } = action;
  switch (type) {
    case EMAIL_TEMPLATES_EDIT_FOLDER_VIEW_VISIBLE:
      return Object.assign({}, state, { ...payload });
    case EMAIL_TEMPLATES_SET_SELECTED_USER_TEAM_DIALOG_VISIBLE:
      return Object.assign({}, state, { ...payload });
    case EMAIL_TEMPLATES_PERMISSION_VIEW_VISIBLE:
      return Object.assign({}, state, { ...payload });
    case EMAIL_TEMPLATES_SHARED_BY_VISIBLE:
      return Object.assign({}, state, { ...payload });
    case EMAIL_TEMPLATES_DEPARTMENT_VISIBLE:
      return Object.assign({}, state, { ...payload });
    case EMAIL_TEMPLATES_PERMISSION_VISIBLE:
      return Object.assign({}, state, { ...payload });
    default:
      return state;
  }
};

const sortingTeams = (state = [], action) => {
  const { type, ...payload } = action;
  switch (type) {
    case EMAIL_TEMPLATES_SET_SORTING_TEAM:
      return payload.sortingTeams.slice();
    default:
      return state;
  }
};

export {
  ui,
  newTeam,
  selectedDepartment,
  selectedPermissionDepartment,
  allUsers,
  selectedUser,
  sortingTeams,
  templates,
  templatesDataTablePagination,
  userFolders,
  sharedFolders,
  selectedFolder,
  editFolders,
  deletedFolders,
  newTemplate,
  editTemplate,
  addedPermissionDepartment,
  addedPermissionUser,
  fieldOption
};
