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
    state = {
      expandedKeys: [],
      checkedKeys: [],
      selectedKeys: [],
      autoExpandParent: this.props.autoExpandParent,
    }
    onExpand(expandedKeys) {
      // console.log('onExpand', arguments);
      // if not set autoExpandParent to false, if children expanded, parent can not collapse.
      // or, you can remove all expanded children keys.
      this.setState({
        expandedKeys,
        autoExpandParent: false,
      });
      this.props.onExpand(expandedKeys);
    }
    onCheck(checkedKeys) {
      console.log('onCheck', checkedKeys);
      this.setState({ checkedKeys });
      this.props.onCheck(checkedKeys);
    }
    onSelect(selectedKeys) {
      this.setState({ selectedKeys });
      this.props.onSelect(selectedKeys, this.props.teams);
    }
    onDragEnter({ event, node, expandedKeys }) {
      console.log('drag enter', event, node, expandedKeys);
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
      const data = [...this.props.teams ];

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

      console.log('after drag============', data, 'after drag============');

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
      // console.log(event, node, 'leave');
      this.props.onDragLeave({ event, node });
    }
    onDragStart({ event, node }) {
      // console.log('start', event, node );
      this.props.onDragStart({ event, node });
    }
    onRightClick({ event, node }) {
      console.log(event, node, 'right click');
      this.props.onRightClick({ event, node });
    }
    renderTreeNodes(data) {
      const {
        canAdd, canDelete, onAdd, onDelete, canModifyTeamName, modifyTeamName,
      } = this.props;
      return data.map((item) => {
        const treeEl = (
          <Fragment>
            <span className={cx('tree-node-title')} span={12}>
              { canModifyTeamName ? <EditBox type="input" value={item.name} onBlur={newTeamname => modifyTeamName(newTeamname, item.id)} /> : <span>{item.name}</span> }
            </span>
            <div className={cx('tree-node-operate')} span={12} >
              { canAdd ? <Icon type="plus-square-o " onClick={() => { onAdd(item.id); }} /> : ''}
              { canDelete ? <Icon type="delete" onClick={() => { onDelete(item.id); }} /> : ''}
            </div>
          </Fragment>
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
        checkable, draggable, teams,
      } = this.props;

      return (
        <Tree
          draggable={draggable}
          checkable={checkable}
          onExpand={args => this.onExpand(args)}
          expandedKeys={this.state.expandedKeys}
          autoExpandParent={this.state.autoExpandParent}
          onCheck={args => this.onCheck(args)}
          checkedKeys={this.state.checkedKeys}
          onSelect={args => this.onSelect(args)}
          onDragEnter={args => this.onDragEnter(args)}
          onDrop={args => this.onDrop(args)}
          onDragOver={args => this.onDragOver(args)}
          onDragEnd={args => this.onDragEnd(args)}
          onDragLeave={args => this.onDragLeave(args)}
          onDragStart={args => this.onDragStart(args)}
          onRightClick={args => this.onRightClick(args)}
          selectedKeys={this.state.selectedKeys}
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
  onDragEnter: () => {},
  onDrop: () => {},
  onDragOver: () => {},
  onDragEnd: () => {},
  onDragLeave: () => {},
  onDragStart: () => {},
  onRightClick: () => {},
  modifyTeamName: () => {},
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
  setTeams: PropTypes.func.isRequired,

};

export default teamTree;
