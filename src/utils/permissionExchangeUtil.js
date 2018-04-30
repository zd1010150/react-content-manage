/* 用于辅助生成前后端permission的对应关系，也就是config/app-permission.config.js */
import _ from 'lodash';

const formatPermissions = (permissionsFromRemote) => {
  const permissions = JSON.parse(permissionsFromRemote);
  const allPermissions = {};
  const convertIdTokey = id => id.replace(/-/g, '_').toUpperCase();
  const getId = (root) => {
    allPermissions[convertIdTokey(root.id)] = root.id;
    if (!_.isEmpty(root.child_rec)) {
      Object.keys(root.child_rec).forEach((t) => {
        getId(root.child_rec[t]);
      });
    }
  };
  Object.keys(permissions).forEach((t) => {
    getId(permissions[t]);
  });
  return allPermissions;
};

export default formatPermissions;
