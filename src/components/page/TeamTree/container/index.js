import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Tree, Icon, Row, Col } from 'antd';
import ClassNames from 'classnames/bind';
import styles from '../TeamTree.less';

const cx = ClassNames.bind(styles);
const TreeNode = Tree.TreeNode;

const treeData = [{
  title: 'administrator 1',
  key: '0-0',
  children: [{
    title: 'administrator sub 1',
    key: '0-0-0',
    children: [
      { title: 'administrator sub 1 1', key: '0-0-0-0' },
      { title: 'administrator sub 1 2', key: '0-0-0-1' },
      { title: 'administrator sub 1 3', key: '0-0-0-2' },
    ],
  }, {
    title: 'administrator sub 2',
    key: '0-0-1',
    children: [
      { title: 'administrator sub 2 1', key: '0-0-1-0' },
      { title: 'administrator sub 2 2', key: '0-0-1-1' },
      { title: 'administrator sub 2 3', key: '0-0-1-2' },
    ],
  }, {
    title: 'administrator 2',
    key: '0-0-2',
  }],
}, {
  title: 'marketing 1',
  key: '0-1',
  children: [
    { title: 'marketing sub 1', key: '0-1-0-0' },
    { title: 'marketing sub 2', key: '0-1-0-1' },
    { title: 'marketing sub 3', key: '0-1-0-2' },
  ],
}, {
  title: 'Personnel 1',
  key: '0-2',
}];


class teamTree extends React.Component {
    state = {
      expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      checkedKeys: ['0-0-0'],
      selectedKeys: [],
    }
    onExpand = (expandedKeys) => {
      console.log('onExpand', arguments);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.setState({
        expandedKeys,
        autoExpandParent: false,
      });
      this.props.onExpand(expandedKeys);
    }
    onCheck = (checkedKeys) => {
      console.log('onCheck', checkedKeys);
      this.setState({ checkedKeys });
      this.props.onCheck(checkedKeys);
    }
    onSelect = (selectedKeys) => {
      this.setState({ selectedKeys });
      this.props.onSelect(selectedKeys, treeData);
    }
    renderTreeNodes(data) {
      const {
        canAdd, canDelete, onAdd, onDelete,
      } = this.props;
      return data.map((item) => {
        const treeEl = (
          <Fragment>
            <span className={cx('tree-node-title')} span={12}>
              {item.title}
            </span>
            <div className={cx('tree-node-operate')} span={12} >
              { canAdd ? <Icon type="plus-square-o " onClick={() => { onAdd(item.key); }} /> : ''}
              { canDelete ? <Icon type="delete" onClick={() => { onDelete(item.key); }} /> : ''}
            </div>

          </Fragment>
        );
        if (item.children) {
          return (
            <TreeNode className={cx('tree-node-line')} title={treeEl} key={item.key}>
              {this.renderTreeNodes(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode className={cx('tree-node-line')} title={treeEl} key={item.key} />;
      });
    }
    render() {
      const { checkable } = this.props;
      return (
        <Tree
          checkable={checkable}
          onExpand={this.onExpand}
          expandedKeys={this.state.expandedKeys}
          autoExpandParent={this.state.autoExpandParent}
          onCheck={this.onCheck}
          checkedKeys={this.state.checkedKeys}
          onSelect={this.onSelect}
          selectedKeys={this.state.selectedKeys}
        >
          {this.renderTreeNodes(treeData)}
        </Tree>
      );
    }
}

// const mapStateToProps = {
//   teams,
// };
// const mapDispatchToProps = {
//
// };

// teamTree.propTypes = propTypes;
teamTree.defaultProps = {
  onSelect: () => {},
  onAdd: () => {},
  onDelete: () => {},
  onCheck: () => {},
  onExpand: () => {},
  checkable: false,
  canAdd: false,
  canDelete: false,
};
teamTree.propTypes = {
  onSelect: PropTypes.func,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  onCheck: PropTypes.func,
  onExpand: PropTypes.func,
  checkable: PropTypes.bool,
  canAdd: PropTypes.bool,
  canDelete: PropTypes.bool,

};
export default teamTree;
