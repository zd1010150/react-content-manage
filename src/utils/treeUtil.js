import _ from 'lodash';

const field = 'id';

export const getTreeItemByKey = (trees, teamKey) => {
  let hasFound = false;
  let result = {};
  const findByKey = (tree, key) => {
    if (hasFound) return;
    for (let i = 0; i < tree.length; i++) {
      if( hasFound) return;
      const node = tree[i];
      if (node[field] === Number(key)) {
        hasFound = true;
        result = node;
        return;
      } else if (node.child_team_rec) {
        findByKey(node.child_team_rec, key);
      }
    }
  };

  findByKey(trees, teamKey);
  return result;
};
