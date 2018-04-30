import setup from './setupReducer';

import loginUser from 'views/LoginForm/flow/reducer';
import objectView from 'components/page/ObjectFilter/flow/reducer';
import objectDetails from 'views/ObjectDetails/flow/reducer';
import taskDetails from 'components/page/TaskDetails/flow/reducer';
import duplicates from 'components/page/FindDuplicates/flow/reducer';
import globalSearch from 'views/GlobalSearch/flow/reducer';
import mergence from 'views/MergeLeads/flow/reducer';
import objectList from 'views/ObjectList/flow/reducer';
import objectShare from 'views/ObjectShare/flow/reducer';
import accountOpportunities from 'components/page/SimpleTable/flow/reducer';
// test
import multiDndFields from 'components/ui/MultiSelectDnD/flow/reducer';
// test ends

export default {
  loginUser,
  setup,
  multiDndFields,
  objectView,
  objectDetails,
  taskDetails,
  duplicates,
  mergence,
  objectList,
  globalSearch,
  objectShare,
  accountOpportunities,
};
