import setup from './setupReducer';
import ddDemo from 'views/DD-demo/flow/reducers/index';
import dragPreview from 'views/dragPreview/flow/reducers/index';
import loginUser from 'views/LoginForm/flow/reducer';
import leads from 'views/Leads/flow/reducer';
import objectView from 'components/page/ObjectFilter/flow/reducer';
import objectDetails from 'views/ObjectDetails/flow/reducer';
import taskDetails from 'components/page/TaskDetails/flow/reducer';
// test
import multiDndFields from 'components/ui/MultiSelectDnD/flow/reducer';
// test ends

export default {
  ddDemo,
  dragPreview,
  loginUser,
  leads,
  setup,
  multiDndFields,
  objectView,
  objectDetails,
  taskDetails,
};
