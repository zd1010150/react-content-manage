import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Tree, Icon } from 'antd';
import ClassNames from 'classnames/bind';
import styles from '../TeamTree.less';
import { EditBox } from 'components/ui';


const cx = ClassNames.bind(styles);
const { TreeNode } = Tree;


class teamTree extends React.Component {
  onExpand(expandedKeys) {
    this.props.onExpand(expandedKeys);
  }
  onCheck(checkedKeys) {
    this.props.onCheck(checkedKeys);
  }
  onSelect(selectedKeys) {
    this.props.onSelect(selectedKeys, this.props.teams);
  }
  onDragEnter({ event, node, expandedKeys }) {
    this.props.onDragEnter({ event, node, expandedKeys });
  }
  onDrop(info) {
    const {
      event, node, dragNode, dragNodesKeys,
    } = info;
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;

    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.id === Number(key)) {
          return callback(item, index, arr);
        }
        if (item.child_team_rec) {
          return loop(item.child_team_rec, key, callback);
        }
      });
    };
    const data = [...this.props.teams];

    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (info.dropToGap) {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    } else {
      loop(data, dropKey, (item) => {
        item.child_team_rec = item.child_team_rec || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.child_team_rec.push(dragObj);
      });
    }
    this.props.setTeams(data);
    this.props.onDrop({
      event, node, dragNode, dragNodesKeys,
    });
  }
  onDragOver({ event, node }) {
    // console.log(event, node, 'over');
    this.props.onDragOver({ event, node });
  }
  onDragEnd({ event, node }) {
    // console.log(event, node, 'end');
    this.props.onDragEnd({ event, node });
  }
  onDragLeave({ event, node }) {
    this.props.onDragLeave({ event, node });
  }
  onDragStart({ event, node }) {
    this.props.onDragStart({ event, node });
  }
  onRightClick({ event, node }) {
    this.props.onRightClick({ event, node });
  }
  onDbClick(id, name) {
    this.props.onDbClick(id, name);
  }
  renderTreeNodes(data) {
    const {
      canAdd, canDelete, onAdd, onDelete, canModifyTeamName, modifyTeamName,
    } = this.props;
    return data.map((item) => {
      const treeEl = (
        <div onDoubleClick={(e) => { this.onDbClick(item.id, item.name, e); }}>
          <span className={cx('tree-node-title')} >
            { canModifyTeamName ? <EditBox
              type="input"
              value={item.name}
              onBlur={newTeamname => modifyTeamName(newTeamname, item.id)}
              onClick={(e) => {
                  e.stopPropagation();
                  this.onSelect([item.id]);
                }}
            /> : <span>{item.name}</span> }
          </span>
          <div className={cx('tree-node-operate')} >
            { canAdd ? <Icon type="plus-square-o " className="pl-lg ok" onClick={(e) => { e.stopPropagation(); onAdd(item.id); }} /> : ''}
            { canDelete ? <Icon type="delete" className="pl-sm danger" onClick={(e) => { e.stopPropagation(); onDelete(item.id); }} /> : ''}
          </div>
        </div>
      );
      if (!_.isEmpty(item.child_team_rec)) {
        return (
          <TreeNode className={cx('tree-node-line')} title={treeEl} key={item.id}>
            {this.renderTreeNodes(item.child_team_rec)}
          </TreeNode>
        );
      }
      return <TreeNode className={cx('tree-node-line')} title={treeEl} key={item.id} />;
    });
  }
  render() {
    const {
      checkable, draggable, teams, defaultExpandAll, defaultSelectedKeys, defaultExpandedKeys, autoExpandParent, defaultCheckedKeys, expandedKeys,
    } = this.props;
    return (
      <Tree
        expandedKeys={expandedKeys}
        defaultExpandAll={defaultExpandAll}
        draggable={draggable}
        checkable={checkable}
        onExpand={args => this.onExpand(args)}
        defaultExpandedKeys={defaultExpandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={args => this.onCheck(args)}
        defaultCheckedKeys={defaultCheckedKeys}
        onSelect={args => this.onSelect(args)}
        onDragEnter={args => this.onDragEnter(args)}
        onDrop={args => this.onDrop(args)}
        onDragOver={args => this.onDragOver(args)}
        onDragEnd={args => this.onDragEnd(args)}
        onDragLeave={args => this.onDragLeave(args)}
        onDragStart={args => this.onDragStart(args)}
        onRightClick={args => this.onRightClick(args)}
        defaultSelectedKeys={defaultSelectedKeys}
      >
        {this.renderTreeNodes(teams)}
      </Tree>
    );
  }
}


teamTree.defaultProps = {
  onSelect: () => {},
  onAdd: () => {},
  onDelete: () => {},
  onCheck: () => {},
  onExpand: () => {},
  checkable: false,
  canAdd: false,
  canDelete: false,
  canModifyTeamName: false,
  draggable: false,
  autoExpandParent: true,
  defaultExpandAll: true,
  onDragEnter: () => {},
  onDrop: () => {},
  onDragOver: () => {},
  onDragEnd: () => {},
  onDragLeave: () => {},
  onDragStart: () => {},
  onRightClick: () => {},
  onDbClick: () => {},
  modifyTeamName: () => {},
  setTeams: () => {},
  defaultExpandedKeys: [],
  defaultCheckedKeys: [],
  defaultSelectedKeys: [],
  expandedKeys: [],
};
teamTree.propTypes = {
  teams: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  onCheck: PropTypes.func,
  onExpand: PropTypes.func,
  checkable: PropTypes.bool,
  canAdd: PropTypes.bool,
  canDelete: PropTypes.bool,
  canModifyTeamName: PropTypes.bool,
  autoExpandParent: PropTypes.bool,
  draggable: PropTypes.bool,
  onDragEnter: PropTypes.func,
  onDrop: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDragStart: PropTypes.func,
  onRightClick: PropTypes.func,
  modifyTeamName: PropTypes.func,
  setTeams: PropTypes.func,
  defaultExpandAll: PropTypes.bool,
  onDbClick: PropTypes.func,
  defaultExpandedKeys: PropTypes.array,
  defaultCheckedKeys: PropTypes.array,
  defaultSelectedKeys: PropTypes.array,
  expandedKeys: PropTypes.array,
};

export default teamTree;
