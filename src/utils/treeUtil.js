import _ from 'lodash';

const field = 'key';

export const getTreeItemByKey = (trees, teamKey) => {
  let hasFound = false;
  let result = {};
  const findByKey = (tree, key) => {
    if (hasFound) return;
    for (let i = 0; i < tree.length; i++) {
      if( hasFound) return;
      const node = tree[i];
      if (node[field] === key) {
        hasFound = true;
        result = node;
        return;
      } else if (node.children) {
        findByKey(node.children, key);
      }
    }
  };

  findByKey(trees, teamKey);
  return result;
};
