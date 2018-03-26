import { combineReducers } from "redux";
import EnumsManager from "utils/EnumsManager";
import {
  EMAIL_TEMPLATES_EDIT_FOLDER_VIEW_VISIBLE,
  EMAIL_TEMPLATES_SET_NEW_DEPARTMENT_NAME,
  EMAIL_TEMPLATES_RESET_NEW_DEPARMENT,
  EMAIL_TEMPLATES_SET_SELECTED_DEPARTMENT,
  EMAIL_TEMPLATES_SET_ADD_VISIBLE,
  EMAIL_TEMPLATES_SET_USER,
  EMAIL_TEMPLATES_SET_SELECTED_USER_TEAM_DIALOG_VISIBLE,
  EMAIL_TEMPLATES_SET_SELECT_USER,
  EMAIL_TEMPLATES_SET_SORTING_TEAM,
  EMAIL_TEMPLATES_PERMISSION_VIEW_VISIBLE,
  EMAIL_TEMPLATES_SET_TEMPLATES,
  EMAIL_TEMPLATES_SETUP_TEMPLATES_PAGENATIONS,
  EMAIL_TEMPLATES_SHARED_BY_VISIBLE,
  EMAIL_TEMPLATES_DEPARTMENT_VISIBLE,
  EMAIL_TEMPLATES_SET_USER_FOLDERS,
  EMAIL_TEMPLATES_SET_SHARED_FOLDERS,
  EMAIL_TEMPLATES_SET_SELECTED_FOLDER,
  EMAIL_TEMPLATES_SET_EDIT_FOLDERS,
  EMAIL_TEMPLATES_DELETE_USER_FOLDERS
} from "./actionType";

const templates = (
  state = {
    department_id: "",
    department_text: "",
    templates: [],
    editTemplates: {}
  },
  action
) => {
  const { type, ...payload } = action;
  switch (type) {
    case EMAIL_TEMPLATES_SET_TEMPLATES:
      return Object.assign({}, state, { ...payload });
    default:
      return state;
  }
};

const mockFolders = [
  {
    id: 0,
    userId: 0,
    owner: "Jimmy",
    name: "genaral folder",
    isShared: true,
    templates: [
      {
        name: "market",
        createdAt: "2018-01-02",
        modifiedDate: "2018-03-02",
        createBy: "Jimmy",
        Description: "for market use"
      }
    ]
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

const userFolders = (state = mockFolders, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case EMAIL_TEMPLATES_SET_USER_FOLDERS:
      return [...payload];
    case EMAIL_TEMPLATES_DELETE_USER_FOLDERS:
      return state.filter(item => item.id !== action.id);
    default:
      return state;
  }
};

const sharedFolders = (state = mockSharedFolders, action) => {
  const { type, ...payload } = action;
  switch (type) {
    case EMAIL_TEMPLATES_SET_SHARED_FOLDERS:
      return [...payload];
    default:
      return state;
  }
};

const editFolders = (state = [], action) => {
  const { type } = action;
  switch (type) {
    case EMAIL_TEMPLATES_SET_EDIT_FOLDERS:
      return [...state, action.editFolders];
    default:
      return state;
  }
};

const selectedFolder = (state = {}, action) => {
  const { type } = action;
  switch (type) {
    case EMAIL_TEMPLATES_SET_SELECTED_FOLDER:
      return action.selectedFolder;
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
    case EMAIL_TEMPLATES_RESET_NEW_DEPARMENT:
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
    isAddVisible: false,
    isSelectTeamDialogVisible: false,
    isSharedByVisible: false,
    isDepartmentVisible: true
  },
  action
) => {
  const { type, ...payload } = action;
  switch (type) {
    case EMAIL_TEMPLATES_EDIT_FOLDER_VIEW_VISIBLE:
      return Object.assign({}, state, { ...payload });
    case EMAIL_TEMPLATES_SET_ADD_VISIBLE:
      return Object.assign({}, state, { ...payload });
    case EMAIL_TEMPLATES_SET_SELECTED_USER_TEAM_DIALOG_VISIBLE:
      return Object.assign({}, state, { ...payload });
    case EMAIL_TEMPLATES_PERMISSION_VIEW_VISIBLE:
      return Object.assign({}, state, { ...payload });
    case EMAIL_TEMPLATES_SHARED_BY_VISIBLE:
      return Object.assign({}, state, { ...payload });
    case EMAIL_TEMPLATES_DEPARTMENT_VISIBLE:
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
export default combineReducers({
  ui,
  newTeam,
  selectedDepartment,
  allUsers,
  selectedUser,
  sortingTeams,
  templates,
  templatesDataTablePagination,
  userFolders,
  sharedFolders,
  selectedFolder,
  editFolders
});
