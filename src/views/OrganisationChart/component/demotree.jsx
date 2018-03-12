import React from 'react';
import { Tree } from 'antd';

const TreeNode = Tree.TreeNode;


const gData = [{
    title: 'administrator 1',
    key: '0-0',
    children: [{
        title: 'administrator sub 1',
        key: '0-0-0',
        children: [
            { title: 'administrator sub 1 1', key: '0-0-0-0' },
        ],
    }],
}];

class Demo extends React.Component {
    state = {
      gData,
      expandedKeys: [],
    }
    onDragEnter = (info) => {
      console.log(info);

    }
    onDrop = (info) => {
      console.log(info);
      const dropKey = info.node.props.eventKey;
      const dragKey = info.dragNode.props.eventKey;
      const dropPos = info.node.props.pos.split('-');
      const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
      debugger;
      // const dragNodesKeys = info.dragNodesKeys;
      const loop = (data, key, callback) => {
        data.forEach((item, index, arr) => {
          if (item.key === key) {
            return callback(item, index, arr);
          }
          if (item.children) {
            return loop(item.children, key, callback);
          }
        });
      };
      const data = [...this.state.gData];
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
          item.children = item.children || [];
          // where to insert 示例添加到尾部，可以是随意位置
          item.children.push(dragObj);
        });
      }
      this.setState({
        gData: data,
      });
    }
    render() {
      const loop = data => data.map((item) => {
        if (item.children && item.children.length) {
          return <TreeNode key={item.key} title={item.title}>{loop(item.children)}</TreeNode>;
        }
        return <TreeNode key={item.key} title={item.title} />;
      });
      return (
        <Tree
          className="draggable-tree"
          defaultExpandedKeys={this.state.expandedKeys}
          draggable
          onDragEnter={this.onDragEnter}
          onDrop={this.onDrop}
        >
          {loop(this.state.gData)}
        </Tree>
      );
    }
}

export default  Demo;
